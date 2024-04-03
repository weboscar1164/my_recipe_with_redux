import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase.config";

const NavSp = () => {
	const isAuth = useSelector((state) => state.user.currentUser);
	return (
		<nav>
			<Link to={"/"}>ホーム</Link>

			<Link to={"/likes"}>お気に入り</Link>
			{!isAuth ? (
				<>
					<Link to={"/login"}>ログイン</Link>

					<Link to={"/signup"}>ユーザー登録</Link>
				</>
			) : (
				<Link to={"/logout"}>ログアウト</Link>
			)}
		</nav>
	);
};

export default NavSp;
