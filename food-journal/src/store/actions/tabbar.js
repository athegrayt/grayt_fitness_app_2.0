import {UPDATE_CUR_TAB, SET_TAB_STATUS, SET_PAGE} from './actionTypes'

export const updateCurTab = (curTab, jeop) => {
	return{
		type: UPDATE_CUR_TAB,
		curTab, 
		jeop
	}
}
export const setTabStatus = (modalOpen) => {
	return{
		type: SET_TAB_STATUS, modalOpen 
	}
}
export const setPage = (page) => {
	return{
		type: SET_PAGE, page 
	}
}