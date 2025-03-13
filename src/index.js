import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // Ensure your CSS is imported

ReactDOM.render(
  <BrowserRouter basename="/swappy-app"> {/* Change to your repo name */}
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
