import { createBrowserRouter, Navigate, Outlet } from "react-router";
import AuthPage from "../pages/auth/AuthPage";
import Login from "../pages/auth/components/Login";
import Signup from "../pages/auth/components/Signup";
import ForgotPassword from "../pages/auth/components/ForgotPassword";
import NotesLayout from "../pages/notes/layout";
import { authLoader } from "./loaders/authLoader";
import AuthProvider from "../context/AuthProvider";
import NotFound from "../pages/notFound/NotFound";
import ArchivedPage from "../pages/notes/archived/page";
import SettingsPage from "../pages/notes/settings/page";
import AllNotesPage from "../pages/notes/home/page";
import Loader from "../ui/Loader";
import SearchPage from "../pages/notes/search/page";
import ChangePasswordPage from "../pages/notes/settings/change-password";
import FontThemePage from "../pages/notes/settings/font-theme";
import ColorThemePage from "../pages/notes/settings/color-theme";
import { Provider } from "react-redux";
import store from "../api/store/store";
export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <Outlet /> {/* children get context + useNavigate works */}
      </AuthProvider>
    ),
    hydrateFallbackElement: <Loader />, // shows while checking auth status
    /* /notes/* */
    children: [
      {
        id: "authProtected",
        path: "/",
        loader: authLoader,
        element: (
          <Provider store={store}>
            <NotesLayout />
          </Provider>
        ),
        children: [
          { index: true, element: <Navigate to="/home" replace /> },
          {
            path: "/home",
            element: <AllNotesPage />,
            handle: { header: "All Notes" },
          },
          {
            path: "/archived",
            element: <ArchivedPage />,
            handle: { header: "Archived Notes" },
          },
          {
            path: "/search",
            element: <SearchPage />,
            handle: { header: "Search" },
          },
          {
            path: "/settings",
            element: <SettingsPage />,
            handle: { header: "Settings" },
            children: [
              {
                path: "change-password",
                element: <ChangePasswordPage />,
                handle: { header: "Change Password" },
              },
              {
                path: "font-theme",
                element: <FontThemePage />,
                handle: { header: "Font Theme" },
              },
              {
                path: "color-theme",
                element: <ColorThemePage />,
                handle: { header: "Color Theme" },
              },
            ],
          },
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
