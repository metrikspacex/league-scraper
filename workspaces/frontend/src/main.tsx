import React from "react";
import { createRoot } from "react-dom/client";

const root = window.document.querySelector<HTMLDivElement>("#root");
if (!(root instanceof HTMLDivElement))
  throw new Error("Root element not found");
else {
  createRoot(root as HTMLDivElement).render(
    <React.StrictMode></React.StrictMode>
  );
}
