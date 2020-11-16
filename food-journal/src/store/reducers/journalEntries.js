import * as actionTypes from '../actions/actionTypes'

const initialState = {
	calGoal: 2000,
	journalEntries: [
		{
			consumed_at: '2020-10-21T18:36:03+00:00',
			deleteRequest: false,
			foodSelected: true,
			food_name: 'beef',
			nf_calories: 247.35,
			nf_cholesterol: 73.95,
			nf_dietary_fiber: 0,
			nf_p: 176.8,
			nf_potassium: 271.15,
			nf_protein: 22.46,
			nf_saturated_fat: 6.6,
			nf_sodium: 53.55,
			nf_sugars: 0,
			nf_total_carbohydrate: 0,
			nf_total_fat: 16.75,
			serving_qty: 3,
			serving_unit: 'oz',
			serving_weight_grams: 85,
		},
	],
	error: false
};
    
const reducer = (state=initialState, action) =>{
   switch (action.type) {
			case actionTypes.ADD_ENTRY_SUCCESS:	
			return {
					...state,
					journalEntries: state.journalEntries.concat(action.entry),
				};
			case actionTypes.DELETE_ENTRY:
				return {
					...state,
					journalEntries: state.journalEntries.filter(
						(entry, i) => i !== action.entryID
					),
				};
			case actionTypes.SET_ENTRIES:
				return {
					...state,
					journalEntries: action.entries,
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
					calGoal: action.calGoal
				}
			default:
				return state;
		}
    
};
export default reducer;