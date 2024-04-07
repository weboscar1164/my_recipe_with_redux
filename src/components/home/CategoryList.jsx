import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	setShowCategoryList,
	setCurrentCategory,
	conbineCategoryLists,
} from "../../store/modules/category";
import { clearSearchWord } from "../../store/modules/formData";
import { isEmpty } from "../../utils/helpers";
import { addCategoryLike, removeCategoryLike } from "../../store/modules/like";
import { handleOpenModal } from "../../store/modules/modal";

const CategoryList = () => {
	const showCategoryList = useSelector(
		(state) => state.category.showCategoryList
	);
	const showAndLikeCategoryList = useSelector(
		(state) => state.category.showAndLikeCategoryList
	);
	const searchWord = useSelector((state) => state.formData.searchWord);
	const currentUser = useSelector((state) => state.user.currentUser);
	const firebaseCategoryLikeList = useSelector(
		(state) => state.like.firebaseCategoryLikeList
	);

	const dispatch = useDispatch();

	useEffect(() => {
		if (searchWord) {
			dispatch(setShowCategoryList(searchWord));
		}
	}, [searchWord]);

	useEffect(() => {
		console.log(showCategoryList);
		dispatch(
			conbineCategoryLists({ showCategoryList, firebaseCategoryLikeList })
		);
		console.log("conbined", showAndLikeCategoryList);
	}, [showCategoryList, firebaseCategoryLikeList]);

	const onCategoryClikHandler = (category, categoryType) => {
		dispatch(setCurrentCategory({ category, categoryType }));
		dispatch(clearSearchWord());
	};

	const onLikeClickHandler = (category, categoryType, currentUser) => {
		if (!currentUser) {
			dispatch(handleOpenModal());
			return;
		}
		if (category.firebaseId) {
			dispatch(removeCategoryLike(category));
		} else {
			dispatch(addCategoryLike({ category, categoryType, currentUser }));
		}
	};

	return (
		<div>
			{isEmpty(showAndLikeCategoryList) ? (
				<h1>検索語句を入力してください</h1>
			) : (
				<ul>
					{Object.keys(showAndLikeCategoryList).map((categoryType) => {
						return showAndLikeCategoryList[categoryType].map((category) => {
							return (
								<li
									key={category.categoryId}
									onClick={() => {
										onCategoryClikHandler(category, categoryType);
									}}
								>
									<span>{category.categoryName}</span>
									<i
										onClick={(e) => {
											e.stopPropagation();
											onLikeClickHandler(category, categoryType, currentUser);
										}}
									>
										{!category.firebaseId ? "☆" : "★"}
									</i>
									<span></span>
								</li>
							);
						});
					})}
				</ul>
			)}
		</div>
	);
};

export default CategoryList;
