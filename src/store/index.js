import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./modules/category";
import formDataReducer from "./modules/formData";
import rankingReducer from "./modules/ranking";
import userReducer from "./modules/user";
import likeReducer from "./modules/like";

export default configureStore({
	reducer: {
		category: categoryReducer,
		formData: formDataReducer,
		ranking: rankingReducer,
		user: userReducer,
		like: likeReducer,
	},
	// middleware: (getDefaultMiddleware) =>
	// 	getDefaultMiddleware({
	// 		serializableCheck: {
	// 			ignoredActions: ["fireBase/getLike"],
	// 		},
	// 	}),
});
