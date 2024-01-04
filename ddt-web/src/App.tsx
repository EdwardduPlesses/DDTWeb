import { Route, Routes } from "react-router-dom";
import "./App.css";
import Guess from "./components/guess/guess";
import Navbar from "./components/shared/navbar/navbar";
import NotFoundPage from "./components/shared/not-found-page/not-found";
import Home from "./components/home/home";
import { SnackbarProvider } from "./components/shared/snackbar/snackbar-provider";
import { RequireAuth } from "react-auth-kit";
import Leaderboard from "./components/leaderboard/leaderboard";
import Profile from "./components/profile/profile";
import { ThrobbingContextProvider } from "./components/shared/utils/throbbing-context/throbbing-context";
import Throbber from "./components/shared/throbber/throbber";

function App() {
  return (
    <SnackbarProvider>
      <div className="App">
        <Navbar />
        <div className="content">
          <ThrobbingContextProvider>
            <Throbber />
            <Routes>
              <Route
                path="/"
                element={<Home />}
                errorElement={<NotFoundPage />}
              />
              <Route
                path="/guess"
                element={
                  <RequireAuth loginPath={"/"}>
                    <Guess />
                  </RequireAuth>
                }
              />
              <Route
                path="/leaderboard"
                element={
                  <RequireAuth loginPath={"/"}>
                    <Leaderboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/profile"
                element={
                  <RequireAuth loginPath={"/"}>
                    <Profile />
                  </RequireAuth>
                }
              />
            </Routes>
          </ThrobbingContextProvider>
        </div>
      </div>
    </SnackbarProvider>
  );
}

export default App;
