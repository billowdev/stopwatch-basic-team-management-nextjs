import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, store } from "@/store/store";
import { HistoryData } from "@/models/history.model";
import * as historyService from "@/services/historyService"

interface HistoryState {
  histories: HistoryData[];
  history: HistoryData
}

const initialState: HistoryState = {
  histories: [],
  history: {}
};

export const getHistories = createAsyncThunk(
  "history/get",
  async () => {
    return await historyService.getHistories();
  }
);



export const fetchHistoryByTeamId = createAsyncThunk(
  "history/fetch/teamId",
  async (TeamId: any) => {
    return await historyService.getHistoryByTeamId(TeamId);
  }
);

export const createTeamHistory = createAsyncThunk(
  "history/create",
  async (data: any) => {
    return await historyService.createHistory(data);
  }
);

export const deleteHistory = createAsyncThunk(
  "history/delete",
  async (id: string) => {
    await historyService.deleteHistory(id);
    store.dispatch(getHistories());
  }
);

const historySlice = createSlice({
  name: "history",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHistories.fulfilled, (state, action) => {
      state.histories = action.payload;
    });
    builder.addCase(createTeamHistory.fulfilled, (state, action) => {
      state.history = action.payload;
    });

    builder.addCase(fetchHistoryByTeamId.fulfilled, (state, action) => {
      state.history = action.payload;
    });
    
  },
});


export const historiesSelector = (store: RootState): HistoryData[] | undefined => store.history.histories
export const historySelector = (store: RootState): HistoryData | undefined => store.history.history

export default historySlice.reducer;
