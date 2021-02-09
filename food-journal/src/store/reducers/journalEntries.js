import * as actionTypes from "../actions/actionTypes";

const initialState = {
  foodSelected: null,
  quantity: null,
  unit: null,
  calGoal: 2000,
  totalCal: 0,
  nutritionFacts: {},
  breakfast: [],
  lunch: [],
  dinner: [],
  snack: [],
  error: false,
  entryDelete: false,
  curEntry: {}, 
  breakdown: false,
  nutritionBreakDown: null, 
  hint: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
		case actionTypes.FOOD_SEARCH:
			return {
				...state,
				foodSelected: action.foodSelected,
				quantity: action.quantity,
				unit: action.unit,
				nutritionFacts: action.nutritionFacts,
			};
		case actionTypes.ADD_BREAKFAST_ENTRY:
			return {
				...state,
				breakfast: state.breakfast.concat(action.entry),
			};
		case actionTypes.ADD_LUNCH_ENTRY:
			return {
				...state,
				lunch: state.lunch.concat(action.entry),
			};
		case actionTypes.ADD_DINNER_ENTRY:
			return {
				...state,
				dinner: state.dinner.concat(action.entry),
			};
		case actionTypes.ADD_SNACK_ENTRY:
			return {
				...state,
				snack: state.snack.concat(action.entry),
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
			const updateBreakDown =
				action.breakdown !== null ? action.breakdown : !state.breakdown;
			return {
				...state,
				breakdown: updateBreakDown,
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
		case actionTypes.SET_HINT:
			return {
				...state,
				hint: action.hint,
				error: false,
			};
		case actionTypes.SET_ENTRY:
			return {
				...state,
				curEntry: action.entries,
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
		case actionTypes.SET_TOTAL_CAL:
			return {
				...state,
				totalCal: action.totalCal,
			};
		default:
			return state;
	}
};
export default reducer;
