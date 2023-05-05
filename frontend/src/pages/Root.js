import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import classes from "../assets/css/Main.module.css";

import Sidebar from "../components/UI/Sidebar";
import Header from "../components/UI/Header";
import { useSelector } from "react-redux";

import {
  ALL_GRIEVANCES_PATH,
  ASSIGNED_GRIEVANCES_PATH,
  HOME_PATH,
  MY_GRIEVANCES_PATH,
  POST_GRIEVANCE_PATH,
} from "../routes";

const ROUTES = [
  HOME_PATH,
  ALL_GRIEVANCES_PATH,
  MY_GRIEVANCES_PATH,
  ASSIGNED_GRIEVANCES_PATH,
  POST_GRIEVANCE_PATH,
];

const DESCRIPTIONS = [
  "Home",
  "All Grievances",
  "My Grievances",
  "Assigned Grievances",
  "Post Grievance",
];

const ICONS = [
  "bi bi-grid",
  "bi bi-hdd-stack",
  "bi bi-journal-text",
  "bi bi-postcard",
  "bi bi-pencil-square",
];

const RootLayout = () => {
  const userId = useSelector((state) => state.auth.userId);
  const NAV_ROUTES = ROUTES.map((route, index) => {
    return `${route}${index === 2 || index === 3 ? "/" + userId : ""}`;
  });
  return (
    <Fragment>
      <Header />
      <Sidebar ROUTES={NAV_ROUTES} DESCRIPTIONS={DESCRIPTIONS} ICONS={ICONS} />
      <main id={`${classes.main}`} className="main">
        <Outlet />
      </main>
    </Fragment>
  );
};

export default RootLayout;
