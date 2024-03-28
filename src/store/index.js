import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./modules/category";
import formDataReducer from "./modules/formData";
import rankingReducer from "./modules/ranking";
import userReducer from "./modules/user";

export default configureStore({
	reducer: {
		category: categoryReducer,
		formData: formDataReducer,
		ranking: rankingReducer,
		user: userReducer,
	},
});
