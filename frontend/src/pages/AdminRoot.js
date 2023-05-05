import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import classes from "../assets/css/Main.module.css";

import Sidebar from "../components/UI/Sidebar";
import Header from "../components/UI/Header";
import { ADMIN_HOME_PATH, ESCALATION_CHAIN_PATH } from "../routes";

const ROUTES = [ADMIN_HOME_PATH, ESCALATION_CHAIN_PATH];

const DESCRIPTIONS = ["Home", "Escalation Chains"];

const ICONS = ["bi bi-grid", "bi bi-ladder"];

const AdminRootLayout = () => {
  return (
    <Fragment>
      <Header />
      <Sidebar ROUTES={ROUTES} DESCRIPTIONS={DESCRIPTIONS} ICONS={ICONS} />
      <main id={`${classes.main}`} className="main">
        <Outlet />
      </main>
    </Fragment>
  );
};

export default AdminRootLayout;
