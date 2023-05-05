import { Fragment } from "react";

const HomePage = () => {
  // const toggleHandler = () => {
  //   const body = document.body;
  //   if (body.classList.contains("dark")) {
  //     body.classList.remove("dark");
  //   } else {
  //     body.classList.add("dark");
  //   }
  // };

  return (
    <Fragment>
      <div>
        {/* <h1>Home Page</h1> */}
        <h3>Grievance Management System, IIT Hyderabad</h3>
        <p>
          This is the Home page of the Grievance Management Center. <br />
          This is a portal intended for IITH users to post grievance(s) so that
          they can be handled and resolved by the authorities.
        </p>
        <h4>Guidelines for all the Users : </h4>
        <h5>All Grievances: </h5>
        <p>
          Go through the All Grievances section to see the pending grievances
          which were posted by all the users of IITH.
        </p>
        <h5>My Grievances :</h5>
        <p>
          Go through the My Grievances section to see pending grievances of a
          respective user.
        </p>
        <h5>Post Grievance :</h5>
        <p>The user can post a new Grievance here.</p>
        <h4>Guidelines for users who are also Handlers:</h4>
        <p>
          Kindly go through the Assigned Grievances section to look at the
          pending grievances which were assigned to you. You can either Handle
          the grievance or escalate it to the higher level handler.
        </p>
        {/* <button onClick={toggleHandler}>Toggle</button> */}
      </div>
    </Fragment>
  );
};

export default HomePage;
