import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShowCategory } from "../../store/modules/category";
import { isEmpty } from "../../utils/helpers";

const CategoryList = () => {
	const allCategory = useSelector((state) => state.category.allCategory);
	const showCategory = useSelector((state) => state.category.showCategory);
	const serchWord = useSelector((state) => state.serchWord.serchWord);
	const status = useSelector((state) => state.category.status);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setShowCategory(serchWord));
	}, [serchWord]);

	return (
		<div>
			{isEmpty(showCategory) ? (
				<h1>検索語句を入力してください</h1>
			) : (
				<ul>
					{Object.keys(showCategory).map((categoryType) => {
						return showCategory[categoryType].map((category) => {
							return <li key={category.categoryId}>{category.categoryName}</li>;
						});
					})}
				</ul>
			)}
		</div>
	);
};

export default CategoryList;
