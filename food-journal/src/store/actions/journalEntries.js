import * as actionTypes from './actionTypes'
import axios from '../../axios-journalEntries'

export const entryDelete = (id) => {
    return{
        type: actionTypes.DELETE_ENTRY, 
        entryID: id
    }
}

export const setEntries = (entries) => {
	return {
		type: actionTypes.SET_ENTRIES,
		Entries: entries,
	};
};

export const fetchEntriesFailed = () => {
	return {
		type: actionTypes.FETCH_ENTRIES_FAILED,
	};
};

export const initEntries = () => {
	return (dispatch) => {
		axios
			.get(
				'https://grayt-fitness.firebaseio.com/journalEntries/-MJiNVfRlzMYzhlUWgDe.json'
			)
			.then((response) => {
				dispatch(setEntries(response.data));
			})
			.catch((error) => {
				dispatch(fetchEntriesFailed());
			});
	};
};