import React, { useState, useEffect } from "react";
import axios from "axios";
import Quote from "./models/qoutes-interface";
import "./guess.css";
import Snackbar from "../shared/snackbar/snackbar";
import SnackbarInterface, {
  SnackbarType,
} from "../shared/snackbar/models/snackbar-interface";

// interface GuessProps {}

// interface GuessState {
//   quote?: Quote[];
//   guess: string;
// }

// class Guess extends React.Component<GuessProps, GuessState> {

//   constructor(props: GuessProps) {
//     super(props);
//     this.state = {
//       guess: "",
//       quote: [
//         {
//           quote: "My quote credits are gone.. How the F#@k!",
//           author: "Edward",
//         },
//       ],
//     };
//   }

//   const [requestFailed, setRequestFailed] = useState<boolean>(false);

//   componentDidMount(): void {
//     useEffect(() => { axios
//       .get<Quote[]>(import.meta.env.VITE_QUOTE_API)
//       .then((res) => {
//         this.setState({ quote: res.data });
//       })
//       .catch((err) => {
//         console.log(err);
//         Snackbar({ message: "Hello", type: SnackbarType.INFO });
//       });}, []);

//   }
//   render() {
//     const { quote } = this.state;

//     return (
//       <div className="container">
//         {quote?.map((quote: Quote) => (
//           <div key={quote.author} className="quote-card">
//             <div className="quote-text">{quote.quote}</div>
//             <div className="quote-author">~ {quote.author}</div>
//           </div>
//         ))}
//         <div>This will be where user guess</div>
//       </div>
//     );
//   }
// }

const Guess = () => {
  const [quote, setQuote] = useState<Quote[]>([]);
  const [requestFailed, setRequestFailed] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({
    message: "Hello",
    type: SnackbarType.INFO,
  });

  useEffect(() => {
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
      });
  }, []);

  return (
    <div>
      {
        <div className="container">
          {quote?.map((quote: Quote) => (
            <div key={quote.author} className="quote-card">
              <div className="quote-text">{quote.quote}</div>
              <div className="quote-author">~ {quote.author}</div>
            </div>
          ))}
          <div>This will be where user guess</div>
        </div>
      }
      {requestFailed && <Snackbar {...snackbar} />}
    </div>
  );
};

export default Guess;
