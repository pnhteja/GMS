import { fetchAllGrievances } from "./allGrievances-actions";
import { fetchMyGrievances } from "./myGrievances-actions";
import { authActions } from "../slices/auth-slice";
import { fetchAssignedGrievances } from "./assignedGrievances-actions";

export const validateAuthInfo = (authData) => {
  return async (dispatch) => {
    try {
      const response = await fetch("/auth", {
        method: "POST",
        body: JSON.stringify(authData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Authentication Failed");
      }

      const data = await response.json();

      dispatch(
        authActions.setAuthInfo({
          isAuthenticated: true,
          userId: data._id,
          name: data.name,
          email: data.email,
        })
      );

      // dispatch(fetchAllGrievances());
      // dispatch(fetchMyGrievances(data._id));
      // dispatch(fetchAssignedGrievances(data._id));
    } catch (error) {
      console.log(error);
    }
  };
};
