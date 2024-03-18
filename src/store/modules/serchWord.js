import { createSlice } from "@reduxjs/toolkit";

const serchWord = createSlice({
	name: "serchWord",
	initialState: { serchWord: "" },
	reducers: {
		addSerchWord(state, { type, payload }) {
			state.serchWord = payload;
		},
		crearSerchWord(state, { type, payload }) {
			state.serchWord = "";
		},
	},
});

export const { addSerchWord, crearSerchWord } = serchWord.actions;

export default serchWord.reducer;
