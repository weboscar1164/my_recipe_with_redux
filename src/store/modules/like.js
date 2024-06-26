import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { db } from "../../firebase.config";
import { v4 as uuidv4 } from "uuid";

import {
	getDocs,
	addDoc,
	deleteDoc,
	collection,
	serverTimestamp,
	query,
	where,
} from "firebase/firestore";

const likeSlice = createSlice({
	name: "likes",
	initialState: {
		firebaseCategoryLikeList: [],
		status: "idle",
	},
	reducers: {
		clearLikeList(state) {
			state.firebaseCategoryLikeList = [];
		},
	},
	extraReducers: (builder) => {
		//getFirebaseCategoryLikeList
		builder.addCase(getFirebaseCategoryLikeList.fulfilled, (state, action) => {
			state.status = "Loaded!";
			state.firebaseCategoryLikeList = [...action.payload];
			console.log(state.firebaseCategoryLikeList);
		});
		builder.addCase(getFirebaseCategoryLikeList.rejected, (state) => {
			state.status = "error!!";
		});

		// addCategoryLike
		builder.addCase(addCategoryLike.fulfilled, (state, action) => {
			// console.log(current(state.firebaseCategoryLikeList));
			// console.log(action.payload);
			state.firebaseCategoryLikeList.push(action.payload);
		});
		builder.addCase(addCategoryLike.rejected, (state) => {
			state.status = "error!!";
			console.log("error!!");
			state.error = action.error.message;
		});

		// removeCategoryLike
		builder.addCase(removeCategoryLike.fulfilled, (state, action) => {
			console.log(current(state.firebaseCategoryLikeList));
			console.log(action.payload.firebaseId);
			state.firebaseCategoryLikeList = state.firebaseCategoryLikeList.filter(
				(item) => item.id !== action.payload.firebaseId
			);
		});
		builder.addCase(removeCategoryLike.rejected, (state, action) => {
			state.status = "error!!";
			console.log("error!!");
		});
	},
});

const getFirebaseCategoryLikeList = createAsyncThunk(
	"fireBase/getLike",
	async (payload) => {
		try {
			const q = query(
				collection(db, "likeCategory"),
				where("userId", "==", payload)
			);
			const querySnapshot = await getDocs(q);

			return querySnapshot.docs.map((doc) => ({
				...doc.data(),
				updateAt: "estimate",
			}));
		} catch (error) {
			console.error(error);

			throw error;
		}
	}
);

const addCategoryLike = createAsyncThunk(
	"firebase/addLike",
	async (payload) => {
		try {
			console.log("added");
			const newId = uuidv4();
			const userId = payload.currentUser;
			const category = payload.category;
			const categoryType = payload.categoryType;

			const newCategoryLike = {
				id: newId,
				userId: userId,
				categoryId: category.categoryId,
				categoryType: categoryType,
				updateAt: serverTimestamp(),
			};

			await addDoc(collection(db, "likeCategory"), newCategoryLike);
			return { ...newCategoryLike, updateAt: "estimate" };
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

const removeCategoryLike = createAsyncThunk(
	"firebase/removeLike",
	async (payload) => {
		try {
			console.log(payload);
			const q = query(
				collection(db, "likeCategory"),

				where("id", "==", payload.firebaseId)
			);
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				const docRef = doc.ref;
				deleteDoc(docRef);
			});
			return payload;
		} catch {
			console.error(error);
			throw error;
		}
	}
);

const { clearLikeList } = likeSlice.actions;

export {
	clearLikeList,
	getFirebaseCategoryLikeList,
	addCategoryLike,
	removeCategoryLike,
};

export default likeSlice.reducer;
