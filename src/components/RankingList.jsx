import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRanking } from "../store/modules/ranking";
import { clearSearchWord } from "../store/modules/formData";
import { isEmpty } from "../utils/helpers";

const RankingList = () => {
	const rankingList = useSelector((state) => state.ranking.rankingList);
	const currentCategory = useSelector(
		(state) => state.category.currentCategory
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (currentCategory.rankingNumber) {
			dispatch(fetchRanking(currentCategory.rankingNumber));
		}
	}, [currentCategory.rankingNumber]);

	useEffect(() => {
		console.log(rankingList);
	}, [rankingList]);

	return (
		<div>
			{isEmpty(rankingList) ? (
				<h2>loading...</h2>
			) : (
				<div>
					<h2>{currentCategory.categoryName}のランキング一覧</h2>
					<ul>
						{rankingList.map((item) => (
							<li key={item.recipeId}>
								<a
									href={item.recipeUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img src={item.mediumImageUrl} alt="" />
									<h3>{item.recipeTitle}</h3>
								</a>
							</li>
						))}
					</ul>
					<a
						href={currentCategory.categoryUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						ランキングをもっと見る
					</a>
				</div>
			)}
		</div>
	);
};

export default RankingList;
