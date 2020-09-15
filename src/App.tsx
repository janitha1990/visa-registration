import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Dashboard from "./containers/Dashboard";
import { Profile } from "./containers/Profile";

const App: React.FC = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/profile/:id" component={Profile} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/" component={Login} />
      </Switch>
    </Layout>
  );
};

export default App;
