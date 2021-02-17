import React, {createContext} from 'react'

export default createContext({
	foodSelected: false,
	quantity: 0,
	unit: null,
	calGoal: 2000,
	totalCal: 0,
	nutritionFacts: {},
    meals:{
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
    },
	error: false,
	entryDelete: false,
	curEntry: {},
	breakdown: false,
	nutritionBreakDown: null,
	hint: [],
});