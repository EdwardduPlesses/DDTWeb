import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Guess from "./components/guess/guess";
import Navbar from "./components/shared/navbar/navbar";
import NotFoundPage from "./components/shared/not-found-page/not-found";
import Home from "./components/home/home";
import { SnackbarProvider } from "./components/shared/snackbar/snackbar-provider";
import { RequireAuth } from "react-auth-kit";
import Leaderboard from "./components/leaderboard/leaderboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/guess",
    element: (
      <RequireAuth loginPath={"/"}>
        <Guess />
      </RequireAuth>
    ),
  },
  {
    path: "/leaderboard",
    element: (
      <RequireAuth loginPath={"/"}>
        <Leaderboard />
      </RequireAuth>
    ),
  },
]);
function App() {
  return (
    <SnackbarProvider>
      <div className="App">
        <Navbar />
        <div className="content">
          <RouterProvider router={router} />
        </div>
      </div>
    </SnackbarProvider>
  );
}

export default App;
