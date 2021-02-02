import * as actionTypes from "../actions/actionTypes";

const initialState = {
  foodSelected: null,
  quantity: null,
  unit: null,
  calGoal: 2000,
  nutritionFacts: {},
  breakfast: [],
  lunch: [],
  dinner: [],
  snack: [],
  error: false,
  entryDelete: false,
  curEntry: {}, 
  meal: null, 
  breakdown: false,
  nutritionBreakDown: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FOOD_SEARCH:
      return {
				...state,
        foodSelected: action.foodSelected,
        quantity: action.quantity,
        unit: action.unit, 
        nutritionFacts: action.nutritionFacts
			};
    case actionTypes.ADD_ENTRY_SUCCESS:
      return {
        ...state,
        journalEntries: state.journalEntries.concat(action.entry),
      };
    case actionTypes.DELETE_ENTRY:
      return {
        ...state,
        journalEntries: state.journalEntries.filter(
          (entry, i) => entry.consumed_at !== action.entryID
        ),
        entryDelete: true,
      };
    case actionTypes.SET_BREAKDOWN:  
    return {
        ...state,
        breakdown: !state.breakdown,
        nutritionBreakDown: action.nutritionBreakDown,
        error: false,
      };
    case actionTypes.SET_BREAKFAST:  
    return {
        ...state,
        breakfast: action.entries,
        error: false,
      };
    case actionTypes.SET_LUNCH:  
    return {
        ...state,
        lunch: action.entries,
        error: false,
      };
    case actionTypes.SET_DINNER:  
    return {
        ...state,
        dinner: action.entries,
        error: false,
      };
    case actionTypes.SET_SNACK:  
    return {
        ...state,
        snack: action.entries,
        error: false,
      };
    case actionTypes.SET_ENTRY:  
    return {
        ...state,
        curEntry: action.entries,
        error: false,
      };
    case actionTypes.SET_MEAL:  
    return {
        ...state,
        meal: action.meal,
        error: false,
      };
    case actionTypes.FETCH_ENTRIES_FAILED:
      return {
        ...state,
        error: true,
      };
    case actionTypes.SET_CAL_GOAL:
      return {
        ...state,
        calGoal: action.calGoal,
      };
    default:
      return state;
  }
};
export default reducer;
