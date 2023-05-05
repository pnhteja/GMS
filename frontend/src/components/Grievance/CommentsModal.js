const CommentsModal = (props) => {
  const { comments, id, modalHeader, buttonHandler, buttonText } = props;
  let commentsContent = <p>No Comments</p>;

  if (comments.length !== 0) {
    commentsContent = (
      <div>
        {comments.map((comment, index) => {
          return (
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
    <div style={{ marginLeft: "-13px" }}>
      <button
        type="button"
        className="btn btn-link"
        data-bs-toggle="modal"
        data-bs-target={`#${id}StaticBackdrop`}
        onClick={buttonHandler}
      >
        {buttonText}
      </button>
      <div
        className="modal fade"
        id={`${id}StaticBackdrop`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {modalHeader}
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
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
