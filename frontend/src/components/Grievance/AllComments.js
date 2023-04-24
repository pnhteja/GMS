import { useState } from "react";
import { useSelector } from "react-redux";

let commentsContent = <p>No Comments</p>;

const AllComments = (props) => {
  const { grievanceId } = props;
  const [comments, setComments] = useState([]);

  const showAllCommentsHandler = async () => {
    const response = await fetch(`/grievance/comments/all/${grievanceId}`);
    const data = await response.json();
    console.log(data);
    setComments(data);
  };

  if (comments.length !== 0) {
    commentsContent = (
      <div>
        {comments.map((comment, index) => {
          return (
            // <p key={index}>
            //   <p className="card-subtitle mb-2 text-muted">
            //     {comment.user.name}
            //   </p>
            //   <p>{comment.text}</p>
            //   <hr />
            // </p>
            <div className="d-flex flex-start mb-3" key={index}>
              <img
                className="rounded-circle shadow-1-strong me-3"
                src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
                alt="avatar"
                width="40"
                height="40"
              />
              <div>
                <h6 className="fw-bold mb-1">{comment.user.name}</h6>
                <div className="d-flex align-items-center mb-3">
                  <p className="mb-0">
                    {new Intl.DateTimeFormat("en-GB", {
                      dateStyle: "full",
                      timeStyle: "short",
                    }).format(new Date(comment.updatedAt))}
                  </p>
                </div>
                <p className="mb-0">{comment.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-light"
        data-bs-toggle="modal"
        data-bs-target="#commentsStaticBackdrop"
        onClick={showAllCommentsHandler}
      >
        Show all comments
      </button>
      <div
        className="modal fade"
        id="commentsStaticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Confirmation
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">{commentsContent}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No, Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={props.proceedHandler}
              >
                Yes, Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllComments;
