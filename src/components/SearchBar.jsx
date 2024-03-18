import React from "react";
import { useDispatch } from "react-redux";
import { addSerchWord } from "../store/modules/serchWord";

const SearchBar = () => {
	const dispatch = useDispatch();
	const handleInputChange = (e) => {
		dispatch(addSerchWord(e.target.value));
	};

	return (
		<>
			<input type="text" onChange={handleInputChange} />
		</>
	);
};

export default SearchBar;
