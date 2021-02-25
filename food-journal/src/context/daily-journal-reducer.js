import {
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
	AUTH_START,
	AUTH_SUCCESS,
	AUTH_FAIL,
	AUTH_LOGOUT,
	SET_MODAL_STATUS,
	INIT_ENTRIES,
	UPDATE_CUR_TAB,
	SET_USER_SUCCESS,
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
	deleteEntry,
	updateCurTab,
	setUser,
} from './daily-journal-actions';

const dailyJournalReducer = (state, action) => {
	switch (action.type) {
		case SET_USER_SUCCESS:
			return setUser(
				action.weight,
				action.goalWeight,
				action.calGoal,
				action.name,
				state
			);
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
			return authSuccess(action.token, action.userId, action.registered, state);
		case AUTH_FAIL:
			return authFail(action.error, state);
		case AUTH_LOGOUT:
			return authLogout(state);
		case SET_MODAL_STATUS:
			return setModalStatus(action.status, state);
		case DELETE_ENTRY:
			return deleteEntry(action.meal,action.entry,state);
		case UPDATE_CUR_TAB:
			return updateCurTab(action.tab,state);
		default:
			return state;
	}
};
export default dailyJournalReducer;
