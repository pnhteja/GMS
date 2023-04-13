import { assignedGrievancesActions } from "../slices/assignedGrievances-slice";

export const fetchAssignedGrievances = (userId) => {
  return async (dispatch) => {
    const response = await fetch(`/grievances/assigned/${userId}`);
    const data = await response.json();
    dispatch(assignedGrievancesActions.setGrievances(data));
  };
};
