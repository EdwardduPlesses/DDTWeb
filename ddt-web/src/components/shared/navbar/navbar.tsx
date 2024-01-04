import { useState } from "react";
import logo from "../../../assets/dylan.svg";
import LoginModal from "../login-modal/login-modal";
import "./navbar.css";
import { useAuth } from "../utils/use-auth";
import { Avatar } from "@mui/material";
import { blue } from "@mui/material/colors";

function Navbar() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const authUser = useAuth();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <nav className="navbar">
      <div>
        <a href="/">
          <img src={logo} alt="logo" className="navbar-logo" />
        </a>
        <div className="navbar-links">
          {authUser != null && authUser.user?.DDT_UserRole === "user" && (
            <a href="/guess" className="navbar-item">
              Guess
            </a>
          )}
          {authUser != null && authUser.user?.DDT_UserRole === "user" && (
            <a href="/leaderboard" className="navbar-item">
              Leaderboard
            </a>
          )}
        </div>
      </div>
      <div className="navbar-auth">
        {authUser != null && authUser.user?.isLoggedIn ? (
          <Avatar sx={{ bgcolor: blue[400] }}>
            {authUser.user.userName.charAt(0).toUpperCase()}
          </Avatar>
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
