import { Link } from "react-router";
import React from "react";
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
