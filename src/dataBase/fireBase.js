import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY3,
	authDomain: 'grayt-fitness.firebaseapp.com',
	databaseURL: 'https://grayt-fitness.firebaseio.com',
	projectId: 'grayt-fitness',
	storageBucket: 'grayt-fitness.appspot.com',
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
	measurementId: process.env.MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const googleAuth = () => {
	firebase.auth().signInWithRedirect(provider);
};
export const retrieveGoogleAuth = async () => {
	try{
		const result =await firebase.auth().getRedirectResult()
				
		if (result.credential) {
					/** @type {firebase.auth.OAuthCredential} */
					const credential = result.credential;
	
					// This gives you a Google Access Token. You can use it to access the Google API.
					const token = credential.accessToken;
					// ...
					const user = result.user;
					return { token, user };
				}
				// The signed-in user info.
	}catch(error){
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			const credential = error.credential;
			// ...
			console.log({ errorCode, errorMessage, email, credential });
		};
};

export const addEntry = async (meal, entry, date) => {
	try {
		const docRef = firestore
			.collection('journalEntries')
			.doc(`${meal}`)
			.collection(`${date}`)
			.doc();
		await docRef.set(entry);
	} catch (err) {
		console.log(err);
	}
};
export const deleteEntry = async (meal, docID, date) => {
	try {
		const docRef = await firestore
			.collection('journalEntries')
			.doc(`${meal}`)
			.collection(`${date}`)
			.doc(`${docID}`)
			.delete();
	} catch (err) {
		console.log(err);
	}
};
export const getEntry = async (meal, date, userID) => {
	try {
		const docRef = firestore
			.collection('journalEntries')
			.doc(`${meal}`)
			.collection(`${date}`);
		const mealEntries = await docRef.where('userId', '==', `${userID}`).get();
		if (mealEntries.empty) {
			return [];
		}
		const res = [];
		mealEntries.forEach((doc) => {
			let entry = doc.data();
			entry.docID = doc.id;
			res.push(entry);
		});
		return res;
	} catch (err) {
		console.log(err);
	}
};
export const addUser = async (info) => {
	try {
		const docRef = firestore.collection('users').doc();
		await docRef.set(info);
	} catch (err) {
		console.log(err);
	}
};
export const getUser = async (userID) => {
	try {
		const docRef = firestore.collection('users');
		const user = await docRef.where('userId', '==', `${userID}`).get();
		if (user.empty) {
			return null;
		} else {
			const res = [];
			user.forEach((doc) => {
				let entry = doc.data();
				entry.docID = doc.id;
				res.push(entry);
			});
			return res;
		}
	} catch (err) {
		console.log(err);
	}
};

export const updateUser = async (updatedWeigthGoal, updatedWeight, docID) => {
	try {
		await firestore
			.collection('users')
			.doc(`${docID}`)
			.update({ goalWeight: updatedWeigthGoal, weight: updatedWeight });
	} catch (err) {
		console.log(err);
	}
};
