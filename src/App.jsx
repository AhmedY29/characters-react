import "./App.css";
import { Toaster } from "react-hot-toast";
import Router from "./router/Router";

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
