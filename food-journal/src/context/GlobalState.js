import React, { useReducer } from 'react';
import axios from 'axios';
import dailyJournalReducer from './daily-journal-reducer';
import * as firebase from '../dataBase/fireBase';
import DailyJournalContext from './daily-journal-context';
import {
	AUTH_SUCCESS,
	UPDATE_CUR_TAB,
	AUTH_START,
	AUTH_FAIL,
	AUTH_LOGOUT,
	INIT_ENTRIES,
	DELETE_ENTRY,
	SET_USER_SUCCESS,
} from '../store/actions/actionTypes';

const GlobalState = (props) => {
	const breakfast = {
		name: 'breakfast',
		entries: [],
	};
	const lunch = {
		name: 'lunch',
		entries: [],
	};
	const dinner = {
		name: 'dinner',
		entries: [],
	};
	const snack = {
		name: 'snack',
		entries: [],
	};
	const name = null;
	const weight = null;
	const calGoal = null;
	const goalWeight = null;
	const token = null;
	const userId = null;
	const nutritionBreakdown = {};
	const modal = false;
	const loading = false;
	const error = false;
	const registered = false;
	const curTab = 'home';
	const [dailyJournalState, dispatch] = useReducer(dailyJournalReducer, {
		breakfast,
		lunch,
		dinner,
		snack,
		nutritionBreakdown,
		token,
		userId,
		modal,
		loading,
		error,
		curTab,
		name,
		weight,
		goalWeight,
		calGoal,
		registered,
	});

	const setEntries = async (token, userId, meal) => {
		const curDate = new Date().toISOString().slice(0, 10);
		let meals = meal ? [`${meal}`] : ['breakfast', 'lunch', 'dinner', 'snack'];
		try {
			meals.forEach(async (meal) => {
				const mealEntries = await firebase.getEntry(meal, curDate, userId);
				return dispatch({ type: `SET_${meal.toUpperCase()}`, mealEntries });
			});
		} catch (err) {
			console.log(err);
		}
	};

	const addUser = async (info, registered) => {
		try {
			await firebase.addUser(info);
			localStorage.setItem('registered', true);
			dispatch({ type: SET_USER_SUCCESS, info });
		} catch (err) {
			console.log(err);
		}
	};

	const initEntries = async (token, userId, date) => {
		const curDate = date.toISOString().slice(0, 10);
		let meals = ['breakfast', 'lunch', 'dinner', 'snack'];
		try {
			const mealEntries = [];
			for (const meal of meals) {
				const entries = await firebase.getEntry(meal, curDate, userId);
				console.log(entries);
				mealEntries.push(entries);
			}
			console.log('Meal entries from Firebase', mealEntries);
			dispatch({ type: INIT_ENTRIES, mealEntries });
		} catch (err) {
			console.log(err);
		}
	};

	const addEntry = async (meal, entry, token) => {
		console.log(entry);
		const addDate = new Date().toISOString().slice(0, 10);
		try {
			firebase.addEntry(meal, entry, addDate);
			dispatch({ type: `ADD_${meal.toUpperCase()}_ENTRY`, entry });
		} catch (err) {
			console.log(err);
			// dispatch(addEntryFail());
		}
	};

	const deleteEntry = (entry, docID, meal, date) => async (dispatch) => {
		try {
			await firebase.deleteEntry(meal, docID, date);
			dispatch({ type: DELETE_ENTRY, meal, entry });
		} catch (err) {
			console.log(err);
		}
	};

	const auth = async (email, password, isSignup) => {
		dispatch({ type: AUTH_START });
		const authData = {
			email,
			password,
			returnSecureToken: true,
		};
		let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY3}`;
		if (isSignup === false) {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY3}`;
		}
		try {
			const response = await axios.post(url, authData);
			const expirationDate = new Date(
				new Date().getTime() + response.data.expiresIn * 1000
			);
			localStorage.setItem('token', response.data.idToken);
			localStorage.setItem('expirationDate', expirationDate);
			localStorage.setItem('userId', response.data.localId);
			const user = await firebase.getUser(response.data.localId);
			console.log(user);
			let registered = false;
			if (Object.keys(user).length !== 0) {
				localStorage.setItem('registered', true);
				setUserInfo(
					user[0].weight,
					user[0].goalWeight,
					user[0].calGoal,
					user[0].name
				);
				registered = true;
			} else {
				localStorage.setItem('registered', false);
			}
			dispatch({
				type: AUTH_SUCCESS,
				token: response.data.idToken,
				userId: response.data.localId,
				registered,
			});
			checkAuthTimeout(response.data.expiresIn);
		} catch (err) {
			console.log(err);
			dispatch({ type: AUTH_FAIL, error: err.response.data });
		}
	};
	const authCheckState = () => {
		const token = localStorage.getItem('token');
		if (!token) {
			logout();
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate <= new Date()) {
				logout();
			} else {
				const userId = localStorage.getItem('userId');
				const registered = localStorage.getItem('registered');
				dispatch({ type: AUTH_SUCCESS, token, userId, registered });
				checkAuthTimeout(
					(expirationDate.getTime() - new Date().getTime()) / 1000
				);
			}
		}
	};

	const setUserInfo = (weight, goalWeight, calGoal, name) => {
		return dispatch({
			type: SET_USER_SUCCESS,
			weight,
			goalWeight,
			calGoal,
			name,
		});
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('expirationDate');
		localStorage.removeItem('userId');
		dispatch({
			type: AUTH_LOGOUT,
		});
	};
	const checkAuthTimeout = (expirationTime) => {
		setTimeout(() => {
			logout();
		}, expirationTime * 1000);
	};

	const updateCurTab = (tab) => {
		dispatch({ type: UPDATE_CUR_TAB, tab });
	};

	let context = {
		breakfast: dailyJournalState.breakfast,
		lunch: dailyJournalState.lunch,
		dinner: dailyJournalState.dinner,
		snack: dailyJournalState.snack,
		nutritionBreakdown: dailyJournalState.nutritionBreakdown,
		token: dailyJournalState.token,
		userId: dailyJournalState.userId,
		modal: dailyJournalState.modal,
		error: dailyJournalState.error,
		curTab: dailyJournalState.curTab,
		name: dailyJournalState.name,
		weight: dailyJournalState.weight,
		goalWeight: dailyJournalState.goalWeight,
		calGoal: dailyJournalState.calGoal,
		registered: dailyJournalState.registered,
		setEntries,
		auth,
		authCheckState,
		deleteEntry,
		addEntry,
		initEntries,
		updateCurTab,
		addUser,
	};
	console.log('GlobalState');
	return (
		<DailyJournalContext.Provider value={context}>
			{props.children}
		</DailyJournalContext.Provider>
	);
};

export default GlobalState;
