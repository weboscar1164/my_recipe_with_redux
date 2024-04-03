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

const CategoryList = () => {
	const showCategoryList = useSelector(
		(state) => state.category.showCategoryList
	);
	const showAndLikeCategoryList = useSelector(
		(state) => state.category.showAndLikeCategoryList
	);
	const searchWord = useSelector((state) => state.formData.searchWord);
	const currentUser = useSelector((state) => state.user.currentUser);
	const categoryLikeList = useSelector((state) => state.like.categoryLikeList);

	const dispatch = useDispatch();

	// useEffect(() => {
	// 	if (currentUser) {
	// 		dispatch(getCategoryLikeList(currentUser));
	// 	}
	// }, [currentUser]);

	useEffect(() => {
		if (searchWord) {
			dispatch(setShowCategoryList(searchWord));
		}
	}, [searchWord]);

	useEffect(() => {
		console.log(showCategoryList);
		dispatch(conbineCategoryLists({ showCategoryList, categoryLikeList }));
		console.log("conbined", showAndLikeCategoryList);
	}, [showCategoryList, categoryLikeList]);

	const onCategoryClikHandler = (category, categoryType) => {
		dispatch(setCurrentCategory({ category, categoryType }));
		dispatch(clearSearchWord());
	};

	const onLikeClickHandler = (category, categoryType, currentUser) => {
		if (category.firebaseId) {
			dispatch(removeCategoryLike(category));
		} else {
			dispatch(addCategoryLike({ category, categoryType, currentUser }));
		}
		console.log("clicked:", categoryLikeList);
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
