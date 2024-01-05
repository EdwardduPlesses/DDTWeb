import { Button, ThemeProvider, createTheme } from "@mui/material";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../shared/utils/auth-context/use-auth";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { _Actual } from "../../services/models/actual-interface";
import { SnackbarType } from "../shared/snackbar/models/snackbar-interface";
import { useSnackbar } from "../shared/snackbar/snackbar-context";
import { TimeEntryService } from "../../services/time-entries-service";
import { _ErrorResponse } from "../../services/models/error-response-interface";

const theme = createTheme({
  palette: {
    primary: {
      main: "#40c9ff",
    },
    secondary: { main: "#40c9ff" },
    background: { paper: "#212121", default: "#212121" },
    text: { primary: "#FFFFF" },
  },
});

function Profile() {
  const nav = useNavigate();
  const authUser = useAuth();
  const [actualTime, setActualTime] = useState<_Actual>({ actualDateTime: "" });
  const { openSnackbar } = useSnackbar();

  const signout = () => {
    authUser.logout();
    nav("/");
    window.location.reload();
  };

  const authAdmin = authUser != null && authUser.user?.DDT_UserRole === "admin";

  function handleTimeSubmission() {
    if (actualTime.actualDateTime === "") {
      openSnackbar(`Please select a time`, SnackbarType.WARNING);
    } else {
      setActualTime({ actualDateTime: dayjs().toISOString() });
      TimeEntryService.postActual(actualTime)
        .then((res) => {
          if (res) {
            openSnackbar(`Actual submitted`, SnackbarType.SUCCESS);
          } else {
            openSnackbar(`Error submitting actual`, SnackbarType.ERROR);
          }
        })
        .catch((error) => {
          const errorResponse = error.data as _ErrorResponse;
          console.log(errorResponse.status);
          if (errorResponse.status === 400) {
            openSnackbar(errorResponse?.errors.Date[0], SnackbarType.ERROR);
          } else {
            openSnackbar(
              `Error submitting actual: ${errorResponse?.errors}`,
              SnackbarType.ERROR
            );
          }
        });
    }
  }

  function handleTimeChange(value: Dayjs | null) {
    if (value) {
      const date = value.toISOString();
      setActualTime({ actualDateTime: date });
    } else {
      console.log("No time selected");
    }
  }

  return (
    <div className="profile-container">
      {
        <div className="card">
          <div className="card-details">
            <div>Username: {authUser.user.userName}</div>
            <div>Role: {authUser.user.DDT_UserRole}</div>
            {authAdmin && (
              <div className="actual-container">
                <ThemeProvider theme={theme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Actual"
                      name="actualTime"
                      onChange={handleTimeChange}
                      defaultValue={dayjs().hour(8).minute(0)}
                      sx={{
                        zIndex: 2,
                        "& .MuiOutlinedInput-root": {
                          borderColor: "white",
                          color: "white",
                          " .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#40c9ff",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#40c9ff",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "white",
                        },
                        "& .MuiSvgIcon-root": {
                          fill: "white",
                        },
                        "&:hover .MuiSvgIcon-root": {
                          fill: "#40c9ff",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </ThemeProvider>
              </div>
            )}
            {authAdmin && (
              <div className="time-actual-button-container">
                <button
                  className="time-actual-button"
                  onClick={handleTimeSubmission}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
          <div className="logout-btn">
            <Button variant="contained" onClick={signout}>
              Sign out
            </Button>
          </div>
        </div>
      }
    </div>
  );
}

export default Profile;
