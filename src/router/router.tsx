// router.tsx
import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import store from "../api/store/store";
import AuthProvider from "../context/AuthProvider";
import Loader from "../ui/Loader";
import { authLoader } from "./loaders/authLoader";
import CollectionPage from "../pages/notes/collection/page";

// Lazy imports
const NotesLayout = lazy(() => import("../pages/notes/layout"));
const AuthPage = lazy(() => import("../pages/auth/AuthPage"));
const Login = lazy(() => import("../pages/auth/components/Login"));
const Signup = lazy(() => import("../pages/auth/components/Signup"));
const ForgotPassword = lazy(
  () => import("../pages/auth/components/ForgotPassword")
);
const NotFound = lazy(() => import("../pages/notFound/NotFound"));
const ArchivedPage = lazy(() => import("../pages/notes/archived/page"));
const SettingsPage = lazy(() => import("../pages/notes/settings/page"));
const AllNotesPage = lazy(() => import("../pages/notes/home/page"));
const SearchPage = lazy(() => import("../pages/notes/search/page"));
const ChangePasswordPage = lazy(
  () => import("../pages/notes/settings/change-password")
);
const FontThemePage = lazy(() => import("../pages/notes/settings/font-theme"));
const ColorThemePage = lazy(
  () => import("../pages/notes/settings/color-theme")
);

export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </AuthProvider>
    ),
    hydrateFallbackElement: <Loader />,
    children: [
      {
        id: "authProtected",
        path: "/",
        loader: authLoader,
        element: (
          <Provider store={store}>
            <Suspense fallback={<Loader />}>
              <NotesLayout />
            </Suspense>
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
            path: "/collections/:collection",
            element: <CollectionPage />,
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
      {
        path: "auth",
        element: (
          <Suspense fallback={<Loader />}>
            <AuthPage />
          </Suspense>
        ),
        children: [
          { index: true, element: <Navigate to="/auth/login" replace /> },
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
          { path: "forgot-password", element: <ForgotPassword /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
