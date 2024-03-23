import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./modules/category";
import searchWordReducer from "./modules/searchWord";
import rankingReducer from "./modules/ranking";

export default configureStore({
	reducer: {
		category: categoryReducer,
		searchWord: searchWordReducer,
		ranking: rankingReducer,
	},
});
