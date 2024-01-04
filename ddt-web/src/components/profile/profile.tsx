import { Button } from "@mui/material";
import "./profile.css";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

function Profile() {
  const signOut = useSignOut();
  const nav = useNavigate();

  const signout = () => {
    signOut();
    nav("/");
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <div className="card">
        <Button variant="contained" onClick={signout}>
          Sign out
        </Button>
      </div>
    </div>
  );
}

export default Profile;
