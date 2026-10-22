import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/typography.css";
import App from "./App.tsx";
// Loaded last so the phone layer wins over the page stylesheets.
import "./styles/mobile.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
