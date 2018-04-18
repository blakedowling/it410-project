import React from "react";
import { Link } from "react-router";
import styles from './nav.css';
import axios from 'axios';
// import renderHTML from 'react-render-html';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      campsCollapsed: true,
      moreCollapsed: true,
      data: []
    };
  }
      
  componentDidMount() {
  }

  collapseAll() {
    this.setState({
      collapsed: true,
      campsCollapsed: true,
      moreCollapsed: true
    });
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }
  toggleCampsCollapse() {
    const campsCollapsed = !this.state.campsCollapsed;
    this.setState({campsCollapsed});
  }
  toggleMoreCollapse() {
    const moreCollapsed = !this.state.moreCollapsed;
    this.setState({moreCollapsed});
  }

  render() {
    const { location } = this.props;
    const homeClass = location.pathname === "/" ? styles.active : "";
    const calendarClass = location.pathname.match(/^\/events\/calendar/) ? styles.active : "";
    const createClass = location.pathname.match(/^\/events\/create/) ? styles.active : "";

    return (
      <div>
        <nav className={ styles.topNavbar }>
          <ul>
      			<li className={ styles.headerLeftItems + " " + homeClass }><Link to="/">Home</Link></li>
      			<li className={ styles.headerLeftItems + " " + createClass }><Link to="events/create">Create Event</Link></li>
      			<li className={ styles.headerLeftItems + " " + calendarClass }><Link to="events/calendar">Events</Link></li>
      		</ul>
      		
      		<div className={ styles.logos }>
      		  <a href="/logout">Logout</a>
      		</div>
        </nav>
      </div>
    );
  }
}

$(document).ready(function() {
    // pins navbar to top of screen upon scroll above 20
    $(window).scroll(function () {
      if ($(this).scrollTop() > 20) {
        $('nav').css({"position" : "fixed", "width" : "100%", "top": "0", "left": "0"});
      } else {
        $('nav').css({"position" : "absolute", "width" : "calc(100% - 40px)", "top": "20px", "left": "20px"});
      }
    });
});
