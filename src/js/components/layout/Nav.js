import React from "react";
import { IndexLink, Link } from "react-router";
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
    var th = this;
    this.serverRequest = axios.get("https://byucougars.com/dl/feeds/sports-camps")
      .then(function(response) {
        th.setState({
          data: response.data
      });
    })
    .catch(function(error) {
      console.log(error);
    });
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
    const { collapsed } = this.state;
    const { moreCollapsed } = this.state;
    const { campsCollapsed } = this.state;
    const homeClass = location.pathname === "/" ? styles.active : "";
    const calendarClass = location.pathname.match(/^\/calendar/) ? styles.active : "";
    const campClass = location.pathname.match(/^\/sport/) || location.pathname.match(/^\/camp/) ? styles.active : "";
    const registrationClass = location.pathname.match(/^\/page\/registration/) ? styles.active : "";
    const moreClass = location.pathname.match(/^\/page\/general info/) || location.pathname.match(/^\/page\/counselors/) || location.pathname.match(/^\/page\/FAQ/) || location.pathname.match(/^\/page\/lodging/) ? styles.active : "";
    const contactClass = location.pathname.match(/^\/page\/contact/) ? styles.active : "";
    const navClass = collapsed ? "collapse" : "";
    const campsNav = campsCollapsed ? "collapse" : "";
    const generalNav = moreCollapsed ? "collapse" : "";
    
    var desktopSports = [];
    var mobileSports = [];
    this.state.data.forEach(item => {
      var link = 'sports/' + item.name + "/" + item.tid;
      desktopSports.push(
        <Link key={item.tid} to={link}>{item.name}</Link>
      );
      mobileSports.push(
        <li key={item.tid}><Link to={link} onClick={this.collapseAll.bind(this)}>{item.name}</Link></li>
      );
    });
    
    return (
      <div>
        <nav className={ styles.topNavbar }>
          <ul>
      			<li className={ styles.headerLeftItems + " " + homeClass }><Link to="/"><img className={ styles.siteLogo }src="media/images/BYUlogo_stroke400.png" alt="BYU Logo"/></Link></li>
      			<section className={ styles.dropdown }>
          		<li className={ styles.headerLeftItems + " " + campClass }><span className={ styles.dropbtn }>Camps</span></li>
          		<article className={ styles.dropdownContent }>
          		  {desktopSports}
      				</article>
      			</section>
      			<li className={ styles.headerLeftItems + " " + registrationClass }><Link to="page/registration/1282926">Registration</Link></li>
      			<li className={ styles.headerLeftItems + " " + calendarClass }><Link to="calendar">Calendar</Link></li>
      			<li className={ styles.headerLeftItems + " " + contactClass }><Link to="page/contact/1282928">Contact</Link></li>
      			<section className={ styles.dropdown }>
        			<li className={ styles.headerLeftItems + " " + moreClass }><span className={ styles.dropbtn }>More</span></li>
        			<article className={ styles.dropdownContent }>
        			  <Link to="page/general-info/1282927" className={ styles.dropbtn }>General Info</Link>
        			  <Link to="page/counselors/1282929">Counselors</Link>
      					<Link to="page/lodging/1282930">Lodging</Link>
      					<Link to="page/FAQ/1282931">FAQ</Link>
    			    </article>
      			</section>
      		</ul>
      		
      		<div className={ styles.logos }>
      			<a href="https://twitter.com/byusportscamps" target="_blank">
      				<img src="media/images/twitter.png" alt="Twitter"/>
      			</a>
      			
      			<a target="_blank" href="https://www.facebook.com/BYUSportsCamps/">
      				<img src="media/images/facebook.png" alt="Facebook"/>
      			</a>
      		</div>
        </nav>
        
        <div className={styles.posFT}>
          <div className={"navbar navbar-inverse " + styles.mobileNav}>
            <button className={"navbar-toggler"} onClick={this.toggleCollapse.bind(this)} type="button" aria-expanded="false" aria-label="Toggle navigation">
              <span className={"navbar-toggler-icon"}></span>
            </button>
          </div>
          <div className={"navbar-collapse " + navClass} id="navbarToggleExternalContent">
            <ul className={styles.mobileNavUl}>
              <li><Link to="/" onClick={this.collapseAll.bind(this)}>Home</Link></li>
              <li><Link to="" onClick={this.toggleCampsCollapse.bind(this)}>Camps</Link></li>
              <div className={"navbar-collapse " + campsNav}>
                <ul>
                  {mobileSports}
                </ul>
              </div>
              <li><Link to="page/registration/1282926" onClick={this.collapseAll.bind(this)}>Register</Link></li>
              <li><Link to="calendar" onClick={this.collapseAll.bind(this)}>Calendar</Link></li>
              <li><Link to="page/contact/1282928" onClick={this.collapseAll.bind(this)}>Contact</Link></li>
              <li><Link to="" onClick={this.toggleMoreCollapse.bind(this)}>More</Link></li>
              <div className={"navbar-collapse " + generalNav}>
                <ul>
                  <li><Link to="page/general" onClick={this.collapseAll.bind(this)}>General Info</Link></li>
                  <li><Link to="page/counselors/1282929" onClick={this.collapseAll.bind(this)}>Counselors</Link></li>
                  <li><Link to="page/lodging/1282930" onClick={this.collapseAll.bind(this)}>Lodging</Link></li>
                  <li><Link to="page/FAQ/1282931" onClick={this.collapseAll.bind(this)}>FAQ</Link></li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
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
    // click function for all content - loaded statically and dynamically
    $(document).on("click", "a", function(e) {
        // console.log("log something");
        $('article').css('visibility', 'hidden');
        // return false;
    });
    // makes dropdown article visible/hidden on mouseenter/leave of section 
    $('section').on("mouseenter", function(e) {
        $(this).children('article').css('visibility', 'visible');
        return false;
    });
    $('section').on("mouseleave", function(e) {
        $(this).children('article').css('visibility', 'hidden');
        return false;
    });
});
