import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Event from "./pages/Event";
import Layout from "./pages/Layout";
import Calendar from "./pages/Calendar";
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
      <Route path="events/create" name="create" component={Create}></Route>
      <Route path="event(/:id)" name="event" component={Event}></Route>
      <Route path="events/calendar" name="calendar" component={Calendar}></Route>
    </Route>
  </Router>,
app);