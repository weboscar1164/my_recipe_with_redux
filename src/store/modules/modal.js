import { createSlice } from "@reduxjs/toolkit";

const modalControlSlice = createSlice({
	name: "modal",
	initialState: {
		isOpen: false,
	},

	reducers: {
		handleOpenModal(state) {
			state.isOpen = true;
		},
		handleCloseModal(state) {
			state.isOpen = false;
		},
	},
});

const { handleOpenModal, handleCloseModal } = modalControlSlice.actions;

export { handleCloseModal, handleOpenModal };

export default modalControlSlice.reducer;
