import { createBrowserRouter, Navigate, Outlet } from "react-router";
import AuthPage from "../pages/auth/AuthPage";
import Login from "../pages/auth/components/Login";
import Signup from "../pages/auth/components/Signup";
import ForgotPassword from "../pages/auth/components/ForgotPassword";
import Dashboard from "../pages/notes/Dashboard";
import NotesLayout from "../pages/notes/NotesLayout";
import { authLoader } from "./loaders/authLoader";
import AuthProvider from "../context/AuthProvider";
import NotFound from "../pages/notFound/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <Outlet /> {/* children get context + useNavigate works */}
      </AuthProvider>
    ),
    /* /notes/* */
    children: [
      {
        id: "authProtected",
        path: "/",
        loader: authLoader,
        element: (
          <QueryClientProvider client={new QueryClient()}>
            <NotesLayout />
          </QueryClientProvider>
        ),
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: "dashboard", element: <Dashboard /> },
        ],
      },
      /* /auth/* */
      {
        path: "auth",
        element: <AuthPage />,
        children: [
          { index: true, element: <Navigate to="/auth/login" replace /> },
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
          { path: "forgot-password", element: <ForgotPassword /> },
        ],
      },

      /* catch all */
      { path: "*", element: <NotFound /> },
    ],
  },
]);
