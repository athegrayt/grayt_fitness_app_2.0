export const setBreakfast = (breakfast, state) => {
	return {
		...state,
		breakfast: { name: 'breakfast', entries: breakfast },
		error: false,
	};
};
export const addBreakfast = (entry, state) => {
	const updatedBreakfast = [...state.breakfast.entries].concat(entry);
	return {
		...state,
		breakfast: { name: 'breakfast', entries: updatedBreakfast },
		error: false,
	};
};
export const setLunch = (lunch, state) => {
	return {
		...state,
		lunch: { name: 'lunch', entries: lunch },
		error: false,
	};
};
export const addLunch = (entry, state) => {
	return {
		...state,
		lunch: { name: 'lunch', entries: state.lunch.entries.concat(entry) },
		error: false,
	};
};
export const setDinner = (dinner, state) => {
	return {
		...state,
		dinner: { name: 'dinner', entries: dinner },
		error: false,
	};
};
export const addDinner = (entry, state) => {
	return {
		...state,
		dinner: { name: 'dinner', entries: state.dinner.entries.concat(entry) },
		error: false,
	};
};
export const setSnack = (snack, state) => {
	return {
		...state,
		snack: { name: 'snack', entries: snack },
		error: false,
	};
};
export const addSnack = (entry, state) => {
	return {
		...state,
		snack: { name: 'snack', entries: state.snack.entries.concat(entry) },
		error: false,
	};
};
export const initEntries = (mealEntries, state) => {
	return {
		...state,
		breakfast: { name: 'breakfast', entries: mealEntries[0] },
		lunch: { name: 'lunch', entries: mealEntries[1] },
		dinner: { name: 'dinner', entries: mealEntries[2] },
		snack: { name: 'snack', entries: mealEntries[3] },
		error: false,
		loading: false
	};
};

export const setNutritionBreakdown = (nutritionBreakdown, state) => {
	const breakdown =
		nutritionBreakdown === state.nutritionBreakdown ? null : nutritionBreakdown;
	return {
		...state,
		nutritionBreakdown: breakdown,
	};
};

export const authStart = (state) => {
	return {
		...state,
		loading: true,
	};
};

export const authSuccess = (token, userId, registered, state) => {
	const registeredUser = JSON.parse(`${registered}`.toLowerCase());
	return {
		...state,
		token,
		userId,
		error: null,
		loading: false,
		registered: registeredUser,
	};
};

export const authFail = (error, state) => {
	return {
		...state,
		error,
		loading: false,
	};
};
export const authLogout = (state) => {
	return {
		...state,
		token: null,
		userId: null,
		loading: false
	};
};

export const setModalStatus = (status, state) => {
	const updateModalOpen = status === null ? !state.modal : status;
	return {
		...state,
		modal: updateModalOpen,
	};
};

export const deleteEntry = (meal, entry, state) => {
	
	const updatedState = { ...state };
	const updateMealEntries = [...updatedState[`${meal}`].entries].filter(
		(item) => {
			console.log(item, item.consumed_at, entry.consumed_at);
			return item.consumed_at !== entry.consumed_at
		}
	);
	updatedState[`${meal}`] = {name: `${meal}`, entries: updateMealEntries};

	return updatedState
	
};
export const updateCurTab = (tab, state) => {
	return {
		...state,
		curTab: tab,
	};
};

export const setUser = (
	weight,
	goalWeight,
	calGoal,
	name,
	height,
	age,
	activity,
	sex,
	docID,
	state
) => {
	return {
		...state,
		weight,
		goalWeight,
		calGoal,
		name,
		height,
		age,
		activity,
		sex,
		docID,
		registered: true,
		loading: false
	};
};

export const updateUser = (updatedWeigthGoal, updatedWeight, state)=>{
	return {
		...state,
		goalWeight: updatedWeigthGoal,
		weight: updatedWeight,
	};
};
export const setName = (displayName, state) => {
	return{
		...state, 
		name: displayName
	}
}