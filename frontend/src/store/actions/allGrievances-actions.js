import { allGrievancesActions } from "../slices/allGrievances-slice";

export const fetchAllGrievances = () => {
  return async (dispatch) => {
    const response = await fetch("/grievances/all");
    const data = await response.json();
    // console.log(data);
    dispatch(allGrievancesActions.setGrievances(data));
  };
};
