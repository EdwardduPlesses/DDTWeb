import { useState } from "react";
import logo from "../../../assets/dylan.svg";
import LoginModal from "../login-modal/login-modal";
import "./navbar.css";

function Navbar() {
  const [modalIsOpen, setIsOpen] = useState(false);

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
          <a href="/guess" className="navbar-item">
            Guess
          </a>
        </div>
      </div>
      <div className="navbar-auth">
        <button className="btn" onClick={openModal}>
          Sign in
        </button>
        <button className="btn btn-accent">Create Account</button>
        <LoginModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
      </div>
    </nav>
  );
}

export default Navbar;
