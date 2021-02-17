
export const setBreakfast = (breakfast, state)=>{
    return {
			...state,
			breakfast: { name: 'breakfast', entries: breakfast },
			error: false,
		};
}
export const setLunch = (lunch, state)=>{
    return {
			...state,
			lunch: { name: 'lunch', entries: lunch },
			error: false,
		};
}
export const setDinner = (dinner, state)=>{
    return {
			...state,
			dinner: { name: 'dinner', entries: dinner },
			error: false,
		};
}
export const setSnack = (snack, state)=>{
    return {
			...state,
			snack: { name: 'snack', entries: snack },
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
