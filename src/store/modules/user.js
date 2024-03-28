import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase.config";
const user = createSlice({
	name: "auth",
	initialState: {
		user: null,
	},
	reducers: {
		logIn(state, { payload }) {
			state.user = payload;
		},
		logOut(state, { payload }) {
			state.user = null;
		},
	},

	// extraReducers: (builder) => {
	// 	builder.addCase(fetchCategorys.pending, (state) => {
	// 		state.status = "Loading";
	// 	});
	// 	builder.addCase(fetchCategorys.fulfilled, (state, action) => {
	// 		state.status = "Loaded";
	// 		// state.allCategory = action.payload;
	// 	});
	// 	builder.addCase(fetchCategorys.rejected, (state) => {
	// 		state.status = "error";
	// 	});
	// },
});

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

const { logIn, logOut } = user.actions;

export { userCredential, logIn, logOut };
export default user.reducer;
