import * as actionTypes from './actionTypes';
// import axios from '../../axios-journalEntries';
import * as firebase from '../../dataBase/fireBase';

// export const entryDelete = (id) => {
// 	return {
// 		type: actionTypes.DELETE_ENTRY,
// 		entryID: id,
// 	};
// };


export const setEntries = (entries, meal) => {
  return {
    type: actionTypes[`SET_${meal.toUpperCase()}`],
		entries,
	};
};

export const setBreakdown = (nutritionBreakDown, breakdown) => {
  return {
    type: actionTypes.SET_BREAKDOWN,
		nutritionBreakDown,
		breakdown,
	};
};

export const fetchEntriesFailed = () => {
  return {
    type: actionTypes.FETCH_ENTRIES_FAILED,
	};
};

export const setTotalCalories = (totalCal) => {
  return {
    type: actionTypes.SET_TOTAL_CAL,
		totalCal,
	};
};

export const initEntries = (token, userId) => async (dispatch) => {
  const curDate = new Date().toISOString().slice(0, 10);
	const meals = ['breakfast', 'lunch', 'dinner', 'snack'];
	try {
    meals.forEach(async (meal) => {
      const mealEntries = await firebase.getEntry(meal, curDate, userId);
			return dispatch(setEntries(mealEntries, meal));
		});
	} catch (err) {
    console.log(err);
		dispatch(fetchEntriesFailed());
	}
};
export const updateMealEntries = (meal,token, userId) => async (dispatch) => {
  const curDate = new Date().toISOString().slice(0, 10);
	try {
    const mealEntries = await firebase.getEntry(meal, curDate, userId);
    return dispatch(setEntries(mealEntries, meal));
	} catch (err) {
    console.log(err);
		dispatch(fetchEntriesFailed());
	}
};

export const deleteEntry = (token, docID, userId, meal, date) => async(dispatch) => {
        try{
          await firebase.deleteEntry(meal,docID,date)
          dispatch(updateMealEntries(meal, token, userId));
        }catch(err){
          console.log(err);
        }
     
  // axios
    //   .delete(
    //     `https://grayt-fitness.firebaseio.com/${meal}/${dbKey}.json?auth=${token}`
    //   )
      // .then((res) => {
      //   ;
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
  };