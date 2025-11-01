import AuthRoutes from "@/features/Auth/components/AuthRoutes";
import ProtectedRoutes from "@/features/Auth/components/ProtectedRoutes";
import AppPreview from "@/pages/AppPreview";
import Experiment from "@/pages/Experiment";
import PromptLabPage from "@/pages/PromptLab";
import ExperimentSettings from "@/pages/Settings";
import UserTaskGroup from "@/pages/UserTaskGroup";
import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import ParticipantTask from "./ParticipantTask";
import Playground from "./Playground";
import PreliminaryStudy from "./PreliminaryStudy";
import TaskLandingPage from "./TaskLandingPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/preliminary-study",
    element: <PreliminaryStudy />,
  },
  {
    path: "/task",
    element: <TaskLandingPage />,
  },
  {
    path: "/app",
    element: <AppPreview />,
  },
  {
    path: "/app/:slug",
    element: <AppPreview />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      { path: "/experiment/dashboard", element: <Experiment /> },
      {
        path: "/experiment/dashboard/settings",
        element: <ExperimentSettings />,
      },
      {
        path: "/experiment/:experimentId",
        element: <UserTaskGroup />,
      },
      { path: "/experiment/task/:taskId", element: <ParticipantTask /> }, //<UserTaskPage />
      {
        path: "/app/studio",
        element: <Playground />,
      },
      {
        path: "/app/studio/:slug",
        element: <PromptLabPage />,
      },
    ],
  },
  {
    element: <AuthRoutes />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
