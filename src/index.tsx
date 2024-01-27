import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./services/store";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");

if (container !== null) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

reportWebVitals();
