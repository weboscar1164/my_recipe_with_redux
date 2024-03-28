import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
	apiKey: "AIzaSyB2JZyGVxK9JioHkU5q7Ym011kJRVL1A4A",
	authDomain: "my-recipeee-with-redux.firebaseapp.com",
	projectId: "my-recipeee-with-redux",
	storageBucket: "my-recipeee-with-redux.appspot.com",
	messagingSenderId: "559144070538",
	appId: "1:559144070538:web:634163c1641e616df2ec73",
	measurementId: "G-SWPFZH36SW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
