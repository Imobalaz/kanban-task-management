import App from "./App";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Authentication from "./pages/Authentication";

const Pages = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/sign-up" exact>
          <Authentication type="signUp" />
        </Route>
        <Route path="/login">
          <Authentication type="login" exact />
        </Route>
        <Route path="/profile">
          <App />
        </Route>
      </Switch>
      {/* <App />; */}
    </React.Fragment>
  );
};

export default Pages;
