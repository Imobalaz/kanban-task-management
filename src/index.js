import React from "react";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./context/context-api";
import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Card from "./components/ui/Card";
import "./index.css";
import Pages from "./Pages";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <BrowserRouter>
      <Switch>
        <Route path="">
          <Pages />
        </Route>
      </Switch>
    </BrowserRouter>
    <Card />
  </AppProvider>
);
