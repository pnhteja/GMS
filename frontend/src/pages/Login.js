import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { Fragment } from "react";

import yet_another_login from "../assets/img/yet-another-login.jpg";
import iith_logo from "../assets/img/iith-logo.png";
import logoClasses from "../assets/css/Logo.module.css";
import cardClasses from "../assets/css/Card.module.css";

import { validateAuthInfo } from "../store/actions/auth-actions";

const initialState = {
  loginStatus: false,
  isFirstTry: true,
};

const authStateReducer = (state, action) => {
  switch (action.type) {
    case "FIRST_TRY_OVER":
      return { isFirstTry: false, loginStatus: action.status };
  }
  return state;
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authState, authStateDispatch] = useReducer(
    authStateReducer,
    initialState
  );

  const authStatus = useSelector((state) => state.auth.isAuthenticated);

  const loginHandler = (event) => {
    event.preventDefault();
    dispatch(validateAuthInfo({ email: event.target.email.value }));
    authStateDispatch({ type: "FIRST_TRY_OVER", status: authStatus });
  };

  useEffect(() => {
    if (authStatus) {
      navigate("/gms/home");
    }
  }, [authStatus, navigate]);

  return (
    // <Fragment>
    //   <h1>Sign in with Google</h1>
    //   <div>
    //     <img src={yet_another_login} alt="login meme" />
    //   </div>
    //   <form onSubmit={loginHandler}>
    //     <div>
    //       <label htmlFor="email">Email</label>
    //       <input type="email" id="email" name="email" required />
    //     </div>
    //     <div>
    //       <button>Login</button>
    //     </div>
    //   </form>
    //   <div>
    //     {!authState.isFirstTry && !authState.loginStatus && (
    //       <p>Authentication failed ! Please enter valid IITH email</p>
    //     )}
    //   </div>
    // </Fragment>
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div>
                  <img src={yet_another_login} alt="login meme" />
                </div>
                <div className="d-flex justify-content-center py-4">
                  <div
                    className={`${logoClasses.logo} d-flex align-items-center w-auto`}
                  >
                    <img src={iith_logo} alt="" />
                    <span className="d-none d-lg-block">GMS</span>
                  </div>
                </div>

                <div className={`${cardClasses.card} mb-3`}>
                  <div className={`${cardClasses["card-body"]} mb-3`}>
                    <form
                      className="row g-3 pt-4 needs-validation"
                      noValidate
                      onSubmit={loginHandler}
                    >
                      <div className="col-12">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit">
                          Sign in with Google
                        </button>
                      </div>
                      <div className="col-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="remember"
                            value="true"
                            id="rememberMe"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="rememberMe"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">
                          Don't have account?
                          <a href=""> Create an account</a>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="credits">Designed by CSE'23</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
