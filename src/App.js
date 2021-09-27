import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import routes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            component={route.component}
          />
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
