import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";

const root = window.document.querySelector<HTMLDivElement>("#root");
if (!(root instanceof HTMLDivElement))
  throw new Error("Root element not found");
else {
  createRoot(root as HTMLDivElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
