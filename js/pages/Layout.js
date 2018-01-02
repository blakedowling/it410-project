import React from "react";
import { Link } from "react-router";

import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";

export default class Layout extends React.Component {
  navigate() {
    // console.log(this.props);
    this.props.history.pushState(null, "/");
  }
  render() {
    const { location } = this.props;

    const containerStyle = {
      marginTop: "60px"
    };
    return (
      <div>
        <Nav location={location} />
        {this.props.children}
        <Footer/>
      </div>

    );
  }
}

// <h1>KillerNews.net</h1>
// <button class="btn btn-primary" onClick={this.navigate.bind(this)}>Home</button>
// <Link to="archives"><button class="btn btn-success">Archives</button></Link>
// <Link to="settings"><button class="btn btn-danger">Settings</button></Link>