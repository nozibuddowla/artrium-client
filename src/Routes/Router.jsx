import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import NotFoundPage from "../pages/NotFoundPage";
import ArtWorks from "../pages/ArtWorks";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import ArtWorkDetails from "../pages/ArtWorkDetails";
import ForgetPass from "../pages/ForgetPass";
import AddArtwork from "../pages/AddArtwork";
import MyGallery from "../pages/MyGallery";
import MyFavorites from "../pages/MyFavorites";
import TopArtists from "../components/TopArtists";
import ArtistProfile from "../pages/ArtistProfile";
import ErrorPage from "../pages/ErrorPage";
import Loader from "../components/Loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <Loader />,
    hydrateFallbackElement: <p>Loading...</p>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/exploreArtworks",
        element: <ArtWorks />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/myProfile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/artwork/details/:id",
        element: (
          <PrivateRoute>
            <ArtWorkDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/forgot-password/:email",
        element: <ForgetPass />,
      },
      {
        path: "/add-artwork",
        element: (
          <PrivateRoute>
            <AddArtwork />
          </PrivateRoute>
        ),
      },
      {
        path: "/myGallery",
        element: (
          <PrivateRoute>
            <MyGallery />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-favorites",
        element: (
          <PrivateRoute>
            <MyFavorites />
          </PrivateRoute>
        ),
      },
      {
        path: "/artist/:id",
        element: (
          <PrivateRoute>
            <ArtistProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage></NotFoundPage>,
  },
]);

export default router;
