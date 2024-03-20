import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApiData } from "../../api/api";

const category = createSlice({
	name: "category",
	initialState: { allCategory: {}, status: "", showCategory: {} },
	reducers: {
		setShowCategory(state, action) {
			console.log(action.payload);
			if (!action.payload) {
				state.showCategory = {};
			} else {
				const resultCategory = Object.keys(state.allCategory).reduce(
					(result, categoryType) => {
						const uniqueNames = [];
						state.allCategory[categoryType].forEach((category) => {
							// すでに同じ categoryName が他の categoryType で追加されている場合はスキップ
							const isDuplicateInOtherType = Object.keys(result).some((type) =>
								result[type].some(
									(c) => c.categoryName === category.categoryName
								)
							);
							if (
								!isDuplicateInOtherType &&
								new RegExp(action.payload).test(category.categoryName)
							) {
								uniqueNames.push(category);
							}
						});
						result[categoryType] = uniqueNames;
						return result;
					},
					{}
				);
				state.showCategory = resultCategory;
				console.log(state.showCategory);
			}
		},
	},

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

const { setShowCategory } = category.actions;

export { fetchCategorys, setShowCategory };
export default category.reducer;
