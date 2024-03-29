import { useState } from "react";
import logo from "../../../assets/dylan.svg";
import LoginModal from "../login-modal/login-modal";
import "./navbar.css";
import { useAuth } from "../utils/auth-context/use-auth";
import { Avatar } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Link } from "react-router-dom";

function Navbar() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const authUser = useAuth();
  const userName = authUser.user.userName.charAt(0).toUpperCase();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const auth =
    authUser != null &&
    (authUser.user?.DDT_UserRole === "user" ||
      authUser.user?.DDT_UserRole === "admin");
  return (
    <nav className="navbar">
      <div>
        <Link to="/">
          <img src={logo} alt="logo" className="navbar-logo" />
        </Link>
        <div className="navbar-links">
          {auth && (
            <Link to="/guess" className="navbar-item">
              Guess
            </Link>
          )}
          {auth && (
            <Link to="/leaderboard" className="navbar-item">
              Leaderboard
            </Link>
          )}
        </div>
      </div>
      <div className="navbar-auth">
        {authUser != null && authUser.user?.isLoggedIn ? (
          <Link to="/profile">
            <Avatar sx={{ bgcolor: blue[400] }} alt="DDT">
              {userName}
            </Avatar>
          </Link>
        ) : (
          <button className="btn btn-accent" onClick={openModal}>
            Sign in / Create Account
          </button>
        )}
        <LoginModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
      </div>
    </nav>
  );
}

export default Navbar;
