import * as actionTypes from './actionTypes'

export const addEntry = (entry) =>{
    return{
        type: actionTypes.ADD_ENTRY,
        entry: entry
    }
}