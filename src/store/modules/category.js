import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { getApiData } from "../../api/api";
import { isEmpty } from "../../utils/helpers";

const categorySlice = createSlice({
	name: "category",
	initialState: {
		allCategory: {},
		status: "",
		showCategoryList: {},
		currentCategory: { rankingNumber: "" },
		showAndLikeCategoryList: {},
	},
	reducers: {
		setShowCategoryList(state, action) {
			// console.log(action.payload);
			if (!action.payload) {
				state.showCategoryList = {};
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
				state.showCategoryList = resultCategory;
				// console.log(state.showCategoryList);
			}
		},
		setCurrentCategory(state, action) {
			// console.log(action.payload);
			if (!isEmpty(action.payload)) {
				const category = action.payload.category;
				const categoryType = action.payload.categoryType;
				// 楽天ランキングAPIのURLに使用するカテゴリ番号を生成する
				let rankingNumber;
				if (categoryType === "large") {
					rankingNumber = category.categoryId;
				} else if (categoryType === "medium") {
					const largeCategory = state.allCategory.large.find(
						(_largeCategory) =>
							category.parentCategoryId == _largeCategory.categoryId
					);
					rankingNumber = `${largeCategory.categoryId}-${category.categoryId}`;
				} else if (categoryType === "small") {
					const mediumCategory = state.allCategory.medium.find(
						(_mediumCategory) =>
							category.parentCategoryId == _mediumCategory.categoryId
					);
					const largeCategory = state.allCategory.large.find(
						(_largeCategory) =>
							mediumCategory.parentCategoryId == _largeCategory.categoryId
					);
					rankingNumber = `${largeCategory.categoryId}-${mediumCategory.categoryId}-${category.categoryId}`;
				}

				state.currentCategory = { ...category, rankingNumber: rankingNumber };
			} else {
				state.currentCategory = { rankingNumber: "" };
			}
			// console.log(state.currentCategory);
		},
		clearCurrentCategory(state) {
			state.currentCategory = { rankingNumber: "" };
		},

		conbineCategoryLists(state, action) {
			console.log(action.payload);
			const targetList = action.payload.showCategoryList;
			const conbineList = action.payload.categoryLikeList;
			const getIsCategoryLike = (category, categoryType, conbineList) => {
				const foundObject = conbineList.find(
					(obj) =>
						obj.categoryId === category.categoryId &&
						obj.categoryType === categoryType
				);
				if (foundObject !== undefined) {
					return foundObject.id;
				} else {
					return null;
				}
			};

			Object.keys(targetList).forEach((categoryType) => {
				state.showAndLikeCategoryList[categoryType] = targetList[
					categoryType
				].map((category) => ({
					...category,
					firebaseId: getIsCategoryLike(category, categoryType, conbineList),
				}));
			});
			console.log(current(state.showAndLikeCategoryList));
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

const {
	setShowCategoryList,
	setCurrentCategory,
	clearCurrentCategory,
	conbineCategoryLists,
} = categorySlice.actions;

export {
	fetchCategorys,
	setShowCategoryList,
	setCurrentCategory,
	clearCurrentCategory,
	conbineCategoryLists,
};
export default categorySlice.reducer;
