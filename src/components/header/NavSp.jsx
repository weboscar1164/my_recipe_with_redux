import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase.config";
import { removeCategoryLike } from "../../store/modules/like";
import { clearSearchWord } from "../../store/modules/formData";
import {
	clearCurrentCategory,
	clearShowAndLikeCategoryList,
} from "../../store/modules/category";
import { clearRankingList } from "../../store/modules/ranking";

const NavSp = () => {
	const isAuth = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();

	const onClickHomeHandler = () => {
		dispatch(clearSearchWord());
		dispatch(clearShowAndLikeCategoryList());
		dispatch(clearRankingList());
	};

	const onClickLikeHandler = () => {
		dispatch(clearSearchWord());
		dispatch(clearCurrentCategory());
		dispatch(clearRankingList());
	};
	return (
		<nav>
			<Link onClick={onClickHomeHandler} to={"/"}>
				ホーム
			</Link>

			{!isAuth ? (
				<>
					<Link to={"/login"}>ログイン</Link>
					<Link to={"/signup"}>ユーザー登録</Link>
				</>
			) : (
				<>
					<Link onClick={onClickLikeHandler} to={"/likes"}>
						お気に入り
					</Link>
					<Link to={"/logout"}>ログアウト</Link>
				</>
			)}
		</nav>
	);
};

export default NavSp;
