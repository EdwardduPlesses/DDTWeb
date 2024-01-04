import { useEffect, useState } from "react";
import _LeaderboardInterface from "../../services/models/leaderboard-interface";
import { useSnackbar } from "../shared/snackbar/snackbar-context";
import { LeaderboardService } from "../../services/leaderboard-service";
import { SnackbarType } from "../shared/snackbar/models/snackbar-interface";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  tableCellClasses,
  styled,
} from "@mui/material";
import "./leaderboard.css";
import { useLoading } from "../shared/utils/throbbing-context/use-throbber";

function Leaderboard() {
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1B1B1B",
      color: "#FFFFFF",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#F3F3F3",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#E1E1E1",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [leaderboard, setLeaderboard] = useState<_LeaderboardInterface[]>([]);
  const { openSnackbar } = useSnackbar();
  const { isLoading, showLoading, hideLoading } = useLoading();

  useEffect(() => {
    showLoading();
    LeaderboardService.getLeaderboard()
      .then((res) => {
        setLeaderboard(res);
      })
      .catch(() => {
        openSnackbar(`Error getting leaderboard`, SnackbarType.ERROR);
      })
      .finally(() => {
        hideLoading();
      });
  }, [openSnackbar, showLoading, hideLoading]);

  return (
    <div className="comp-container">
      {isLoading ? null : (
        <div className="table-container">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="leaderboard table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Number</StyledTableCell>
                  <StyledTableCell>User</StyledTableCell>
                  <StyledTableCell>Score</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {leaderboard.map((row, index) => (
                  <StyledTableRow key={row.user}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell>{row.user}</StyledTableCell>
                    <StyledTableCell>{row.score}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
