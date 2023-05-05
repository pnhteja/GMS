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
  ADMIN_HOME_PATH,
  ADMIN_PATH,
  ALL_GRIEVANCES_PATH,
  ASSIGNED_GRIEVANCES_PATH,
  ESCALATION_CHAIN_PATH,
  GRIEVANCE_FEEDBACK_PATH,
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
import { loader as allGrievancesLoader } from "./pages/AllGrievances";
import { loader as grievanceFeedbackLoader } from "./pages/GrievanceFeedback";
import { loader as myGrievancesLoader } from "./pages/MyGrievances";
import { loader as assignedGrievancesLoader } from "./pages/AssignedGrievances";
import GrievanceHandlePage from "./pages/GrievanceHandle";
import GrievanceFeedbackPage from "./pages/GrievanceFeedback";
import AdminRootLayout from "./pages/AdminRoot";
import AdminsHomePage from "./pages/AdminHome";
import AllEscalationChainsPage from "./pages/AllEscalationChains";
import { loader as allEscalationChainsLoader } from "./pages/AllEscalationChains";
import EscalationChainInfoPage from "./pages/EscalationChainInfo";
import { loader as escalationChainInfoLoader } from "./pages/EscalationChainInfo";

const router = createBrowserRouter([
  { path: LOGIN_PATH, element: <LoginPage />, errorElement: <ErrorPage /> },
  {
    path: ROOT_PATH,
    element: <RootLayout />,
    children: [
      { path: HOME_PATH, element: <HomePage /> },
      {
        path: ALL_GRIEVANCES_PATH,
        element: <AllGrievancesPage />,
        loader: allGrievancesLoader,
      },
      {
        path: `${MY_GRIEVANCES_PATH}/:userId`,
        element: <MyGrievancesPage />,
        loader: myGrievancesLoader,
      },
      {
        path: `${ASSIGNED_GRIEVANCES_PATH}/:userId`,
        element: <AssignedGrievancesPage />,
        loader: assignedGrievancesLoader,
      },
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
      {
        path: `${GRIEVANCE_FEEDBACK_PATH}/:grievanceId`,
        element: <GrievanceFeedbackPage />,
        loader: grievanceFeedbackLoader,
      },
    ],
  },
  {
    path: ADMIN_PATH,
    element: <AdminRootLayout />,
    children: [
      {
        path: ADMIN_HOME_PATH,
        element: <AdminsHomePage />,
      },
      {
        path: ESCALATION_CHAIN_PATH,
        element: <AllEscalationChainsPage />,
        loader: allEscalationChainsLoader,
      },
      {
        path: "/admin/escalationChain/:categoryName",
        element: <EscalationChainInfoPage />,
        loader: escalationChainInfoLoader,
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <ErrorPage />,
  // },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
