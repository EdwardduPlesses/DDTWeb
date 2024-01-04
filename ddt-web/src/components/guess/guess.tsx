import { useState, useEffect } from "react";
import axios from "axios";
import Quote from "./models/qoutes-interface";
import "./guess.css";
import Snackbar from "../shared/snackbar/snackbar";
import SnackbarInterface, {
  SnackbarType,
} from "../shared/snackbar/models/snackbar-interface";
import { useLoading } from "../shared/utils/throbbing-context/use-throbber";

const Guess = () => {
  const [quote, setQuote] = useState<Quote[]>([]);
  const [requestFailed, setRequestFailed] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({
    message: "Hello",
    type: SnackbarType.INFO,
  });
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
        setSnackbar({ message: error.message, type: SnackbarType.ERROR });
        setRequestFailed(true);
      })
      .finally(() => {
        hideLoading();
      });
  }, [showLoading, hideLoading]);

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
          <div>This will be where user guess </div>
        </div>
      )}
      {requestFailed && <Snackbar {...snackbar} />}
    </div>
  );
};

export default Guess;
