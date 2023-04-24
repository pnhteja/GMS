import { useSelector } from "react-redux";

const PostComment = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  const { grievanceId } = props;
  const postCommentHandler = async (event) => {
    event.preventDefault();
    console.log(userId);
    const commentData = {
      userId,
      grievanceId: grievanceId,
      text: event.target.commentText.value,
    };

    const response = await fetch("/grievance/comments/new", {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // const data = await response.json();
    // console.log(data);
    event.target.commentText.value = "";
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
        <i class="bi bi-chat"></i>
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
            <form onSubmit={postCommentHandler}>
              <div className="modal-body">
                <div class="card">
                  <div
                    class="card-footer py-3 border-0"
                    style={{ "background-color": "#f8f9fa" }}
                  >
                    <div class="d-flex flex-start w-100">
                      <div class="form-outline w-100">
                        <textarea
                          class="form-control"
                          id="textAreaExample"
                          name="commentText"
                          rows="4"
                          style={{ background: "#fff" }}
                        ></textarea>
                        {/* <label class="form-label" for="textAreaExample">
                        Message
                      </label> */}
                      </div>
                    </div>
                    {/* <div class="float-end mt-2 pt-1">
                    <button type="button" class="btn btn-primary btn-sm">
                      Post comment
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm"
                    >
                      Cancel
                    </button>
                  </div> */}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  id="cancel"
                  type="submit"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  id="postComment"
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </span>
  );
};

export default PostComment;
