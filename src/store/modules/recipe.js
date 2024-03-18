import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApiData } from "../../api/api";

const category = createSlice({
	name: "allCategory",
	initialState: { allCategory: {}, status: "" },
	reducers: {},

	extraReducers: (builder) => {
		builder.addCase(fetchCategorys.pending, (state) => {
			state.status = "Loading";
		});
		builder.addCase(fetchCategorys.fulfilled, (state, action) => {
			state.status = "Loaded";
			state.allCategory = action.payload;
		});
		builder.addCase(fetchCategorys.rejected, (state) => {
			state.status = "error";
		});
	},
});

const fetchCategorys = createAsyncThunk("api/getApiData", async () => {
	const VALUE = import.meta.env.VITE_API_KEY;
	const response = await getApiData(
		`https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?format=json&applicationId=${VALUE}`
	);
	return response.result;
});

export { fetchCategorys };
export default category.reducer;
