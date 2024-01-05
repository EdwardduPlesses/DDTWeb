import { ToastContainer, toast } from "react-toastify";
import { SnackbarType } from "./models/snackbar-interface";
import SnackbarInterface from "./models/snackbar-interface";
import "react-toastify/dist/ReactToastify.css";

function Snackbar(props: SnackbarInterface) {
  const position = "bottom-right";
  switch (props.type) {
    case SnackbarType.SUCCESS:
      toast.success(props.message, {
        position: position,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      break;
    case SnackbarType.ERROR:
      toast.error(props.message, {
        position: position,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      break;
    case SnackbarType.INFO:
      toast.info(props.message, {
        position: position,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      break;
    case SnackbarType.WARNING:
      toast.warning(props.message, {
        position: position,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      break;
    default:
      toast(props.message, {
        position: position,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
  }

  return <ToastContainer />;
}

export default Snackbar;
