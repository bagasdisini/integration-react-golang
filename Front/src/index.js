import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContextProvider } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <UserContextProvider>
        <QueryClientProvider client={client}>
          <App />
        </QueryClientProvider>
      </UserContextProvider>
    </Router>
  </React.StrictMode>
);
