import * as actionTypes from './actionTypes'
import axios from '../../axios-journalEntries';

export const addEntrySuccess = (entry) =>{
    return{
        type: actionTypes.ADD_ENTRY_SUCCESS,
        entry: entry.journalEntry
    }
}

export const addEntryFail = (error) => {
    return{
        type: actionTypes.ADD_ENTRY_FAIL,
        error: error
    }
}

export const addEntry = (entry, token) => {
    console.log(token)
    return dispatch => {
        axios
			.post('/journalEntries.json?auth='+ token, entry)
			.then((res) => {
                console.log(res);
                dispatch(addEntrySuccess(entry))
			})
			.catch((error) => {
				console.log(error);
			});
    }
} 