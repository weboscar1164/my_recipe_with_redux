import { createSlice } from "@reduxjs/toolkit";

const formdataSlice = createSlice({
	name: "formData",
	initialState: {
		searchWord: "",
	},
	reducers: {
		// searchWord
		addSearchWord(state, action) {
			state.searchWord = action.payload;
		},
		clearSearchWord(state) {
			state.searchWord = "";
		},
	},
});

export const { addSearchWord, clearSearchWord, setLoginForm } =
	formdataSlice.actions;

export default formdataSlice.reducer;
