import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Archives from "./pages/Archives";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Settings from "./pages/Settings";
import Sports from "./pages/Sports";
import Camps from "./pages/Camps";

const app = document.getElementById('app');

ReactDOM.render(
  <Router onUpdate={() => window.scrollTo(0,0)} history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="archives(/:article)" name="archives" component={Archives}></Route>
      <Route path="settings" name="settings" component={Settings}></Route>
      <Route path="registration" name="registration" component={Registration}></Route>
      <Route path="sports(/:sport/:sportid)" name="sport" component={Sports}></Route>
      <Route path="camps(/:campid)" name="camp" component={Camps}></Route>
    </Route>
  </Router>,
app);