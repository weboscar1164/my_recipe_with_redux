import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	setShowCategory,
	setCurrentCategory,
} from "../../store/modules/category";
import { clearSearchWord } from "../../store/modules/formData";
import { isEmpty } from "../../utils/helpers";

const CategoryList = () => {
	const showCategory = useSelector((state) => state.category.showCategory);
	const searchWord = useSelector((state) => state.formData.searchWord);
	const currentCategory = useSelector(
		(state) => state.category.currentCategory
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setShowCategory(searchWord));
	}, [searchWord]);

	const onCategoryClikHandler = (category, categoryType) => {
		dispatch(setCurrentCategory({ category, categoryType }));
		dispatch(clearSearchWord());
	};

	return (
		<div>
			{isEmpty(showCategory) ? (
				<h1>検索語句を入力してください</h1>
			) : (
				<ul>
					{Object.keys(showCategory).map((categoryType) => {
						return showCategory[categoryType].map((category) => {
							return (
								<li
									key={category.categoryId}
									onClick={() => onCategoryClikHandler(category, categoryType)}
								>
									{category.categoryName}
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
