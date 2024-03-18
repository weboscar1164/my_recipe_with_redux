import React from "react";
import { useSelector } from "react-redux";

const CategoryList = () => {
	const allCategory = useSelector((state) => state.category.allCategory);
	const serchWord = useSelector((state) => state.serchWord.serchWord);
	const status = useSelector((state) => state.category.status);

	return (
		<div>
			<div>{serchWord}</div>
			<ul>
				{Object.keys(allCategory).map((categoryType) => {
					return allCategory[categoryType].map((category) => {
						return <li key={category.categoryId}>{category.categoryName}</li>;
					});
				})}
			</ul>
			<h3>{status}</h3>
		</div>
	);
};

export default CategoryList;
