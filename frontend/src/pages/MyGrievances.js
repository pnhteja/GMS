import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Fragment } from "react";

import problems from "../assets/img/problems.jpg";

import { GRIEVANCE_INFO_PATH, HOME_PATH } from "../routes";

const MyGrievancesPage = () => {
  const grievances = useSelector((state) => state.my.grievances);

  return (
    <Fragment>
      <h1>My Grievances</h1>
      <div>
        <img
          src={problems}
          alt="meme"
          style={{
            height: "300px",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        />
      </div>
      <ul>
        {grievances.map((grievance, index) => (
          <li key={index}>
            <Link to={GRIEVANCE_INFO_PATH} state={grievance}>
              {grievance.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link to={HOME_PATH}>Back to Home</Link>
    </Fragment>
  );
};

export default MyGrievancesPage;
