import * as actionTypes from "./actionTypes";
import axios from "../../axios-journalEntries";

export const entryDelete = (id) => {
  return {
    type: actionTypes.DELETE_ENTRY,
    entryID: id,
  };
};

export const dbUpdate = (token, dbKey, userId, meal) => {
  return (dispatch) => {
    axios
      .delete(
        `https://grayt-fitness.firebaseio.com/${meal}/${dbKey}.json?auth=${token}`
      )
      .then((res) => {
        dispatch(initEntries(token, userId))
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

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
    breakdown
	};
}

export const fetchEntriesFailed = () => {
  return {
    type: actionTypes.FETCH_ENTRIES_FAILED,
  };
};

export const initEntries = (token, userId) => async dispatch =>{
  try{
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    const breakfast = await axios.get("https://grayt-fitness.firebaseio.com/breakfast.json" + queryParams)
    const lunch = await axios.get("https://grayt-fitness.firebaseio.com/lunch.json" + queryParams)
    const dinner = await axios.get("https://grayt-fitness.firebaseio.com/dinner.json" + queryParams)
    const snack = await axios.get("https://grayt-fitness.firebaseio.com/snack.json" + queryParams)
    await [breakfast, lunch, dinner, snack].map((meal, i, arr)=>
      {
        const meals = ['breakfast', 'lunch', 'dinner', 'snack']
        const curJournalEntries = [];
        if(meal.data){
          for (let entryKey in meal.data) {
            meal.data[entryKey].journalEntry.dbKey = `${entryKey}`;
            curJournalEntries.push(meal.data[entryKey].journalEntry);
          }
        }
      return dispatch(setEntries(curJournalEntries, meals[i]));
      })
  }catch(err){
    console.log(err);
        dispatch(fetchEntriesFailed());
      }
  };

