import { myGrievancesActions } from "../slices/myGrievances-slice";

export const fetchMyGrievances = (userId) => {
  return async (dispatch) => {
    const response = await fetch(`/grievances/my/${userId}`);
    const data = await response.json();
    dispatch(myGrievancesActions.setGrievances(data));
  };
};
