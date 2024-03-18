import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Home from "./components/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategorys } from "./store/modules/recipe";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCategorys());
	}, [dispatch]);
	return (
		<>
			<Header />
			<SearchBar />
			<Home />
		</>
	);
}

export default App;
