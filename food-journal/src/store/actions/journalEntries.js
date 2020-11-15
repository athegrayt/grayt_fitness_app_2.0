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
		entries: entries,
	};
};

export const fetchEntriesFailed = () => {
	return {
		type: actionTypes.FETCH_ENTRIES_FAILED,
	};
};

export const initEntries = (token, userId) => {
	return (dispatch) => {
		const queryParams =
			`?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
		axios
			.get(
				'https://grayt-fitness.firebaseio.com/journalEntries.json' +
					queryParams
			)
			.then((response) => {
				const curJournalEntries = []
				for(let entryKey in response.data){
					curJournalEntries.push(response.data[entryKey].journalEntry)
				}
				console.log(curJournalEntries)
				dispatch(setEntries(curJournalEntries));
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data);
				} else if (err.request) {
					console.log(err.request);
				} else {
					console.log('err', err.message);
				}
				console.log(err);
				dispatch(fetchEntriesFailed());
			});
	};
};