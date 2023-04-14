import { Fragment } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ASSIGNED_GRIEVANCES_PATH } from "../routes";

const GrievanceHandlePage = () => {
  const grievanceId = useLoaderData();
  const navigate = useNavigate();
  const updateStatusHandler = async () => {
    const response = await fetch("/grievance/handle", {
      method: "POST",
      body: JSON.stringify({ grievanceId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate(ASSIGNED_GRIEVANCES_PATH);
  };
  return (
    <div className="card">
      <div className="card-body">
        {/* <h5 className="card-title">{props.grievance.title}</h5>
        <hr />
        <p className="card-text">{props.grievance.body}</p>
        <h6 className="card-subtitle mb-2 text-muted">
          Posted by : {props.grievance.user.name}, {props.grievance.user.email}
        </h6> */}
        <h6 className="card-subtitle mb-2 text-muted">Deadline :</h6>
        <hr />
        <button
          onClick={updateStatusHandler}
          type="button"
          className="btn btn-light"
        >
          <span>Update Status</span>
        </button>
        <button type="button" className="btn btn-light">
          <i class="bi bi-arrow-90deg-up"></i>
          <span>Escalate</span>
        </button>
      </div>
    </div>
  );
};

export default GrievanceHandlePage;

export function loader({ req, params }) {
  return params.grievanceId;
}
