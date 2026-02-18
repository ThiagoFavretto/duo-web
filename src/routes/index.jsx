import { createBrowserRouter, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Game } from "../pages/Game";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/sala/:codigoSala",
    element: <Game />
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);
