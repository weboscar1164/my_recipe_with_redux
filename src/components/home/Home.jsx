import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CategoryList from "./CategoryList";
import RankingList from "../RankingList";
const Home = () => {
	const currentCategory = useSelector(
		(state) => state.category.currentCategory
	);

	return (
		<>{!currentCategory.rankingNumber ? <CategoryList /> : <RankingList />}</>
	);
};

export default Home;
