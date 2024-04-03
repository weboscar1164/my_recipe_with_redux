import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase.config";
const userSlice = createSlice({
	name: "auth",
	initialState: {
		currentUser: null,
	},
	reducers: {
		logIn(state, { payload }) {
			state.currentUser = payload;
			localStorage.setItem("isAuth", payload);
		},
		logOut(state, { payload }) {
			state.currentUser = null;
			localStorage.removeItem("isAuth");
		},
	},
});

//あとでcomponentから移す
const userSignUp = createAsyncThunk(
	"firebase/signUp",
	async (email, password) => {
		if (!email || !password) {
			alert("必須項目が未入力です");
			return false;
		}
		await createUserWithEmailAndPassword(auth, email, password);
		setIsLogin();
		return true;
	}
);

const userCredential = createAsyncThunk(
	"firebase/login",
	async (email, password) => {
		console.log("called");
		if (email === "" || password === "") {
			alert("必須項目が未入力です");
			return false;
		}
		await signInWithEmailAndPassword(auth, email, password);
		return response.result;
	}
);

const { logIn, logOut } = userSlice.actions;

export { logIn, logOut };
export default userSlice.reducer;
