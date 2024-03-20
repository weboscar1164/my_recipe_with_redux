import React from "react";
import { Link } from "react-router-dom";

const NavSp = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link to={"/"}>ホーム</Link>
				</li>
				<li>
					<Link to={"/login"}>ログイン</Link>
				</li>
				<li>
					<Link to={"/likes"}>お気に入り</Link>
				</li>
				<li>
					<Link to={"/logout"}>ログアウト</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavSp;
