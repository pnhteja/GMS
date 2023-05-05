import { Link, NavLink } from "react-router-dom";

import classes from "../../assets/css/Sidebar.module.css";
import { useSelector } from "react-redux";

const Sidebar = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  const content = props.ROUTES.map((route, index) => {
    return (
      <li key={index} className={`${classes["nav-item"]}`}>
        <NavLink
          // to={`${route}${index === 2 || index === 3 ? "/" + userId : ""}`}
          to={route}
          className={({ isActive }) =>
            isActive
              ? `${classes["nav-link"]}`
              : `${classes["nav-link"]} ${classes["collapsed"]}`
          }
        >
          <i className={props.ICONS[index]}></i>
          <span>{props.DESCRIPTIONS[index]}</span>
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
