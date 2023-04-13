import "./App.css";
import "./assets/css/General.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import HomePage from "./pages/Home";
import AllGrievancesPage from "./pages/AllGrievances";
import MyGrievancesPage from "./pages/MyGrievances";
import PostGrievancePage from "./pages/PostGrievance";
import LoginPage from "./pages/Login";
import GrievanceInfoPage from "./pages/GrievanceInfo";
import AssignedGrievancesPage from "./pages/AssignedGrievances";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
// import HandleGrievance from "./components/HandleGrievance";

import store from "./store";

import {
  ALL_GRIEVANCES_PATH,
  ASSIGNED_GRIEVANCES_PATH,
  GRIEVANCE_HANDLE_PATH,
  GRIEVANCE_INFO_PATH,
  HOME_PATH,
  LOGIN_PATH,
  MY_GRIEVANCES_PATH,
  POST_GRIEVANCE_PATH,
  ROOT_PATH,
} from "./routes";

// import { loader as handleGrievanceLoader } from "./components/HandleGrievance";
import { loader as grievanceInfoLoader } from "./pages/GrievanceInfo";
import { loader as grievanceHandleLoader } from "./pages/GrievanceHandle";
import GrievanceHandlePage from "./pages/GrievanceHandle";

const router = createBrowserRouter([
  { path: LOGIN_PATH, element: <LoginPage />, errorElement: <ErrorPage /> },
  {
    path: ROOT_PATH,
    element: <RootLayout />,
    children: [
      { path: HOME_PATH, element: <HomePage /> },
      { path: ALL_GRIEVANCES_PATH, element: <AllGrievancesPage /> },
      { path: MY_GRIEVANCES_PATH, element: <MyGrievancesPage /> },
      { path: ASSIGNED_GRIEVANCES_PATH, element: <AssignedGrievancesPage /> },
      { path: POST_GRIEVANCE_PATH, element: <PostGrievancePage /> },
      {
        path: `${GRIEVANCE_INFO_PATH}/:grievanceId`,
        element: <GrievanceInfoPage />,
        loader: grievanceInfoLoader,
      },
      {
        path: `${GRIEVANCE_HANDLE_PATH}/:grievanceId`,
        element: <GrievanceHandlePage />,
        loader: grievanceHandleLoader,
      },
      // {
      //   path: "/gms/handle/:grievanceId",
      //   element: <HandleGrievance />,
      //   loader: handleGrievanceLoader,
      // },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
