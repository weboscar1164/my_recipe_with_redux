import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSearchWord } from "../store/modules/formData";
import { setCurrentCategory } from "../store/modules/category";
import { clearRankingList } from "../store/modules/ranking";

const SearchBar = () => {
	const dispatch = useDispatch();
	const handleInputChange = (e) => {
		dispatch(addSearchWord(e.target.value));
		dispatch(setCurrentCategory({}));
		dispatch(clearRankingList());
	};
	const searchWord = useSelector((state) => state.formData.searchWord);

	return (
		<>
			<input type="text" onChange={handleInputChange} value={searchWord} />
		</>
	);
};

export default SearchBar;
