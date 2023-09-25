import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <header>
      <b>Uni</b> Micro
    </header>
    <App />
  </React.StrictMode>
);
