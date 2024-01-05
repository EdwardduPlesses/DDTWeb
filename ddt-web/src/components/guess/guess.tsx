import { useState, useEffect } from "react";
import axios from "axios";
import Quote from "./models/qoutes-interface";
import "./guess.css";
import { SnackbarType } from "../shared/snackbar/models/snackbar-interface";
import { useLoading } from "../shared/utils/throbbing-context/use-throbber";
import { useSnackbar } from "../shared/snackbar/snackbar-context";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, createTheme } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { _Guess } from "../../services/models/guess-interface";
import { TimeEntryService } from "../../services/time-entries-service";
import { _ErrorResponse } from "../../services/models/error-response-interface";

const theme = createTheme({
  palette: {
    primary: {
      main: "#40c9ff",
    },
    secondary: { main: "#40c9ff" },
    background: { paper: "#212121", default: "#212121" },
    text: { primary: "#FFFFFF" },
  },
});

const Guess = () => {
  const [quote, setQuote] = useState<Quote[]>([]);
  const [guessTime, setGuessTime] = useState<_Guess>({ guessDateTime: "" });
  const { openSnackbar } = useSnackbar();
  const { isLoading, showLoading, hideLoading } = useLoading();

  useEffect(() => {
    showLoading();
    axios
      .get<Quote[]>(import.meta.env.VITE_QUOTE_API, {
        headers: {
          "X-API-KEY": import.meta.env.VITE_QUOTE_API_KEY,
        },
      })
      .then((res) => {
        setQuote(res.data);
      })
      .catch((error) => {
        openSnackbar(`Error getting quotes: ${error}`, SnackbarType.ERROR);
      })
      .finally(() => {
        hideLoading();
      });
  }, [showLoading, hideLoading, openSnackbar]);

  function handleTimeChange(value: Dayjs | null) {
    if (value) {
      const date = value.toISOString();
      setGuessTime({ guessDateTime: date });
    } else {
      console.log("No time selected");
    }
  }

  function handleTimeSubmission() {
    if (guessTime.guessDateTime === "") {
      openSnackbar(`Please select a time`, SnackbarType.WARNING);
    } else {
      TimeEntryService.postGuess(guessTime)
        .then((res) => {
          if (res) {
            openSnackbar(`Guess submitted`, SnackbarType.SUCCESS);
          } else {
            openSnackbar(`Error submitting guess`, SnackbarType.ERROR);
          }
        })
        .catch((error) => {
          const errorResponse = error.data as _ErrorResponse;
          console.log(errorResponse.status);
          if (errorResponse.status === 400) {
            openSnackbar(errorResponse?.errors.Date[0], SnackbarType.ERROR);
          } else {
            openSnackbar(
              `Error submitting guess: ${errorResponse?.errors}`,
              SnackbarType.ERROR
            );
          }
        });
    }
  }

  return (
    <div>
      {isLoading ? null : (
        <div className="container">
          {quote?.map((quote: Quote) => (
            <div key={quote.author} className="quote-card">
              <div className="quote-text">{quote.quote}</div>
              <div className="quote-author">~ {quote.author}</div>
            </div>
          ))}
          {
            <div className="guess-container">
              <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Guess"
                    onChange={handleTimeChange}
                    name="guessTime"
                    defaultValue={dayjs().hour(8).minute(0)}
                    sx={{
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
          }
          {
            <div className="time-button-container">
              <button className="time-button" onClick={handleTimeSubmission}>
                Submit
              </button>
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default Guess;
