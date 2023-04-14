import { useState } from "react";
import { useSelector } from "react-redux";

let areCommentsFetched = false;
let commetsContent = <p>No Comments</p>;

const AllComments = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  const { grievanceId } = props;
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const showCommentsHandler = async () => {
    setShowComments((prevState) => {
      return !prevState;
    });

    if (!areCommentsFetched) {
      areCommentsFetched = true;
      const response = await fetch(`/grievance/comments/all/${grievanceId}`);
      const data = await response.json();
      setComments(data);
    }
  };

  if (comments.length !== 0) {
    commetsContent = (
      <div>
        {comments.map((comment, index) => {
          return (
            <p key={index}>
              <p class="card-subtitle mb-2 text-muted">{comment.user.name}</p>
              <p>{comment.text}</p>
              <hr />
            </p>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        class={`btn btn-${showComments ? "warning" : "light"}`}
        onClick={showCommentsHandler}
        style={{ marginBottom: "10px" }}
      >
        <i class="bi bi-chat"></i>
      </button>
      {/* <button onClick={showCommentsHandler}>Show All Comments</button> */}
      {showComments && <div>{commetsContent}</div>}
    </div>
  );
};

export default AllComments;
