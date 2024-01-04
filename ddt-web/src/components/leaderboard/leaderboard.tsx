import { useEffect, useState } from "react";
import _LeaderboardInterface from "../../services/models/leaderboard-interface";
import { useSnackbar } from "../shared/snackbar/snackbar-context";
import { LeaderboardService } from "../../services/leaderboard-service";
import { SnackbarType } from "../shared/snackbar/models/snackbar-interface";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<_LeaderboardInterface[]>([]);
  const { openSnackbar } = useSnackbar();
  useEffect(() => {
    LeaderboardService.getLeaderboard()
      .then((res) => {
        setLeaderboard(res);
      })
      .catch(() => {
        openSnackbar(`Error getting leaderboard`, SnackbarType.ERROR);
      });
  }, [openSnackbar]);

  return (
    <div>
      {
        <div className="container">
          {leaderboard?.map((data: _LeaderboardInterface) => (
            <div key={data.user} className="quote-card">
              <div className="quote-text">{data.user}</div>
              <div className="quote-author">~ {data.score}</div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}

export default Leaderboard;
