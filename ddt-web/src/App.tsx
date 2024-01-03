import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Guess from "./components/guess/guess";
import Navbar from "./components/shared/navbar/navbar";
import NotFoundPage from "./components/shared/not-found-page/not-found";
import Home from "./components/home/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/guess",
    element: <Guess />,
  },
]);
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
