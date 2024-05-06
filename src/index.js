import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // react-redux'den Provider'ı import edin
import store from "./app/store";
import "./index.css";
import App from "./App";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faBriefcase } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch, faBriefcase);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
