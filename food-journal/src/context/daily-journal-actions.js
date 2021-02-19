
export const setBreakfast = (breakfast, state)=>{
    console.log('setBreakfast')
	return {
			...state,
			breakfast: { name: 'breakfast', entries: breakfast },
			error: false,
		};
}
export const addBreakfast = (entry, state)=>{
    console.log(state)
	const updatedBreakfast = [...state.breakfast.entries].concat(entry)
	return {
		...state,
		breakfast: { name: 'breakfast', entries: updatedBreakfast },
		error: false,
	};
}
export const setLunch = (lunch, state)=>{
    console.log('setLunch');
	return {
			...state,
			lunch: { name: 'lunch', entries: lunch },
			error: false,
		};
}
export const addLunch = (entry, state) => {
	return {
		...state,
		lunch: { name: 'lunch', entries: state.lunch.entries.concat(entry) },
		error: false,
	};
};
export const setDinner = (dinner, state)=>{
    console.log('setDinner');
	return {
			...state,
			dinner: { name: 'dinner', entries: dinner },
			error: false,
		};
}
export const addDinner = (entry, state) => {
	return {
		...state,
		dinner: { name: 'dinner', entries: state.dinner.entries.concat(entry) },
		error: false,
	};
};
export const setSnack = (snack, state)=>{
    console.log('setSnack');
	return {
			...state,
			snack: { name: 'snack', entries: snack },
			error: false,
		};
}
export const addSnack = (entry, state) => {
	return {
		...state,
		snack: { name: 'snack', entries: state.snack.entries.concat(entry) },
		error: false,
	};
};
export const initEntries = (mealEntries, state)=> {
	console.log(mealEntries);
	return {
		...state,
		breakfast: { name: 'breakfast', entries: mealEntries[0] },
		lunch: { name: 'lunch', entries: mealEntries[1] },
		dinner: { name: 'dinner', entries: mealEntries[2] },
		snack: { name: 'snack', entries: mealEntries[3] },
		error: false,
	};
}

export const setNutritionBreakdown = (nutritionBreakdown, state) => {
    const breakdown =
			nutritionBreakdown === state.nutritionBreakdown
				? null
				: nutritionBreakdown;
    return {
			...state,
			nutritionBreakdown: breakdown,
		};
}

export const authStart = (state) => {
	return {
		...state,
		loading: true,
	};
};

export const authSuccess = (token, userId, state) => {
	console.log('authSuccess');
	return {
		...state, 
    token,
    userId,
    error: null,
    loading: false,
  }
	};

export const authFail = (error, state) => {
	return {
		...state,
		error: error,
	};
};
export const authLogout = (state) => {
	return {
		...state, 
    token: null,
    userId: null,
	};
};


export const setModalStatus = (status, state) => {
	const updateModalOpen =
		status === null ? !state.modal : status;
	return {
		...state,
		modal: updateModalOpen,
	};
}
