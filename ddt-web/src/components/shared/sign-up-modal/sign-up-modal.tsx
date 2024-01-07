import Modal from "react-modal";
import "./sign-up-modal.css";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useSnackbar } from "../snackbar/snackbar-context";
import { SnackbarType } from "../snackbar/models/snackbar-interface";
import LoginService from "../../../services/login-service";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "",
    border: "none",
    borderRadius: "10px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
};

const SignUpModal = ({
  modalIsOpen,
  closeModal,
}: {
  modalIsOpen: boolean;
  closeModal: () => void;
}) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const validateEmail = (email: string) => emailRegex.test(email);
  const validatePassword = (password: string) => password.length >= 6;
  const { openSnackbar } = useSnackbar();

  const handleCloseModal = () => {
    setEmail("");
    setPassword("");
    closeModal();
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const name = event.target.name;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  function handleSignUp(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();

    if (!validateEmail(email)) {
      openSnackbar("Please enter a valid email address", SnackbarType.ERROR);
      return;
    }

    if (!validatePassword(password)) {
      openSnackbar(
        "Password must be at least 6 characters long",
        SnackbarType.ERROR
      );
      return;
    }

    LoginService.register(email, password)
      .then((response) => {
        if (response.status === 200) {
          openSnackbar("Registration successful", SnackbarType.SUCCESS);
          handleCloseModal();
        }
      })
      .catch((error) => {
        openSnackbar(error.message, SnackbarType.ERROR);
      });
  }
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div>
        <IconButton
          aria-label="close"
          color="inherit"
          onClick={handleCloseModal}
          sx={{
            "&:hover": { backgroundColor: "transparent" },
            top: 25,
            right: 30,
            position: "absolute",
          }}
        >
          <CloseIcon />
        </IconButton>
        <form className="form">
          <p id="heading">Sign up</p>
          <div className="field">
            <svg
              className="input-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
            </svg>
            <input
              placeholder="Email"
              className="input-field"
              type="text"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className="field">
            <svg
              className="input-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
            </svg>
            <input
              placeholder="Password"
              className="input-field"
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <button className="button1" onClick={handleSignUp}>
            Register
          </button>
          <button className="button3" onClick={handleCloseModal}>
            Sign In
          </button>
          <p className="signup">
            Please don't use your real password. Do you really trust me that
            much?
          </p>
        </form>
      </div>
    </Modal>
  );
};

export default SignUpModal;
