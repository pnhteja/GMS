import { createSlice } from "@reduxjs/toolkit";
import { setGrievances } from "../reducers/allGrievances-reducers";

const allGrievancesSlice = createSlice({
  name: "allGrievances",
  initialState: { grievances: [] },
  reducers: {
    setGrievances,
  },
});

export const allGrievancesActions = allGrievancesSlice.actions;

export default allGrievancesSlice;
