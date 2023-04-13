import { createSlice } from "@reduxjs/toolkit";
import { setGrievances } from "../reducers/myGrievances-reducers";

const myGrievancesSlice = createSlice({
  name: "myGrievances",
  initialState: { grievances: [] },
  reducers: {
    setGrievances,
  },
});

export const myGrievancesActions = myGrievancesSlice.actions;

export default myGrievancesSlice;
