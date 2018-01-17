import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Sports from "./pages/Sports";
import Camps from "./pages/Camps";
import Calendar from "./pages/Calendar";
import Page from "./pages/Page";
import 'babel-polyfill';
// import Settings from "./pages/Settings";

const app = document.getElementById('app');

ReactDOM.render(
  <Router onUpdate={() => window.scrollTo(0,0)} history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="sports(/:sport/:sportid)" name="sport" component={Sports}></Route>
      <Route path="camps(/:camp/:campid)" name="camp" component={Camps}></Route>
      <Route path="calendar" name="calendar" component={Calendar}></Route>
      <Route path="page(/:title/:pageid)" name="page" component={Page}></Route>
    </Route>
  </Router>,
app);