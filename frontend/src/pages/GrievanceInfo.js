import { Fragment } from "react";
import { useLoaderData } from "react-router-dom";

import commentsMeme from "../assets/gif/comments.gif";
import Grievance from "../components/Grievance/Grievance";

const GrievanceInfoPage = () => {
  const grievance = useLoaderData();

  return (
    <Fragment>
      <Grievance grievance={grievance} />
    </Fragment>
  );
};

export default GrievanceInfoPage;

export async function loader({ request, params }) {
  const grievanceId = params.grievanceId;
  const response = await fetch(`/grievance/info/${grievanceId}`);
  const data = await response.json();
  return data;
}
