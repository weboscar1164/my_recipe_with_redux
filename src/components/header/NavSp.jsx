import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase.config";

const NavSp = () => {
	const user = useSelector((state) => state.user.user);
	console.log(user);
	return (
		<nav>
			<Link to={"/"}>ホーム</Link>

			<Link to={"/likes"}>お気に入り</Link>
			{!user ? (
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
