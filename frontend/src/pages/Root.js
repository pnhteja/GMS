import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import classes from "../assets/css/Main.module.css";

import Sidebar from "../components/UI/Sidebar";
import Header from "../components/UI/Header";

const RootLayout = () => {
  return (
    <Fragment>
      <Header />
      <Sidebar />
      <main id={`${classes.main}`} className="main">
        <Outlet />
      </main>
    </Fragment>
  );
};

export default RootLayout;
