import { useLoading } from "../utils/throbbing-context/use-throbber";
import "./throbber.css";

function Throbber() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="throbber-container">
      <div className="pl">
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__text">Loading…</div>
      </div>
    </div>
  );
}

export default Throbber;
