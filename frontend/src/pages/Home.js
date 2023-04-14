import { Link } from "react-router-dom";
import { Fragment } from "react";

import welcome from "../assets/gif/welcome.gif";

const HomePage = () => {
  return (
    <Fragment>
      <div>
        <h1>Home Page</h1>
        <div>
          <img src={welcome} alt="welcome" />
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
