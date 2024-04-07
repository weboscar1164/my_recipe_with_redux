import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
	setCurrentCategory,
	setLikeAndShowCategoryList,
	setLikeCategoryList,
} from "../../store/modules/category";
import {
	getFirebaseCategoryLikeList,
	removeCategoryLike,
} from "../../store/modules/like";
import { clearSearchWord } from "../../store/modules/formData";
import { isEmpty } from "../../utils/helpers";

const LikeCategoryList = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.user.currentUser);
	const firebaseCategoryLikeList = useSelector(
		(state) => state.like.firebaseCategoryLikeList
	);
	const likeCategoryList = useSelector(
		(state) => state.category.likeCategoryList
	);
	const likeAndShowCategoryList = useSelector(
		(state) => state.category.likeAndShowCategoryList
	);
	const serchWord = useSelector((state) => state.formData.searchWord);
	useEffect(() => {
		// dispatch(getFirebaseCategoryLikeList(currentUser));
		dispatch(setLikeCategoryList(firebaseCategoryLikeList));
		console.log("likeCategoryList: ", likeCategoryList);
	}, [firebaseCategoryLikeList]);

	useEffect(() => {
		if (!isEmpty(likeCategoryList)) {
			dispatch(setLikeAndShowCategoryList(serchWord));
		}
		console.log("likeAndShowCategoryList: ", likeAndShowCategoryList);
	}, [likeCategoryList, serchWord]);

	const onCategoryClikHandler = (category, categoryType) => {
		dispatch(setCurrentCategory({ category, categoryType }));
		dispatch(clearSearchWord());
	};

	const onDeleteClickHandler = (category) => {
		dispatch(removeCategoryLike(category));
	};

	return (
		<>
			{!isEmpty(likeAndShowCategoryList) && (
				<div>
					<ul>
						{Object.keys(likeAndShowCategoryList).map((categoryType) => {
							return likeAndShowCategoryList[categoryType].map((category) => {
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
			)}
		</>
	);
};

export default LikeCategoryList;
