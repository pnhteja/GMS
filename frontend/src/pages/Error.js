import { Fragment } from "react";
import Sidebar from "../components/UI/Sidebar";

const ErrorPage = () => {
  return (
    <Fragment>
      <Sidebar />
      <main>
        <h1>404 Page not found</h1>
      </main>
    </Fragment>
  );
};

export default ErrorPage;
