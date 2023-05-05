import { useLoaderData, useNavigate } from "react-router-dom";
import { MY_GRIEVANCES_PATH } from "../routes";
import Modal from "../components/UI/Modal";
import {
  GRIEVANCE_FEEDBACK_ALL,
  GRIEVANCE_FEEDBACK_MY,
  GRIEVANCE_FEEDBACK_NEW,
} from "../endpoints";
import AllComments from "../components/Grievance/AllComments";
import MyComments from "../components/Grievance/MyComments";
import PostComment from "../components/Grievance/PostComment";

const GrievanceFeedbackPage = () => {
  const grievanceId = useLoaderData();
  const navigate = useNavigate();
  const deleteHandler = async () => {
    const response = await fetch("/grievance/delete", {
      method: "DELETE",
      body: JSON.stringify({ grievanceId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      navigate(MY_GRIEVANCES_PATH);
    }
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
        {/* <h6 className="card-subtitle mb-2 text-muted">Deadline :</h6> */}
        <hr />
        <div style={{ marginBottom: "5px" }}>
          <button
            type="button"
            className="btn btn-light"
            data-bs-toggle="modal"
            data-bs-target="#deleteStaticBackdrop"
          >
            <span>Delete</span>
          </button>
        </div>

        <PostComment
          endpoint={GRIEVANCE_FEEDBACK_NEW}
          grievanceId={grievanceId}
        />
        <MyComments
          endpoint={GRIEVANCE_FEEDBACK_MY}
          grievanceId={grievanceId}
        />
        <AllComments
          endpoint={GRIEVANCE_FEEDBACK_ALL}
          grievanceId={grievanceId}
        />
        <Modal id="deleteStaticBackdrop" proceedHandler={deleteHandler} />
      </div>
    </div>
  );
};

export default GrievanceFeedbackPage;

export function loader({ req, params }) {
  return params.grievanceId;
}
