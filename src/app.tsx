import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginPage } from "./login";
import { ListPage } from "./list";
import { DetailPage } from "./detail";

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/">
          <LoginPage />
        </Route>
        <Route exact={true} path="/list">
          <ListPage />
        </Route>
        <Route exact={true} path="/detail/:id">
          <DetailPage />
        </Route>
      </Switch>
    </Router>
  );
};
