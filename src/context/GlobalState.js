import React, { useReducer } from 'react';
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
} from './actionTypes';

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
		const t = date || new Date();
		const z = t.getTimezoneOffset() * 60 * 1000;
		const tLocal = new Date(t - z);
		const curDate = tLocal.toISOString().slice(0, 10);
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
		const t = new Date();
		const z = t.getTimezoneOffset() * 60 * 1000;
		const tLocal = new Date(t - z);
		const addDate = tLocal.toISOString().slice(0, 10);
		try {
			firebase.addEntry(meal, entry, addDate);
			dispatch({ type: `ADD_${meal.toUpperCase()}_ENTRY`, entry });
		} catch (err) {
			console.log(err);
		}
	};

	const deleteEntry = async (entry, docID, meal, date) => {
		try {
			await firebase.deleteEntry(meal, docID, date);
			dispatch({ type: DELETE_ENTRY, meal, entry });
		} catch (err) {
			console.log(err);
		}
	};
	const googleAuth = async () => {
		try {
			firebase.googleAuth();
		} catch (err) {
			console.log(err);
		}
	};
	const googleAuthData = async () => {
		try {
			const data = await firebase.retrieveGoogleAuth();
			if (data) {
				auth('', '', '', data);
			}
		} catch (err) {
			console.log(err);
		}
	};
	const auth = async (email, password, isSignup, google) => {
		dispatch({ type: AUTH_START });
		try {
			let userToken = null;
			let tokenExpirationDate = null;
			let curUserId = null;
			if (google) {
				if (google.errorCode) {
					return dispatch({ type: AUTH_FAIL, error: google.errorMessage });
				}else{
					userToken = google.token;
					tokenExpirationDate = new Date(
						new Date().getTime() + 3600000
					);
					curUserId = google.user.uid;
					const displayName = google.user.displayName;
					dispatch({ type: SET_NAME, displayName });
				}
			} else {
				const response = isSignup ? await firebase.newEmailAuth(email, password): await firebase.loginEmailAuth(email, password);
				if(response.errorCode){
					return dispatch({ type: AUTH_FAIL, error: response.errorMessage });
				}else{
					tokenExpirationDate = new Date(new Date().getTime() + 3600000);
					userToken = response.b.b.h;
					curUserId = response.uid;
				}
					
			}
			const user = await firebase.getUser(curUserId);
			let registered = false;
			if (user) {
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
			} 
			localStorage.setItem('token', `${userToken}`);
			localStorage.setItem('expirationDate', `${tokenExpirationDate}`);
			localStorage.setItem('userId', `${curUserId}`);
			localStorage.setItem('registered', `${registered}`);
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
			dispatch({
				type: AUTH_LOGOUT,
			});
			// logout();
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate <= new Date()) {
				logout();
			} else {
				const userId = localStorage.getItem('userId');
				const registered = localStorage.getItem('registered');
				const user = await firebase.getUser(userId);
				if (user && JSON.parse(`${registered}`.toLowerCase()) === true) {
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
				}else{
					localStorage.setItem('registered', false)
				}
				dispatch({ type: AUTH_SUCCESS, token, userId, registered });
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
		firebase.signOut()
		dispatch({
			type: AUTH_LOGOUT,
		});
	};
	const checkAuthTimeout = (expirationTime) => {
		setTimeout(() => {
			logout();
		}, expirationTime);
	};

	const updateUser = async (updatedWeigthGoal, updatedWeight, docID) => {
		await firebase.updateUser(updatedWeigthGoal, updatedWeight, docID);
		dispatch({ type: UPDATE_USER, updatedWeigthGoal, updatedWeight });
	};

	const updateCurTab = (tab) => {
		dispatch({ type: UPDATE_CUR_TAB, tab });
	};

	const resetError = ()=>{
		dispatch({ type: AUTH_FAIL });
	}

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
		resetError,
	};

	return (
		<DailyJournalContext.Provider value={context}>
			{props.children}
		</DailyJournalContext.Provider>
	);
};

export default GlobalState;
