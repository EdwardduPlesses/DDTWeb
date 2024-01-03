import React from "react";
// import axios from "axios";
import Quote from "./models/qoutes-interface";
import "./guess.css";

interface GuessProps {}

interface GuessState {
  quote?: Quote[];
  guess: string;
}

class Guess extends React.Component<GuessProps, GuessState> {
  constructor(props: GuessProps) {
    super(props);
    this.state = {
      guess: "",
      quote: [
        {
          quote: "My quote credits are gone.. How the F#@k!",
          author: "Edward",
        },
      ],
    };
  }

  componentDidMount(): void {
    // axios
    //   .get<Quote[]>(import.meta.env.VITE_QUOTE_API, {
    //     headers: {
    //       "X-API-KEY": import.meta.env.VITE_QUOTE_API_KEY,
    //     },
    //   })
    //   .then((res) => {
    //     this.setState({ quote: res.data });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
  render() {
    const { quote } = this.state;

    return (
      <div className="container">
        {quote?.map((quote: Quote) => (
          <div key={quote.author}>
            <div>{quote.quote}</div>
            <div>{quote.author}</div>
          </div>
        ))}
        <div>This will be where user guess</div>
      </div>
    );
  }
}

export default Guess;
