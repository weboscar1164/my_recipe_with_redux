import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { getApiData } from "../../api/api";
import { isEmpty } from "../../utils/helpers";

const categorySlice = createSlice({
	name: "category",
	initialState: {
		allCategory: {},
		status: "",
		showCategoryList: {},
		showAndLikeCategoryList: {},
		likeCategoryList: {},
		likeAndShowCategoryList: {},
		currentCategory: { rankingNumber: "" },
	},
	reducers: {
		// CategoryList
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

		conbineCategoryLists(state, action) {
			console.log(action.payload);
			const targetList = action.payload.showCategoryList;
			const conbineList = action.payload.firebaseCategoryLikeList;
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

		clearShowAndLikeCategoryList(state) {
			state.currentCategory = { rankingNumber: "" };
			state.showCategoryList = {};
			state.showAndLikeCategoryList = {};
		},

		// LikeCategoryList
		setLikeCategoryList(state, action) {
			// allCategoryからfirebaseのlikelistを用いて一致するカテゴリを抽出
			console.log("setLikeCategoryList.action:", action.payload);
			const likedCategoryList = {};
			Object.keys(state.allCategory).forEach((categoryType) => {
				likedCategoryList[categoryType] = state.allCategory[categoryType]
					.filter((category) => {
						return action.payload.some((item) => {
							return (
								categoryType === item.categoryType &&
								category.categoryId === item.categoryId
							);
						});
					})
					.map((category) => {
						// 一致するcategoryにfirebase上のIdを付与
						const matchingItem = action.payload.find((item) => {
							return (
								categoryType === item.categoryType &&
								category.categoryId === item.categoryId
							);
						});
						return {
							...category,
							firebaseId: matchingItem ? matchingItem.id : null,
						};
					});
			});
			state.likeCategoryList = likedCategoryList;
		},

		setLikeAndShowCategoryList(state, action) {
			const likeCategoryList = state.likeCategoryList;
			const serchWord = action.payload;

			console.log(action.payload);
			if (!serchWord) {
				state.likeAndShowCategoryList = likeCategoryList;
			} else {
				const resultCategory = {};

				Object.keys(likeCategoryList).forEach((categoryType) => {
					resultCategory[categoryType] = likeCategoryList[categoryType].filter(
						(category) => {
							return new RegExp(action.payload).test(category.categoryName);
						}
					);
				});
				state.likeAndShowCategoryList = resultCategory;
			}
		},

		// CategoryList, LikeCategoryList共通
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
			state.status = "Error";
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
	clearShowAndLikeCategoryList,
	setCurrentCategory,
	clearCurrentCategory,
	conbineCategoryLists,
	setLikeCategoryList,
	setShowAndLikeCategoryList,
	setLikeAndShowCategoryList,
} = categorySlice.actions;

export {
	fetchCategorys,
	setShowCategoryList,
	clearShowAndLikeCategoryList,
	setCurrentCategory,
	clearCurrentCategory,
	conbineCategoryLists,
	setLikeCategoryList,
	setShowAndLikeCategoryList,
	setLikeAndShowCategoryList,
};
export default categorySlice.reducer;
