interface SnackbarInterface {
  message: string;
  type: SnackbarType;
}

enum SnackbarType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export default SnackbarInterface;
export { SnackbarType };
