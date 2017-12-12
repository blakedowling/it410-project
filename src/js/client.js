import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Sports from "./pages/Sports";
import Camps from "./pages/Camps";
import Calendar from "./pages/Calendar";
import Page from "./pages/Page";

const app = document.getElementById('app');

ReactDOM.render(
  <Router onUpdate={() => window.scrollTo(0,0)} history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="registration" name="registration" component={Registration}></Route>
      <Route path="sports(/:sport/:sportid)" name="sport" component={Sports}></Route>
      <Route path="camps(/:campid)" name="camp" component={Camps}></Route>
      <Route path="calendar" name="calendar" component={Calendar}></Route>
      <Route path="page(/:title/:pageid)" name="page" component={Page}></Route>
    </Route>
  </Router>,
app);