import { createSlice } from "@reduxjs/toolkit";

const searchWord = createSlice({
	name: "serachWord",
	initialState: { searchWord: "" },
	reducers: {
		addSearchWord(state, { payload }) {
			state.searchWord = payload;
		},
		clearSearchWord(state) {
			state.searchWord = "";
		},
	},
});

export const { addSearchWord, clearSearchWord } = searchWord.actions;

export default searchWord.reducer;
