import Votes from "./Votes";
import { useSelector } from "react-redux";
import AllComments from "./AllComments";
import MyComments from "./MyComments";
import cardClasses from "../../assets/css/Card.module.css";
import PostComment from "./PostComment";
import {
  GRIEVANCE_COMMENTS_ALL,
  GRIEVANCE_COMMENTS_MY,
  GRIEVANCE_COMMENTS_NEW,
} from "../../endpoints";

const Grievance = (props) => {
  const userId = useSelector((state) => state.auth.userId);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.grievance.title}</h5>
        <hr />

        <p className="card-text">{props.grievance.body}</p>
        <h6 className="card-subtitle mb-2">
          Category : {props.grievance.category}
        </h6>
        <h6 className="card-subtitle mb-2">
          Posted by : {props.grievance.user.name}, {props.grievance.user.email}
        </h6>
        <h6 className="card-subtitle mb-2">
          Assigned to : {props.grievance.assignedTo.name},{" "}
          {props.grievance.assignedTo.email}
        </h6>
        <h6 className="card-subtitle mb-2">
          <span>Status : </span>
          <span
            className={`badge bg-${
              props.grievance.status === "pending" ? "warning" : "success"
            }`}
          >
            {props.grievance.status}
          </span>
        </h6>

        <hr />
        <Votes
          grievanceId={props.grievance._id}
          userId={userId}
          upvotesCount={props.grievance.upvotesCount}
          downvotesCount={props.grievance.downvotesCount}
        />

        <PostComment
          endpoint={GRIEVANCE_COMMENTS_NEW}
          grievanceId={props.grievance._id}
        />
        <MyComments
          endpoint={GRIEVANCE_COMMENTS_MY}
          grievanceId={props.grievance._id}
        />
        <AllComments
          endpoint={GRIEVANCE_COMMENTS_ALL}
          grievanceId={props.grievance._id}
        />
      </div>
    </div>
  );
};

export default Grievance;
