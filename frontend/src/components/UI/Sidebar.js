import { Link, NavLink } from "react-router-dom";
import {
  ALL_GRIEVANCES_PATH,
  ASSIGNED_GRIEVANCES_PATH,
  HOME_PATH,
  MY_GRIEVANCES_PATH,
  POST_GRIEVANCE_PATH,
} from "../../routes";
import classes from "../../assets/css/Sidebar.module.css";

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

const Sidebar = () => {
  const content = ROUTES.map((route, index) => {
    return (
      <li key={index} className={`${classes["nav-item"]}`}>
        <NavLink
          to={route}
          className={({ isActive }) =>
            isActive
              ? `${classes["nav-link"]}`
              : `${classes["nav-link"]} ${classes["collapsed"]}`
          }
        >
          <i className={ICONS[index]}></i>
          <span>{DESCRIPTIONS[index]}</span>
        </NavLink>
      </li>
    );
  });

  return (
    <aside id="sidebar" className={`${classes.sidebar}`}>
      <ul id="sidebar-nav" className={`${classes["sidebar-nav"]}`}>
        {content}
      </ul>
    </aside>
  );
};

export default Sidebar;
