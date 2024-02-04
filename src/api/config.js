import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyA7YIVJNC5iXcCYlttYcpdbjYVXZNJelOc',
	authDomain: 'tcl-68-smart-shopping-list.firebaseapp.com',
	projectId: 'tcl-68-smart-shopping-list',
	storageBucket: 'tcl-68-smart-shopping-list.appspot.com',
	messagingSenderId: '883336693926',
	appId: '1:883336693926:web:773604791570b6315f4c67',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
