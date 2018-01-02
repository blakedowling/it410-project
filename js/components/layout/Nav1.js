import React from "react";
import { IndexLink, Link } from "react-router";

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const featuredClass = location.pathname === "/" ? "active" : "";
    const archivesClass = location.pathname.match(/^\/archives/) ? "active" : "";
    const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";
    
    const topNavbar = {
      position: 'absolute',
      zIndex: '100',
      top: '20px',
      left: '20px',
      width: 'calc(100% - 40px)',
      height: '60px',
      background: '#eeeeee',
      textTransform: 'uppercase'
    };
    const navUL = {
      float: 'left',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '0'
    };
// #top-navbar li {
//     padding: 0;
// }
// #top-navbar .camps {
//     float: right,
//     height: 100%,
//     background: #003da7,
//     color: white,
//     font-size: 28px,
//     display: block,
//     text-align: center;
// }

    const headerLeftItems = {
      textDecoration: 'none',
      color: 'black',
      height: '100%',
      display: 'flex',
      alignItems: 'center'
    };

// .header-left-items:hover {
//     cursor: pointer,
//     text-decoration: none,
//     border-bottom: 5px solid #003da7;

// }

// .header-left-items.active a {
//     background-color: #002d5d,
//     color: white;
// }
// .header-left-items.active a:hover {
//     color: white;
// }
    const headerLeftItemsA = {
      paddingLeft: '1em',
      paddingRight: '1em',
      fontSize: '12pt',
      color: 'black',
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center'
    };
// .header-left-items a:hover {
//     text-decoration: none;
// }

    const dropdown = {
      position: 'relative',
      display: 'inline-block',
      color: 'black',
      height: '100%'
    };
    const dropbtn = {
      padding: '0 .5em',
      display: 'flex',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    };
// .dropbtn:hover {
//     cursor: pointer,
//     text-decoration: none,
//     color: white;
// }
// .dropbtn:visited {
//     text-decoration: none;
// }

    const dropdownContent = {
      display: 'block',
      visibility: 'hidden',
      transition: 'visibility 0s ease-in-out 0.1s',
      position: 'absolute',
      backgroundColor: '#f9f9f9',
      minWidth: '200px',
      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
      zIndex: '1'
    };

// .dropdown-content a {
//     font-size: 10pt,
//     color: black,
//     padding: .4em 1em,
//     text-decoration: none,
//     display: block,
//     text-align: left,
//     cursor: pointer;
// }

// .dropdown-content a:hover {
//     background-color: #A9A9A9;
    
// }

// .dropdown:hover .dropdown-content {
//     visibility: visible;
// }
    const logos = {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      float: 'right'
    };
    const logosA = {
      display: 'flex',
      paddingRight: '.5em'
    };

// #top-navbar img {
//     height: 40px;
// }
// #top-navbar .site-logo {
//     height: 55px;
// }

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
      // </nav>
      <div style={ topNavbar }>
        <ul style={ navUL }>
    			<li style={ headerLeftItems } class="active" href="#"><a style={ headerLeftItemsA }><img src="../media/images/BYUlogo_stroke400.png" alt="BYU Logo"/></a></li>
    			<li style={ headerLeftItems }><a style={ headerLeftItemsA } id="camp-a-tag" href="#">Camps</a></li>
    			<li style={ headerLeftItems }><a style={ headerLeftItemsA } href="registration.html" ="1">Registration</a></li>
    			<li style={ headerLeftItems }><a style={ headerLeftItemsA } ="2">Calendar</a></li>
    			<div style={ dropdown }>
        			<li style={ headerLeftItems }><a style={ headerLeftItemsA } style={ dropbtn }>General Info</a></li>
        			<div style={ dropdownContent }>
        			    <a href="#">Counselors</a>
    					<a href="#">Lodging</a>
    					<a href="faq.html">FAQ</a>

    				</div>
    			</div>
    			<li style={ headerLeftItems }><a style={ headerLeftItemsA } ="3">Contact</a></li>
    		</ul>
    		
    		<div style={ logos }>
    			<a style={logosA} target="_blank" href="https://twitter.com/byusportscamps?lang=en" ="4">
    				<img src="media/images/twitter.png" alt="Twitter"/>
    			</a>
    			
    			<a style={logosA} target="_blank" href="https://www.facebook.com/BYUSportsCamps/" ="5">
    				<img src="media/images/facebook.png" alt="Facebook"/>
    			</a>
    		</div>
      </div>
    );
  }
}
