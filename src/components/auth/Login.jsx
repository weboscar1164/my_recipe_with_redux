import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { logIn } from "../../store/modules/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [loginForm, setLoginForm] = useState({ email: "", password: "" });
	const [isLoginError, setIsLoginError] = useState(false);
	const { email, password } = loginForm;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onChange = (e) => {
		setLoginForm({
			...loginForm,
			[e.target.id]: e.target.value,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user.uid);
				setIsLoginError(false);
				dispatch(logIn(user.uid));
				navigate("/");
			})
			.catch((error) => {
				if (error.code == "auth/invalid-credential") {
					setIsLoginError(true);
				} else {
					// setErrorState(error.code);
					// navigate("/error");
					console.log(error);
				}
			});

		// try {
		// 	const userCredential = await signInWithEmailAndPassword(
		// 		auth,
		// 		email,
		// 		password
		// 	);
		// 	if (userCredential.user) {
		// 		localStorage.setItem("isAuth", true);

		// 		// dispatch(Login(userInfo))
		// 		alert("ログインしました");

		// 	}
		// } catch (error) {
		// 	alert("ログインに失敗しました");
		// 	// if (error.code === "auth/email-already-in-use") {
		// 	// 	setIsDuplicateError(true);
		// 	// } else {
		// 	// 	setErrorState(error.code);
		// 	// 	navigate("/error");
		// 	// }
		// 	const errorCode = error.code;
		// 	const errorMessage = error.message;
		// 	// The email of the user's account used.
		// 	console.log(errorCode, errorMessage);
		// }
	};

	return (
		<div className="container auth-container">
			<div className="auth-wrapper">
				<h2>ログイン</h2>
				{isLoginError && <p>メールアドレスかパスワードが間違っています。</p>}
				<form onSubmit={onSubmit}>
					<label htmlFor="email">e-mail</label>
					<input
						type="email"
						placeholder="Email"
						id="email"
						value={email}
						required
						onChange={onChange}
					/>
					<label htmlFor="password">パスワード</label>
					<input
						type="password"
						placeholder="Password"
						id="password"
						value={password}
						required
						onChange={onChange}
					/>
					<button type="submit">ログイン</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
