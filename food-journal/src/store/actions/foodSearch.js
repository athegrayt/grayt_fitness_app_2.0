import * as actionTypes from "./actionTypes";
// import axios from "../../axios-journalEntries";
import * as fireBase from '../../dataBase/fireBase'




export const addEntrySuccess = (entry, meal) => {
  switch(meal){
	  case 'breakfast':
		  return{
			type: actionTypes.ADD_BREAKFAST_ENTRY,
			entry
		  }
	  case 'lunch':
		  return{
			type: actionTypes.ADD_LUNCH_ENTRY,
			entry
		  }
	  case 'dinner':
		  return{
			type: actionTypes.ADD_DINNER_ENTRY,
			entry
		  }
		default:
			return {
				type: actionTypes.ADD_SNACK_ENTRY,
				entry,
			};
  }
};

export const addEntryFail = () => {
  return {
    type: actionTypes.ADD_ENTRY_FAIL,
  };
};
export const setHint = (hint) => {
	return {
	type: actionTypes.SET_HINT,
	hint
  };
};

export const addEntry = (meal, entry, token) => async dispatch => {
	console.log(entry);
	const addDate = new Date().toISOString().slice(0, 10);
	try{
		await fireBase.addEntry(meal, entry, addDate);
		dispatch(addEntrySuccess(entry, meal)); 
	}catch(err){
		console.log(err)
		dispatch(addEntryFail());
      };
};
// export const addEntry = (meal, entry, token) => {
//   return (dispatch) => {
//     axios
//       .post(`/${meal}.json?auth=${token}`, entry)
//       .then((res) => {
// 		dispatch(addEntrySuccess(entry.journalEntry, meal));
//       })
//       .catch((err) => {
// 		console.log(err)
// 		dispatch(addEntryFail());
//       });
//   };
// };

export const updateFoodSearch = (foodSelected,quantity,unit, nutritionFacts)=> {
  return{
    type: actionTypes.FOOD_SEARCH, 
    foodSelected,
    quantity,
    unit, 
    nutritionFacts
  }
}

export const autoComplete = (search) => async dispatch => {
	try{
		if(search){
			const query = `?query=${search}`
			const endpoint = `https://trackapi.nutritionix.com/v2/search/instant${query}`;
			fetch(endpoint, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'x-app-id': '5876afdb',
					'x-app-key': process.env.REACT_APP_API_KEY2,
				},
			}).then(res=>res.json())
			.then(data=>{
				const hints = []
				for (let name in data.common) {
					hints.push(data.common[name].food_name);
				}
				
				dispatch(setHint(hints))
			})
		}
	
	}catch(err){
		console.log(err)
	}
}

export const searchFood = (food) => (dispatch) => {
	const endpointSelect = `https://trackapi.nutritionix.com/v2/natural/nutrients`;
	fetch(endpointSelect, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-app-id': '5876afdb',
			'x-app-key': process.env.REACT_APP_API_KEY2,
		},
		body: JSON.stringify({
			query: food,
			timezone: 'US/Eastern',
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			const nf = Object.keys(data.foods[0])
				.filter((key) => {
					return (
						key.match(/nf_*/) ||
						key.match(/serving*/) ||
						key.match(/consumed*/) ||
						key.match(/food*/)
					);
				})
				.reduce(
					(nfObject, curKey) => ({
						...nfObject,
						[curKey]: data.foods[0][curKey],
					}),
					{}
				);
				nf.consumed_at = new Date()
			return nf;
		})
		.then((res) =>
			dispatch(updateFoodSearch(food, res.serving_qty, res.serving_unit, res))
		)
		.catch((error) => console.log(error));
};