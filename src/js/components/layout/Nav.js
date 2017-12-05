import React from "react";
import { IndexLink, Link } from "react-router";
import styles from './nav.css';
import axios from 'axios';
import renderHTML from 'react-render-html';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      data: []
    };
  }
      
  componentDidMount() {
    var th = this;
    this.serverRequest = axios.get("https://byucougars.com/dl/feeds/sports-camps")
      .then(function(response) {
        console.log(response.data);
        th.setState({
          data: response.data
      });
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const homeClass = location.pathname === "/" ? styles.active : "";
    const calendarClass = location.pathname.match(/^\/archives/) ? styles.active : "";
    const campClass = location.pathname.match(/^\/sport/) || location.pathname.match(/^\/camp/) ? styles.active : "";
    const registrationClass = location.pathname.match(/^\/registration/) ? styles.active : "";
    const navClass = collapsed ? "collapse" : "";
    
    var desktopSports = [];
    var mobilesports = [];
    this.state.data.forEach(item => {
      var link = 'sports/' + item.name + "/" + item.tid;
      desktopSports.push(
        <Link key={item.tid} to={link}>{item.name}</Link>
      );
      mobilesports.push(
        
      );
    });
    
    return (
      // <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      //   <div class="container">
      //     <div class="navbar-header">
      //       <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
      //         <span class="sr-only">Toggle navigation</span>
      //         <span class="icon-bar"></span>
      //         <span class="icon-bar"></span>
      //         <span class="icon-bar"></span>
      //       </button>
      //     </div>
      //     <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
      //       <ul class="nav navbar-nav">
      //         <li class={featuredClass}>
      //           <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Featured</IndexLink>
      //         </li>
      //         <li class={archivesClass}>
      //           <Link to="archives" onClick={this.toggleCollapse.bind(this)}>Archives</Link>
      //         </li>
      //         <li class={settingsClass}>
      //           <Link to="settings" onClick={this.toggleCollapse.bind(this)}>Settings</Link>
      //         </li>
      //       </ul>
      //     </div>
      //   </div>
      // <li className={ styles.headerLeftItems }><Link to="settings">Settings</Link></li>
      // </nav>
      <div>
        <nav className={ styles.topNavbar }>
          <ul>
      			<li className={ styles.headerLeftItems + " " + homeClass }><Link to="/"><img className={ styles.siteLogo }src="media/images/BYUlogo_stroke400.png" alt="BYU Logo"/></Link></li>
      			<div className={ styles.dropdown }>
          		<li className={ styles.headerLeftItems + " " + campClass }><a className={ styles.dropbtn }>Camps</a></li>
          		<div className={ styles.dropdownContent }>
          		  {desktopSports}
      				</div>
      			</div>
      			<li className={ styles.headerLeftItems + " " + registrationClass }><Link to="registration">Registration</Link></li>
      			<li className={ styles.headerLeftItems + " " + calendarClass }><Link to="archives">Calendar</Link></li>
      			<div className={ styles.dropdown }>
        			<li className={ styles.headerLeftItems }><a className={ styles.dropbtn }>General Info</a></li>
        			<div className={ styles.dropdownContent }>
        			  <a href="#">Counselors</a>
      					<a href="#">Lodging</a>
      					<Link to="FAQ">FAQ</Link>
    			    </div>
      			</div>
      			<li className={ styles.headerLeftItems }><a>Contact</a></li>
      		</ul>
      		
      		<div className={ styles.logos }>
      			<a target="_blank" href="https://twitter.com/byusportscamps?lang=en">
      				<img src="media/images/twitter.png" alt="Twitter"/>
      			</a>
      			
      			<a target="_blank" href="https://www.facebook.com/BYUSportsCamps/">
      				<img src="media/images/facebook.png" alt="Facebook"/>
      			</a>
      		</div>
        </nav>
        
        <div className={styles.posFT}>
          <div className={"navbar navbar-inverse " + styles.mobileNav}>
            <button className={"navbar-toggler"} onClick={this.toggleCollapse.bind(this)} type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className={"navbar-toggler-icon"}></span>
            </button>
          </div>
          <div className={"navbar-collapse " + navClass} id="navbarToggleExternalContent">
            <ul className={styles.mobileNavUl}>
              <li><Link to="/" onClick={this.toggleCollapse.bind(this)}>Home</Link></li>
              <li><Link to="/">Camps</Link></li>
              <li><Link to="registration" onClick={this.toggleCollapse.bind(this)}>Register</Link></li>
              <li><Link to="archives" onClick={this.toggleCollapse.bind(this)}>Calendar</Link></li>
              <li><Link to="/" onClick={this.toggleCollapse.bind(this)}>General Info</Link></li>
              <div className={"navbar-collapse " + navClass} id="secondToggleExternalContent">
                <ul>
                  <li>Counselors</li>
                  <li>Lodging</li>
                  <li>FAQ</li>
                </ul>
              </div>
              <li><Link to="/" onClick={this.toggleCollapse.bind(this)}>Counselors</Link></li>
              <li><Link to="/" onClick={this.toggleCollapse.bind(this)}>Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

$(document).ready(function() {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 20) {
        $('nav').css({"position" : "fixed", "width" : "100%", "top": "0", "left": "0"});
      } else {
        $('nav').css({"position" : "absolute", "width" : "calc(100% - 40px)", "top": "20px", "left": "20px"});
      }
    });
});
