import { initializeApp } from 'firebase/app';
import { Database, getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyD7UanLzIUpnbow0HzToZJvMuIYFAVejgE',
	authDomain: 'productsproject-76fa7.firebaseapp.com',
	projectId: 'productsproject-76fa7',
	storageBucket: 'productsproject-76fa7.firebasestorage.app',
	messagingSenderId: '235645535668',
	appId: '1:235645535668:web:29ad0b045d2194c064dee1',
	databaseURL:
		'https://todoproject-49a54-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
