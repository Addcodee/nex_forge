import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RQProvider from "./providers/RQProvider.tsx";
import ADProvider from "./providers/ADProvider.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RQProvider>
      <ADProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ADProvider>
    </RQProvider>
  </StrictMode>
);
