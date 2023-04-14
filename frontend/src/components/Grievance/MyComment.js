import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const MyComment = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  const [comment, setComment] = useState(null);
  const { grievanceId } = props;

  useEffect(() => {
    const fetchComment = async () => {
      const response = await fetch("/grievance/comments/my", {
        method: "POST",
        body: JSON.stringify({
          userId,
          grievanceId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setComment(data);
    };

    fetchComment().catch((error) => {});
  }, [userId, grievanceId]);

  const addCommentHandler = async (event) => {
    event.preventDefault();
    const commentText = event.target.comment.value;
    const response = await fetch("/grievance/comments/new", {
      method: "POST",
      body: JSON.stringify({
        userId,
        grievanceId,
        text: commentText,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const data = await response.json();
    setComment(commentText);
  };

  const deleteCommentHandler = async () => {
    const response = await fetch("/grievance/comments/my", {
      method: "DELETE",
      body: JSON.stringify({
        userId,
        grievanceId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const data = await response.json();
    setComment(null);
  };

  let commentContent = (
    <div>
      <form onSubmit={addCommentHandler}>
        <label htmlFor="comment"></label>
        <input type="text" id="comment" name="comment"></input>
        <button className="btn btn-light">
          <i class="bi bi-chat"></i>
        </button>
      </form>
    </div>
  );

  if (comment != null) {
    commentContent = (
      <div>
        <span>You : {comment.text}</span>
        <span>
          <button
            class="btn btn-light"
            onClick={deleteCommentHandler}
            style={{ marginLeft: "5px" }}
          >
            <i class="bi bi-trash3"></i>
          </button>
        </span>
      </div>
    );
  }

  return <div>{commentContent}</div>;
};

export default MyComment;
