import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSearchWord } from "../../store/modules/formData";
import {
	clearCurrentCategory,
	clearShowAndLikeCategoryList,
} from "../../store/modules/category";
import { clearRankingList, fetchRanking } from "../../store/modules/ranking";
import { getFirebaseCategoryLikeList } from "../../store/modules/like";
import SearchBar from "../SearchBar";
import CategoryList from "./CategoryList";
import RankingList from "../RankingList";
const Home = () => {
	const dispatch = useDispatch();
	const currentCategory = useSelector(
		(state) => state.category.currentCategory
	);
	const rankingStatus = useSelector((state) => state.ranking.status);
	const currentUser = useSelector((state) => state.user.currentUser);

	useEffect(() => {
		dispatch(clearSearchWord());
		dispatch(clearShowAndLikeCategoryList());
		dispatch(clearRankingList());
	}, []);

	useEffect(() => {
		if (currentUser) {
			dispatch(getFirebaseCategoryLikeList(currentUser));
		}
	}, [currentUser]);

	return (
		<>
			<SearchBar />
			{!currentCategory.rankingNumber ? <CategoryList /> : <RankingList />}
		</>
	);
};

export default Home;
