import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/header/Header";
import SearchBar from "./components/SearchBar";
import Home from "./components/home/Home";
import Likes from "./components/likes/Likes";
import LogIn from "./components/auth/Login";
import LogOut from "./components/auth/LogOut";
import SignUp from "./components/auth/SignUp";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategorys } from "./store/modules/category";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCategorys());
	}, [dispatch]);
	return (
		<>
			<Router>
				<Header />
				<SearchBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/likes" element={<Likes />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<LogIn />} />
					<Route path="/logout" element={<LogOut />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
