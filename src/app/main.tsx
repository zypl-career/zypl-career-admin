import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ReactRouterProvider } from "@providers";
import { Toaster } from "@ui";
import { ReactQueryProvider } from "./providers";

import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback="Loading...">
      <ReactQueryProvider>
        <Suspense fallback={null}>
          <Toaster />
          <ReactRouterProvider />
        </Suspense>
      </ReactQueryProvider>
    </Suspense>
  </React.StrictMode>,
);
