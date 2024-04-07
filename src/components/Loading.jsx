import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.section`
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	position: absolute;
	background-color: rgba(255, 255, 255, 0.7);
	&[data-status="active"] {
		display: flex;
	}

	&[data-status="inActive"] {
		display: none;
	}
`;

const Loading = () => {
	const [loadingStatus, setLoadingStatus] = useState(false);
	const rankingLoadingStatus = useSelector((state) => state.ranking.status);
	const categoryLoadingStatus = useSelector((state) => state.category.status);

	useEffect(() => {
		if (
			rankingLoadingStatus === "Loading" ||
			categoryLoadingStatus === "Loading"
		) {
			setLoadingStatus(true);
		} else {
			setLoadingStatus(false);
		}
	}, [rankingLoadingStatus]);
	return (
		// <Wrapper data-status="active">
		<Wrapper data-status={loadingStatus ? "active" : "inActive"}>
			<h2>Loading!</h2>
		</Wrapper>
	);
};

export default Loading;
