import React from "react";
import { createRoot } from "react-dom/client";
import App from "@/src/app";

const root = window.document.querySelector<HTMLDivElement>("#root");
if (root instanceof HTMLDivElement) {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else throw new Error("Root element not found");
