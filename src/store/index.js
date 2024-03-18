import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./modules/recipe";
import serchWordReducer from "./modules/serchWord";

export default configureStore({
	reducer: {
		category: categoryReducer,
		serchWord: serchWordReducer,
	},
});
