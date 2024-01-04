import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "react-auth-kit";
import { AuthProviderStatus } from "./components/shared/utils/auth-context/auth-context.tsx";
import { BrowserRouter } from "react-router-dom";
import refreshApi from "./services/config/axiosRefreshApi.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider
    authType={"cookie"}
    authName={"_auth"}
    cookieDomain={window.location.hostname}
    cookieSecure={window.location.protocol === "https:"}
    refresh={refreshApi}
  >
    <AuthProviderStatus>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProviderStatus>
  </AuthProvider>
);
