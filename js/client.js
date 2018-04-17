import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Layout from "./pages/Layout";
import Sports from "./pages/Sports";
import Camps from "./pages/Camps";
import Calendar from "./pages/Calendar";
import Page from "./pages/Page";
import 'babel-polyfill';

const app = document.getElementById('app');

function fireTracking() {
	window.scrollTo(0,0);
// 	ReactGA.pageview(window.location.hash.slice(0,-10));
}

ReactDOM.render(
  <Router onUpdate={fireTracking} history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="create" name="create" component={Create}></Route>
      <Route path="sports(/:sport/:sportid)" name="sport" component={Sports}></Route>
      <Route path="camps(/:camp/:campid)" name="camp" component={Camps}></Route>
      <Route path="calendar" name="calendar" component={Calendar}></Route>
      <Route path="page(/:title/:pageid)" name="page" component={Page}></Route>
    </Route>
  </Router>,
app);