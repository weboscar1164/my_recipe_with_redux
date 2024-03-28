import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSearchWord } from "../../store/modules/formData";
import { clearCurrentCategory } from "../../store/modules/category";
import { clearRankingList } from "../../store/modules/ranking";
import SearchBar from "../SearchBar";
import CategoryList from "./CategoryList";
import RankingList from "../RankingList";
const Home = () => {
	const dispatch = useDispatch();
	const currentCategory = useSelector(
		(state) => state.category.currentCategory
	);

	useEffect(() => {
		dispatch(clearSearchWord());
		dispatch(clearCurrentCategory());
		dispatch(clearRankingList());
	}, []);

	return (
		<>
			<SearchBar />
			{!currentCategory.rankingNumber ? <CategoryList /> : <RankingList />}
		</>
	);
};

export default Home;
