import { Fragment } from "react";
import error404Classes from "../assets/css/Error404.module.css";
import { Link } from "react-router-dom";
import { HOME_PATH } from "../routes";

const ErrorPage = () => {
  return (
    <Fragment>
      {/* <Header />
      <Sidebar /> */}
      <main>
        {/* <h1>404 Page not found</h1> */}
        <div className="container">
          <section
            className={`section ${error404Classes["error-404"]} min-vh-100 d-flex flex-column align-items-center justify-content-center`}
          >
            <h1>404</h1>
            <h2>The page you are looking for doesn't exist.</h2>
            <Link to={HOME_PATH} className={`${error404Classes.btn}`}>
              Back to Home
            </Link>
            {/* <a className="btn" href="index.html">Back to home</a> */}
            {/* <img src="assets/img/not-found.svg" className="img-fluid py-5" alt="Page Not Found"> */}
            {/* <div className="credits">Designed by CSE'23</div> */}
          </section>
        </div>
      </main>
    </Fragment>
  );
};

export default ErrorPage;
