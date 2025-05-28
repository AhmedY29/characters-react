import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./page/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Home />
      <Toaster />
    </>
  );
}

export default App;
