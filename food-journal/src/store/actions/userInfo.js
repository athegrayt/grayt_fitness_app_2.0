import * as actionTypes from './actionTypes';

export const setCalGoal = (calGoal) => {
	return {
		type: actionTypes.SET_CAL_GOAL,
		calGoal: calGoal,
	};
};
