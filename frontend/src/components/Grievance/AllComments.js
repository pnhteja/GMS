import { useState } from "react";
import { useSelector } from "react-redux";
import CommentsModal from "./CommentsModal";

const AllComments = (props) => {
  const { endpoint, grievanceId } = props;
  const [comments, setComments] = useState([]);

  const showAllCommentsHandler = async () => {
    const response = await fetch(`${endpoint}` + `/${grievanceId}`);
    const data = await response.json();
    setComments(data);
  };

  return (
    <CommentsModal
      comments={comments}
      id={"allComments"}
      modalHeader={"All Comments"}
      buttonHandler={showAllCommentsHandler}
      buttonText={"Show all comments"}
    />
  );
};

export default AllComments;
