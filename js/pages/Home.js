import React from "react";
import styles from "./home.css";
import { Link } from "react-router";
import axios from 'axios';
import renderHTML from 'react-render-html';
import DemoCarousel from "../components/Carousel";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      body: ''
    };
  }
      
  componentDidMount() {
    document.title = "Home";
  }
  
  
  render() {
    const headline = {
        // fontSize: '20pt',
        // fontFamily: 'serif',
        marginTop: '30px',
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        lineHeight: '1.5em'
    };
    const testimonialsContainer = {
      margin: '30px 0'
    };
    const testimonials = {
      display: 'flex',
      justifyContent: 'space-between'
    };
    const testimonial = {
      width: '30%',
      margin: '15px',
      padding: '15px 15px 0',
      background: 'white',
      boxShadow: '0px 0px 2px #333',
      borderRadius: '4px'
    };


    return (
      <div>
        <DemoCarousel/>
        <div class="container">
          <h1 style={headline} className={styles.headline}>
            No more overspending on wedding photography.<br/>
            List the photos you want and let your friends do the snapping!
          </h1>
          <div style={testimonialsContainer}>
            <div style={testimonials}>
              <div style={testimonial}>
                <blockquote><i>"I saved hundreds of dollars on my wedding by using Wedding Snaps!  So glad I found it before booking a photographer."</i></blockquote>
              </div>
              
              <div style={testimonial}>
                <blockquote><i>"This is such a great idea! I wish Wedding Snaps was around when I got married!"</i></blockquote>
              </div>
              
              <div style={testimonial}>
                <blockquote><i>"I'd recommend this to all of my friends and family!  My wedding was cheap and the pictures turned out just as I wanted them to!"</i></blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
