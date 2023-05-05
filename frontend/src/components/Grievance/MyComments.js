import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CommentsModal from "./CommentsModal";

const MyComment = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  const { endpoint, grievanceId } = props;
  const [comments, setComments] = useState([]);

  const showMyCommentsHandler = async () => {
    const response = await fetch(endpoint, {
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
    setComments(data);
  };

  return (
    <CommentsModal
      comments={comments}
      id={"myComments"}
      modalHeader={"Your Comments"}
      buttonHandler={showMyCommentsHandler}
      buttonText={"Your comments"}
    />
  );
};

export default MyComment;
