import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice";
import allGrievancesSlice from "./slices/allGrievances-slice";
import myGrievancesSlice from "./slices/myGrievances-slice";
import assignedGrievancesSlice from "./slices/assignedGrievances-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    all: allGrievancesSlice.reducer,
    my: myGrievancesSlice.reducer,
    assigned: assignedGrievancesSlice.reducer,
  },
});

export default store;
