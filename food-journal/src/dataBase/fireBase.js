import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY3,
	authDomain: 'grayt-fitness.firebaseapp.com',
	databaseURL: 'https://grayt-fitness.firebaseio.com',
	projectId: 'grayt-fitness',
	storageBucket: 'grayt-fitness.appspot.com',
	messagingSenderId: '97435923681',
	appId: '1:97435923681:web:49894567e5e735d099b3a0',
	measurementId: 'G-YTNYSEN4VW',
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

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
		const docRef = firestore
		.collection('journalEntries')
		.doc(`${meal}`)
		.collection(`${date}`)
		.doc(`${docID}`);
		await docRef.delete();
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
		const res = [] 
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
		const docRef = firestore
			.collection('users')
			.doc()
		await docRef.set(info);
	} catch (err) {
		console.log(err);
	}
};
export const getUser = async (userID) => {
	try {
		const docRef = firestore.collection('users');
		const user = await docRef.where('userId', '==', `${userID}`).get()
		if (user.empty) {
			return {};
		}else{
			const res=[]
			user.forEach(doc=>res.push(doc.data()))
			return res
		}
	} catch (err) {
		console.log(err);
	}
};

