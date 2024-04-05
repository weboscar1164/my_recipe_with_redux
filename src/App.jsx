import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Likes from "./components/likes/Likes";
import LogIn from "./components/auth/Login";
import LogOut from "./components/auth/LogOut";
import SignUp from "./components/auth/SignUp";
import ModalComponent from "./components/ModalComponent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategorys } from "./store/modules/category";
import { logIn, logOut } from "./store/modules/user";

function App() {
	const dispatch = useDispatch();
	// const [isLoggedIn, setIsLoggedIn] = useState(false);

	const currentUser = useSelector((state) => state.user.CurrentUser);

	useEffect(() => {
		const isAuth = localStorage.getItem("isAuth");
		if (!isAuth) {
			dispatch(logOut());
			// setIsLoggedIn(false);
		} else {
			dispatch(logIn(isAuth));
			// setIsLoggedIn(true);
		}
	}, [currentUser]);

	useEffect(() => {
		dispatch(fetchCategorys());
	}, [dispatch]);

	return (
		<>
			<Router>
				<Header />
				<ModalComponent />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/likes" element={<Likes />} />
					<Route path="/logout" element={<LogOut />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<LogIn />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
