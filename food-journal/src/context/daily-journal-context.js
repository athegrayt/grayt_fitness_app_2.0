import {createContext} from 'react'

export default createContext({
	 breakfast: {
        name: 'breakfast', 
        entries:[]
    },
     lunch : {
			name: 'lunch',
			entries: [],
		},
     dinner : {
			name: 'dinner',
			entries: [],
		},
     snack : {
			name: 'snack',
			entries: [],
		},
	 token : null,
	 userId : null,
     nutritionBreakdown : {} ,
	 modal : false,
	 loading : false ,  
     error : false,
	setEntries: ()=>{},
	setNutritionBreakdown: ()=>{},
	auth: ()=>{},
	authCheckState: ()=>{},
	setModalStatus: ()=>{},
	addEntry: ()=>{},
});