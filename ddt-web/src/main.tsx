import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "react-auth-kit";
import { AuthProviderStatus } from "./components/shared/utils/auth-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider
    authType={"cookie"}
    authName={"_auth"}
    cookieDomain={window.location.hostname}
    cookieSecure={window.location.protocol === "https:"}
  >
    <AuthProviderStatus>
      <App />
    </AuthProviderStatus>
  </AuthProvider>
);
