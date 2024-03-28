import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApiData } from "../../api/api";

const fetchRanking = createAsyncThunk(
	"api/getRankingData",
	async (rankingNumber) => {
		console.log(rankingNumber);
		const VALUE = import.meta.env.VITE_API_KEY;
		const response = await getApiData(
			`https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${VALUE}&categoryId=${rankingNumber}`
		);
		return response.result;
	}
);
const ranking = createSlice({
	name: "ranking",
	initialState: {
		status: "",
		rankingList: {},
	},
	reducers: {
		clearRankingList(state) {
			state.rankingList = {};
		},
	},

	extraReducers: (builder) => {
		builder.addCase(fetchRanking.pending, (state) => {
			state.status = "Loading";
		});
		builder.addCase(fetchRanking.fulfilled, (state, action) => {
			state.status = "Loaded";
			console.log(action.payload);
			state.rankingList = action.payload;
		});
		builder.addCase(fetchRanking.rejected, (state) => {
			state.status = "error";
		});
	},
});

const { clearRankingList } = ranking.actions;

export { fetchRanking, clearRankingList };
export default ranking.reducer;
