import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../SearchBar";
import CategoryList from "./CategoryList";
import RankingList from "../RankingList";
const Home = () => {
	const currentCategory = useSelector(
		(state) => state.category.currentCategory
	);

	return (
		<>
			<SearchBar />
			{!currentCategory.rankingNumber ? <CategoryList /> : <RankingList />}
		</>
	);
};

export default Home;
