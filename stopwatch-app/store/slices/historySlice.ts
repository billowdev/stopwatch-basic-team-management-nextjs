import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, store } from "@/store/store";
import { HistoryData } from "@/models/history.model";
import * as historyService from "@/services/historyService"

interface HistoryState {
  histories: HistoryData[];
}

const initialState: HistoryState = {
  histories: [],
};

export const getHistories = createAsyncThunk(
  "history/get",
  async (keyword?: string) => {
    return await historyService.getHistories(keyword);
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
  },
});


export const historySelector = (store: RootState): HistoryData[] | undefined => store.history.histories

export default historySlice.reducer;
