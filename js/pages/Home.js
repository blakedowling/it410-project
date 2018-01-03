import React from "react";
import styles from "./home.css";
import { Link } from "react-router";
import axios from 'axios';
import renderHTML from 'react-render-html';
import DemoCarousel from "../components/Carousel";
import Equality from "../components/Equality";
import Ads from "../components/Ads";
// import Tint from "../components/Tint";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      body: ''
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
    this.serverRequest = axios.get("https://byucougars.com/dl/feeds/sc-basic-page/1282948")
      .then(function(response) {
        const data = response.data[0];
        th.setState({
          body: data.body
        });
        // console.log(th.state.body);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  
  
  render() {
    var sports = [];
    this.state.data.forEach(item => {
      var link = 'sports/' + item.name + "/" + item.tid;
      sports.push(
        <Link key={item.tid} to={link} className={"col-md-6 col-xs-12"}>{item.name}</Link>
      );
    });
    // <div className={ styles.videoLoopContainer }>
    //       <video autoPlay loop muted preload webkit-playsinline="true" className={ styles.homeVideo }>
    //         <source src="media/videos/SportsCamps_WIDE.mp4" type="video/mp4"/>
    //         Your browser does not support the video tag
    //       </video>
          
    //       <div className={ styles.videoContent }>
    //         <h1>Registration is now open for all 2018 camps</h1>
    //       </div>
    //     </div>
    
    // <div className={ "container " + styles.homeBody }>
    //   { renderHTML(this.state.body) }
    // </div>
    return (
      <div>
        <DemoCarousel/>
        <Ads/>
        <div className={ styles.sportsDiv + ' container'}>
            <div className={"row " + styles.row}>
              {sports}
            </div>
        </div>
        <Equality/>
      </div>
    );
  }
}

// $(document).ready(function() {
//   $('section').html('<h3>Social Media Feed</h3><div><script src="https://cdn.hypemarks.com/pages/a5b5e5.js" async></script><div class="tintup" data-id="byu-sports-camps" data-columns="" data-expand="true" data-mobilescroll="true" data-infinitescroll="true" data-personalization-id="875963"></div></div>');
// });