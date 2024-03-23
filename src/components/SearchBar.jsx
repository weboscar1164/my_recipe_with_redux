import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSearchWord } from "../store/modules/searchWord";
import { setCurrentCategory } from "../store/modules/category";

const SearchBar = () => {
	const dispatch = useDispatch();
	const handleInputChange = (e) => {
		dispatch(addSearchWord(e.target.value));
		dispatch(setCurrentCategory({}));
	};
	const searchWord = useSelector((state) => state.searchWord.searchWord);

	return (
		<>
			<input type="text" onChange={handleInputChange} value={searchWord} />
		</>
	);
};

export default SearchBar;
