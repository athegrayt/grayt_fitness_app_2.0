import {SET_TAB_STATUS, UPDATE_CUR_TAB, SET_PAGE} from '../actions/actionTypes'

const initialState={
	modalOpen: false,
	page: null,
	icons:{
		home: false, 
		records: false, 
		settings: false, 
	}
}

const tabBarReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_TAB_STATUS:
		const updateModalOpen =
			action.modalOpen === null ? !state.modalOpen : action.modalOpen;
		return {
			...state,
			modalOpen: updateModalOpen,
		};
		case SET_PAGE:
			return{
				...state,
				page: action.page
			}
		case UPDATE_CUR_TAB:
		const updateTabState = {...state.icons}
			for(let icon in updateTabState){
				updateTabState[icon]= false
				if(icon === action.curTab){
				updateTabState[icon]= true
				}
			} 
			return {icons:updateTabState, question: false}
		default:
			return state;
	}
};

export default tabBarReducer;
