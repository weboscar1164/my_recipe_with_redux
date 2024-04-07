import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSearchWord } from "../../store/modules/formData";
import {
	clearCurrentCategory,
	setShowCategoryList,
} from "../../store/modules/category";
import { clearRankingList } from "../../store/modules/ranking";
import { getFirebaseCategoryLikeList } from "../../store/modules/like";
import SearchBar from "../SearchBar";
import LikeCategoryList from "./LikeCategoryList";
import RankingList from "../RankingList";
import { useNavigate } from "react-router-dom";

const Likes = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
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
			dispatch(getFirebaseCategoryLikeList(currentUser));
		}
	}, [currentUser]);

	const onLogin = () => {
		navigate("/login");
	};
	return (
		<>
			{!currentUser ? (
				<>
					<h2>ログインしてください。</h2>
					<button onClick={onLogin}>ログイン</button>
				</>
			) : (
				<>
					<SearchBar />
					{!currentCategory.rankingNumber ? (
						<LikeCategoryList />
					) : (
						<RankingList />
					)}
				</>
			)}
		</>
	);
};

export default Likes;
