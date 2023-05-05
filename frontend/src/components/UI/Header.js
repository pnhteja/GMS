import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/slices/auth-slice";
import { HOME_PATH, LOGIN_PATH } from "../../routes";
import headerClasses from "../../assets/css/Header.module.css";
import logoClasses from "../../assets/css/Logo.module.css";
import iith_logo from "../../assets/img/iith-logo.png";

const Header = () => {
  const userName = useSelector((state) => state.auth.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate(LOGIN_PATH);
  };

  return (
    <header
      id="header"
      className={`${headerClasses.header} fixed-top d-flex align-items-center`}
    >
      <div className="d-flex align-items-center justify-content-between">
        <Link
          to={HOME_PATH}
          className={`${logoClasses.logo} d-flex align-items-center`}
        >
          <img src={iith_logo} alt="" />
          <span className="d-none d-lg-block">GMS</span>
        </Link>
        <i className={`bi bi-list ${headerClasses["toggle-sidebar-btn"]}`}></i>
      </div>

      <nav className={`${headerClasses["header-nav"]} ms-auto`}>
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown pe-3">
            <span
              className={`${headerClasses["nav-link"]} ${headerClasses["nav-profile"]} d-flex align-items-center pe-0`}
            >
              <img
                src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-man-avatar-with-circle-frame-vector-ilustration-png-image_6110328.png"
                alt="Profile"
                className="rounded-circle"
              />
              <span
                className="d-none d-md-block dropdown-toggle ps-2"
                style={{ textDecoration: "none" }}
              >
                {userName}
              </span>
            </span>
          </li>
          <li>
            <button
              className="btn btn-light"
              onClick={logoutHandler}
              // style={{ background: "#b3b3b3", "border-color": "#b3b3b3" }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
