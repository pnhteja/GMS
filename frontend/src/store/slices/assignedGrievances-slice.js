import { createSlice } from "@reduxjs/toolkit";
import { setGrievances } from "../reducers/assignedGrievances-reducers";

const assignedGrievancesSlice = createSlice({
  name: "assignedGrievances",
  initialState: { grievances: [] },
  reducers: {
    setGrievances,
  },
});

export const assignedGrievancesActions = assignedGrievancesSlice.actions;

export default assignedGrievancesSlice;
