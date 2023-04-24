import Votes from "./Votes";
import { useSelector } from "react-redux";
import AllComments from "./AllComments";
import MyComments from "./MyComments";
import cardClasses from "../../assets/css/Card.module.css";
import PostComment from "./PostComment";

const Grievance = (props) => {
  const userId = useSelector((state) => state.auth.userId);

  return (
    <div class={`${cardClasses.card}`}>
      <div class="card-body">
        <h5 class="card-title">{props.grievance.title}</h5>
        <hr />

        <p class="card-text">{props.grievance.body}</p>
        {/* <h6 class="card-subtitle mb-2 text-muted">
          Category : {props.grievance.category}
        </h6>
        <h6 class="card-subtitle mb-2 text-muted">
          Posted by : {props.grievance.user.name}, {props.grievance.user.email}
        </h6>
        <h6 class="card-subtitle mb-2 text-muted">
          Assigned to : {props.grievance.assignedTo.name},{" "}
          {props.grievance.assignedTo.email}
        </h6>
        <h6 class="card-subtitle mb-2 text-muted">
          <span>Status : </span>
          <span
            className={`badge bg-${
              props.grievance.status === "pending" ? "warning" : "success"
            }`}
          >
            {props.grievance.status}
          </span>
        </h6> */}
        <h6 class="card-subtitle mb-2">
          Category : {props.grievance.category}
        </h6>
        <h6 class="card-subtitle mb-2">
          Posted by : {props.grievance.user.name}, {props.grievance.user.email}
        </h6>
        <h6 class="card-subtitle mb-2">
          Assigned to : {props.grievance.assignedTo.name},{" "}
          {props.grievance.assignedTo.email}
        </h6>
        <h6 class="card-subtitle mb-2">
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
        {/* <MyComment grievanceId={props.grievance._id} /> */}

        <PostComment grievanceId={props.grievance._id} />
        {/* <MyComments grievanceId={props.grievance._id} /> */}
        <AllComments grievanceId={props.grievance._id} />
        {/* <div class="container">
          <div class="row">
            <div class="col-sm-9">
              <AllComments grievanceId={props.grievance._id} />
              <MyComment grievanceId={props.grievance._id} />
            </div>

            <div class="col-sm-3">
              <Votes
                grievanceId={props.grievance._id}
                userId={userId}
                upvotesCount={props.grievance.upvotesCount}
                downvotesCount={props.grievance.downvotesCount}
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Grievance;
