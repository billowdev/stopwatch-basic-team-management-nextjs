import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, store } from "@/store/store";
import * as teamService from "@/services/teamService"
import { TeamData } from "@/models/team.model";

interface TeamState {
  teams: TeamData[];
}

const initialState: TeamState = {
  teams: [],
};

export const getTeams = createAsyncThunk(
  "team/get",
  async () => {
    return await teamService.getTeams();
  }
);

export const deleteTeam = createAsyncThunk(
  "team/delete",
  async (id: string) => {
    await teamService.deleteTeam(id);
    store.dispatch(getTeams());
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTeams.fulfilled, (state, action) => {
      state.teams = action.payload;
    });
  },
});


export const teamSelector = (store: RootState): TeamData[] | undefined =>
store.team.teams;

export default teamSlice.reducer;
