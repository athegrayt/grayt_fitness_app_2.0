import {
	FOOD_SEARCH,
	ADD_BREAKFAST_ENTRY,
	ADD_LUNCH_ENTRY,
	ADD_DINNER_ENTRY,
	ADD_SNACK_ENTRY,
	DELETE_ENTRY,
	SET_BREAKDOWN,
	SET_BREAKFAST,
	SET_LUNCH,
	SET_DINNER,
	SET_SNACK,
	SET_HINT,
	SET_ENTRY,
	FETCH_ENTRIES_FAILED,
	SET_CAL_GOAL,
	SET_TOTAL_CAL,
	AUTH_START,
	AUTH_SUCCESS,
	AUTH_FAIL,
	AUTH_LOGOUT,
	SET_MODAL_STATUS,
	INIT_ENTRIES,
} from '../store/actions/actionTypes';

import {
	initEntries,
	setBreakfast,
	setLunch,
	setDinner,
	setSnack,
	addBreakfast,
	addLunch,
	addDinner,
	addSnack,
	setNutritionBreakdown,
	authStart,
	authSuccess,
	authFail,
	authLogout,
	setModalStatus,
} from './daily-journal-actions';

const dailyJournalReducer = (state, action) => {
	switch (action.type) {
		case FOOD_SEARCH:
			return {
				...state,
				foodSelected: action.foodSelected,
				quantity: action.quantity,
				unit: action.unit,
				nutritionFacts: action.nutritionFacts,
			};
		case DELETE_ENTRY:
			return {
				...state,
				journalEntries: state.journalEntries.filter(
					(entry, i) => entry.consumed_at !== action.entryID
				),
				entryDelete: true,
			};
		case SET_BREAKDOWN:
			return setNutritionBreakdown(action.nutritionBreakDown, state);
		case SET_BREAKFAST:
			return setBreakfast(action.mealEntries, state);
		case INIT_ENTRIES:
			console.log(action.mealEntries)
			return initEntries(action.mealEntries, state);
		case SET_LUNCH:
			return setLunch(action.mealEntries, state);
		case SET_DINNER:
			return setDinner(action.mealEntries, state);
		case SET_SNACK:
			return setSnack(action.mealEntries, state);
		case ADD_BREAKFAST_ENTRY:
			return addBreakfast(action.entry, state);
		case ADD_LUNCH_ENTRY:
			return addLunch(action.entry, state);
		case ADD_DINNER_ENTRY:
			return addDinner(action.entry, state);
		case ADD_SNACK_ENTRY:
			return addSnack(action.entry, state);
		case AUTH_START:
			return authStart(state);
		case AUTH_SUCCESS:
			return authSuccess(action.token, action.userId, state);
		case AUTH_FAIL:
			return authFail(action.error, state);
		case AUTH_LOGOUT:
			return authLogout(state);
		case SET_MODAL_STATUS:
			return setModalStatus(action.status, state);
		case SET_HINT:
			return {
				...state,
				hint: action.hint,
				error: false,
			};
		case SET_ENTRY:
			return {
				...state,
				curEntry: action.entries,
				error: false,
			};

		case FETCH_ENTRIES_FAILED:
			return {
				...state,
				error: true,
			};
		case SET_CAL_GOAL:
			return {
				...state,
				calGoal: action.calGoal,
			};
		case SET_TOTAL_CAL:
			return {
				...state,
				totalCal: action.totalCal,
			};
		default:
			return state;
	}
};
export default dailyJournalReducer;
