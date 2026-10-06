/**
 * main.tsx — entry point.
 *
 * React.StrictMode is enabled for development error detection.
 * Production builds strip StrictMode's double-render behaviour.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element #root not found. Check index.html.");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
