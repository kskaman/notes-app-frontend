import { createBrowserRouter, Navigate } from "react-router";
import RootRedirect from "./RootRedirect";
import AuthPage from "./pages/auth/AuthPage";
import Login from "./pages/auth/components/Login";
import Signup from "./pages/auth/components/Signup";
import ForgotPassword from "./pages/auth/components/ForgotPassword";
import Dashboard from "./pages/notes/Dashboard";
import AppLayout from "./pages/notes/AppLayout";

export const router = createBrowserRouter([
  /* /auth/login */
  {
    path: "/",
    element: <RootRedirect />,
  },

  /* /auth/* */
  {
    path: "auth",
    element: <AuthPage />,
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forget-password", element: <ForgotPassword /> },
    ],
  },

  /* /notes/* */
  {
    path: "notes",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/notes/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },

  /* catch all */
  { path: "*", element: <Navigate to="/" replace /> },
]);
