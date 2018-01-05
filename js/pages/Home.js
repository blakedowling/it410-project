import React from "react";
import styles from "./home.css";
import { Link } from "react-router";
import axios from 'axios';
import renderHTML from 'react-render-html';
import DemoCarousel from "../components/Carousel";
import Equality from "../components/Equality";
import Ads from "../components/Ads";

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
    var link;
    var urlTitle;
    this.state.data.forEach(item => {
      urlTitle = item.name.replace(/ /g, '-').toLowerCase();
      link = 'sports/' + urlTitle + '/' + item.tid;
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
        <div className={ styles.sportsDiv + ' container-fluid'}>
          <div className={"row " + styles.homeRow}>
            <div className={"col-md-12 col-lg-9"}>
              <div className={"row " + styles.sportSection}>
                {sports}
              </div>
            </div>
            <div className={"col-md-12 col-lg-3 " + styles.announcements}>
              <h3 className={"text-center"}>Announcements</h3>
              {renderHTML(this.state.body)}
            </div>
          </div>
        </div>
        <Equality/>
      </div>
    );
  }
}
