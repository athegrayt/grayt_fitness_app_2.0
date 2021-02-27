import React, { useReducer } from 'react';
import axios from 'axios';
import dailyJournalReducer from './global-state-reducer';
import * as firebase from '../dataBase/fireBase';
import DailyJournalContext from './global-state-context';
import {
	AUTH_SUCCESS,
	UPDATE_CUR_TAB,
	AUTH_START,
	AUTH_FAIL,
	AUTH_LOGOUT,
	INIT_ENTRIES,
	DELETE_ENTRY,
	SET_USER_SUCCESS,
	UPDATE_USER,
	SET_NAME
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
	const docID = null;
	const height = null;
	const age = null;
	const activity = null;
	const sex = null;
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
		height,
		age,
		activity,
		sex,
		weight,
		goalWeight,
		calGoal,
		docID,
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
			dispatch({ type: AUTH_START });
			await firebase.addUser(info);
			localStorage.setItem('registered', true);
			dispatch({ type: SET_USER_SUCCESS, info });
		} catch (err) {
			console.log(err);
		}
	};

	const initEntries = async (token, userId, date) => {
		dispatch({ type: AUTH_START });
		const curDate = date.toISOString().slice(0, 10);
		let meals = ['breakfast', 'lunch', 'dinner', 'snack'];
		try {
			const mealEntries = [];
			for (const meal of meals) {
				const entries = await firebase.getEntry(meal, curDate, userId);
				mealEntries.push(entries);
			}
			dispatch({ type: INIT_ENTRIES, mealEntries });
		} catch (err) {
			console.log(err);
		}
	};

	const addEntry = async (meal, entry, token) => {
		const addDate = new Date().toISOString().slice(0, 10);
		try {
			firebase.addEntry(meal, entry, addDate);
			dispatch({ type: `ADD_${meal.toUpperCase()}_ENTRY`, entry });
		} catch (err) {
			console.log(err);
			// dispatch(addEntryFail());
		}
	};

	const deleteEntry = async (entry, docID, meal, date) => {
		console.log({ entry, docID, meal, date });
		try {
			await firebase.deleteEntry(meal, docID, date);
			dispatch({ type: DELETE_ENTRY, meal, entry });
		} catch (err) {
			console.log(err);
		}
	};
	const googleAuth = async () => {
		try {
			const res = await firebase.googleAuth();
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};
	const googleAuthData = async () => {
		try {
			const data = await firebase.retrieveGoogleAuth();
			console.log(data);
			if (data) {
				auth('', '', '', data);
			}
		} catch (err) {
			console.log(err);
		}
	};
	const auth = async (email, password, isSignup, google) => {
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
			let userToken = null;
			let tokenExpirationDate = null;
			let curUserId = null;
			if (google) {
				userToken = google.token;
				tokenExpirationDate = new Date(
					new Date().getTime() + google.user.ba.currentUser.i.u + 3600 * 1000
				);
				curUserId = google.user.l;
				const displayName = google.user.displayName
				dispatch({ type: SET_NAME, displayName });
			} else {
				const response = await axios.post(url, authData);
				tokenExpirationDate = new Date(
					new Date().getTime() + response.data.expiresIn * 1000
				);
				userToken = response.data.idToken;
				curUserId = response.data.localId;
			}
			console.log({ userToken, tokenExpirationDate, curUserId });
			localStorage.setItem('token', `${userToken}`);
			localStorage.setItem('expirationDate', `${tokenExpirationDate}`);
			localStorage.setItem('userId', `${curUserId}`);
			const user = await firebase.getUser(curUserId);
			let registered = false;
			if (Object.keys(user).length !== 0) {
				localStorage.setItem('registered', true);
				setUserInfo(
					user[0].weight,
					user[0].goalWeight,
					user[0].calGoal,
					user[0].name,
					user[0].height,
					user[0].age,
					user[0].activity,
					user[0].sex,
					user[0].docID
				);
				registered = true;
			} else {
				localStorage.setItem('registered', false);
			}
			dispatch({
				type: AUTH_SUCCESS,
				token: userToken,
				userId: curUserId,
				registered,
			});
			checkAuthTimeout(tokenExpirationDate);
		} catch (err) {
			console.log(err);
			dispatch({ type: AUTH_FAIL, error: err.response.data });
		}
	};
	const authCheckState = async () => {
		dispatch({ type: AUTH_START });

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
				const user = await firebase.getUser(userId);
				if (JSON.parse(`${registered}`.toLowerCase()) === true) {
					setUserInfo(
						user[0].weight,
						user[0].goalWeight,
						user[0].calGoal,
						user[0].name,
						user[0].height,
						user[0].age,
						user[0].activity,
						user[0].sex,
						user[0].docID
					);
				}
				dispatch({ type: AUTH_SUCCESS, token, userId, registered });
				checkAuthTimeout(
					(expirationDate.getTime() - new Date().getTime()) / 1000
				);
			}
		}
	};

	const setUserInfo = (
		weight,
		goalWeight,
		calGoal,
		name,
		height,
		age,
		activity,
		sex,
		docID
	) => {
		return dispatch({
			type: SET_USER_SUCCESS,
			weight,
			goalWeight,
			calGoal,
			name,
			height,
			age,
			activity,
			sex,
			docID,
		});
	};

	const logout = () => {
		dispatch({ type: AUTH_START });
		localStorage.removeItem('token');
		localStorage.removeItem('expirationDate');
		localStorage.removeItem('userId');
		localStorage.removeItem('registered');
		dispatch({
			type: AUTH_LOGOUT,
		});
	};
	const checkAuthTimeout = (expirationTime) => {
		setTimeout(() => {
			logout();
		}, expirationTime * 1000);
	};

	const updateUser = async (updatedWeigthGoal, updatedWeight, docID) => {
		await firebase.updateUser(updatedWeigthGoal, updatedWeight, docID);
		dispatch({ type: UPDATE_USER, updatedWeigthGoal, updatedWeight });
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
		height: dailyJournalState.height,
		age: dailyJournalState.age,
		activity: dailyJournalState.activity,
		sex: dailyJournalState.sex,
		weight: dailyJournalState.weight,
		goalWeight: dailyJournalState.goalWeight,
		calGoal: dailyJournalState.calGoal,
		registered: dailyJournalState.registered,
		docID: dailyJournalState.docID,
		loading: dailyJournalState.loading,
		setEntries,
		auth,
		googleAuth,
		googleAuthData,
		authCheckState,
		deleteEntry,
		addEntry,
		initEntries,
		updateCurTab,
		addUser,
		updateUser,
		logout,
	};
	console.log('GlobalState');
	return (
		<DailyJournalContext.Provider value={context}>
			{props.children}
		</DailyJournalContext.Provider>
	);
};

export default GlobalState;
