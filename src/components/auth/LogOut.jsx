import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/modules/user";

const LogOut = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!auth.currentUser) {
			// 未ログイン時にホーム画面にリダイレクト
			navigate("/");
		}
	}, []);

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			await auth.signOut();
			localStorage.setItem("isAuth", false);
			dispatch(logOut());
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h2>ログアウト</h2>
			<form onSubmit={onSubmit}>
				<p>ログアウトしますか？</p>
				<button type="submit">ログアウト</button>
			</form>
		</div>
	);
};

export default LogOut;
