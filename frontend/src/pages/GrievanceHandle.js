import { useLoaderData, useNavigate } from "react-router-dom";
import { HOME_PATH } from "../routes";
import Modal from "../components/UI/Modal";
import {
  GRIEVANCE_FEEDBACK_ALL,
  GRIEVANCE_FEEDBACK_MY,
  GRIEVANCE_FEEDBACK_NEW,
} from "../endpoints";
import AllComments from "../components/Grievance/AllComments";
import MyComments from "../components/Grievance/MyComments";
import PostComment from "../components/Grievance/PostComment";

const GrievanceHandlePage = () => {
  const data = useLoaderData();
  const grievanceId = data.grievance._id;
  const navigate = useNavigate();
  const updateStatusHandler = async () => {
    const response = await fetch("/grievance/handle", {
      method: "POST",
      body: JSON.stringify({ grievanceId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      navigate(HOME_PATH);
    }
  };

  const escalateHandler = async () => {
    const selectElement = document.querySelector("#handler");

    const response = await fetch("/grievance/escalate", {
      method: "POST",
      body: JSON.stringify({
        grievanceId,
        handlerEmail: selectElement.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    selectElement.value = "Select";

    if (response.ok) {
      navigate(HOME_PATH);
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
            data-bs-target="#updateStaticBackdrop"
          >
            <span>Update Status</span>
          </button>
        </div>
        <div className="row mt-3 mb-3" style={{ marginLeft: "3px" }}>
          <label className="col-sm-1 col-form-label">To</label>
          <div className="col-sm-3">
            <select
              id="handler"
              name="handler"
              className="form-select"
              aria-label="handler"
            >
              <option defaultValue>Select</option>
              {data.category.escalationChain
                .slice(data.grievance.escalationLevel + 1)
                .map((email, index) => (
                  <option key={index} value={email}>
                    {email}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-sm-3">
            <button
              type="button"
              className="btn btn-light"
              data-bs-toggle="modal"
              data-bs-target="#escalateStaticBackdrop"
              style={{ marginBottom: "5px" }}
            >
              <i className="bi bi-arrow-90deg-up"></i>
              <span>Escalate</span>
            </button>
          </div>
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

        <Modal id="escalateStaticBackdrop" proceedHandler={escalateHandler} />
        <Modal id="updateStaticBackdrop" proceedHandler={updateStatusHandler} />
      </div>
    </div>
  );
};

export default GrievanceHandlePage;

export async function loader({ req, params }) {
  const grievanceResponse = await fetch(
    `/grievance/info/${params.grievanceId}`
  );
  const grievanceData = await grievanceResponse.json();
  const categoryResponse = await fetch(`/categories/${grievanceData.category}`);
  const categoryData = await categoryResponse.json();
  return {
    grievance: grievanceData,
    category: categoryData,
  };
}
