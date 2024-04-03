import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSearchWord } from "../../store/modules/formData";
import { clearCurrentCategory } from "../../store/modules/category";
import { clearRankingList } from "../../store/modules/ranking";
import { getCategoryLikeList } from "../../store/modules/like";
import SearchBar from "../SearchBar";
import CategoryList from "./CategoryList";
import RankingList from "../RankingList";
const Home = () => {
	const dispatch = useDispatch();
	const currentCategory = useSelector(
		(state) => state.category.currentCategory
	);
	const currentUser = useSelector((state) => state.user.currentUser);

	useEffect(() => {
		dispatch(clearSearchWord());
		dispatch(clearCurrentCategory());
		dispatch(clearRankingList());
	}, []);

	useEffect(() => {
		if (currentUser) {
			dispatch(getCategoryLikeList(currentUser));
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
