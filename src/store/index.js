import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./modules/category";
import serchWordReducer from "./modules/serchWord";

export default configureStore({
	reducer: {
		category: categoryReducer,
		serchWord: serchWordReducer,
	},
});
