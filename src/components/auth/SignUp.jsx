import React, { useState } from "react";
import { auth } from "../../firebase.config";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../store/modules/user";

const SignUp = () => {
	const [signupForm, setSignupForm] = useState({ email: "", password: "" });
	const [isSignupError, setIsSignupError] = useState(false);
	const { email, password } = signupForm;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onChange = (e) => {
		setSignupForm({
			...signupForm,
			[e.target.id]: e.target.value,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				setIsSignupError(false);
				dispatch(logIn(user.uid));
				navigate("/");
			})
			.catch((error) => {
				if (error.code == "auth/email-already-in-use") {
					setIsSignupError(true);
				} else {
					// setErrorState(error.code);
					// navigate("/error");
					console.log(error);
				}
			});
	};
	return (
		<div>
			<h2>新規登録</h2>
			{isSignupError && <p>このメールアドレスはすでに使用されています</p>}
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

				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default SignUp;
