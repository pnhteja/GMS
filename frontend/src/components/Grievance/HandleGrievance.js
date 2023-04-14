import { Fragment } from "react";
import { useLoaderData } from "react-router-dom";

const HandleGrievance = () => {
  const grievance = useLoaderData();

  const changeStatusHandler = async () => {
    const response = await fetch("/grievance/status", {
      method: "PUT",
      body: JSON.stringify({
        userId: grievance.userId,
        status: "Handled",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.grievance.title}</h5>
        <hr />
        <p className="card-text">{props.grievance.body}</p>
        <h6 className="card-subtitle mb-2 text-muted">
          Posted by : {props.grievance.user.name}, {props.grievance.user.email}
        </h6>
        <h6 className="card-subtitle mb-2 text-muted">Deadline :</h6>
        <h6 className="card-subtitle mb-2 text-muted">
          <span>Status : </span>
          <span
            className={`badge bg-${
              props.grievance.status === "pending" ? "warning" : "success"
            }`}
          >
            {props.grievance.status}
          </span>
        </h6>
        <hr />
      </div>
      <p>Status : ${grievance.status}</p>
      <button onClick={changeStatusHandler}>Change Status</button>
      <button>Escalate</button>
    </div>
  );
};

export default HandleGrievance;

export async function loader({ request, params }) {
  const response = await fetch(`/grievance/${params.grievanceId}`);
  const data = await response.json();
  return data;
}
