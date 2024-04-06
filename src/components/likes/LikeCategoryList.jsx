import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
	setCurrentCategory,
	setShowAndLikeCategoryList,
} from "../../store/modules/category";
import {
	getCategoryLikeList,
	removeCategoryLike,
} from "../../store/modules/like";
import { clearSearchWord } from "../../store/modules/formData";

const LikeCategoryList = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.user.currentUser);
	const categoryLikeList = useSelector((state) => state.like.categoryLikeList);
	const showAndLikeCategoryList = useSelector(
		(state) => state.category.showAndLikeCategoryList
	);
	useEffect(() => {
		// dispatch(getCategoryLikeList(currentUser));
		dispatch(setShowAndLikeCategoryList(categoryLikeList));
		// console.log("showAndLikeCategoryList: ", showAndLikeCategoryList);
	}, [categoryLikeList]);

	const onCategoryClikHandler = (category, categoryType) => {
		dispatch(setCurrentCategory({ category, categoryType }));
		dispatch(clearSearchWord());
	};

	const onDeleteClickHandler = (category) => {
		dispatch(removeCategoryLike(category));
	};

	return (
		<div>
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
										onDeleteClickHandler(category);
									}}
								>
									✘
								</i>
								<span></span>
							</li>
						);
					});
				})}
			</ul>
		</div>
	);
};

export default LikeCategoryList;
