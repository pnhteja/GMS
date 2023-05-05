import { useSelector } from "react-redux";

const PostComment = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  const { endpoint, grievanceId } = props;
  const postCommentHandler = async () => {
    const textElement = document.querySelector("#commentText");
    const commentData = {
      userId,
      grievanceId: grievanceId,
      text: textElement.value,
    };

    await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    textElement.value = "";
  };

  const cancelHandler = () => {
    const textElement = document.querySelector("#commentText");
    textElement.value = "";
  };

  return (
    <span>
      <button
        type="button"
        className="btn btn-light"
        data-bs-toggle="modal"
        data-bs-target="#postCommentStaticBackdrop"
        style={{ marginRight: "10px", marginBottom: "10px" }}
      >
        {/* <span>Comment</span> */}
        <i className="bi bi-chat"></i>
      </button>
      <div
        className="modal fade"
        id="postCommentStaticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Comment
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="card">
                <div
                  className="card-footer py-3 border-0"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex flex-start w-100">
                    <div className="form-outline w-100">
                      <textarea
                        className="form-control"
                        id="commentText"
                        name="commentText"
                        rows="4"
                        style={{ background: "#fff" }}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                id="cancel"
                type="submit"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={cancelHandler}
              >
                Cancel
              </button>
              <button
                id="postComment"
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={postCommentHandler}
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
};

export default PostComment;
