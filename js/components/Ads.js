import React from "react";
import styles from'./ads.css';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-112638651-1');

export default class Ads extends React.Component {
    yba() {
        ReactGA.event({
            category: 'Ad',
            action: 'Click on YBA ad',
            label: 'https://www.ybashirts.com',
        });
    }
    
    powerade() {
        ReactGA.event({
            category: 'Ad',
            action: 'Click on YBA ad',
            label: 'https://www.ybashirts.com',
        });
    }
    
    nike() {
        ReactGA.event({
            category: 'Ad',
            action: 'Click on Powerade ad',
            label: 'http://www.coca-colacompany.com/brands/powerade',
        });
    }
    
    dicks() {
        ReactGA.event({
            category: 'Ad',
            action: "Click on Dicks' ad",
            label: 'https://www.ybashirts.com',
        });
    }
    
    zions() {
        ReactGA.event({
            category: 'Ad',
            action: 'Click on Zions ad',
            label: 'https://www.ybashirts.com',
        });
    }
    
    render() {
    return (
        <div className={ styles.ads+ ' container-fluid' }>
          <div>
            <a onClick={this.yba.bind(this)} href="#"><img src="media/images/YBASponsorLogo.jpg" alt="YBA Shirts"/></a>
            <a onClick={this.powerade.bind(this)} href="#"><img src="media/images/Coke-Powerade.png" alt="Powerade"/></a>
            <a onClick={this.nike.bind(this)} href="#"><img src="media/images/nike.png" alt="Nike"/></a>
            <a onClick={this.dicks.bind(this)} href="#"><img src="media/images/Dicks-Sporting-Goods.png" alt="Dicks"/></a>
            <a onClick={this.zions.bind(this)} href="#"><img src="media/images/zionsbank.png" alt="Zions Bank"/></a>
          </div>
        </div>
    );
    }
}
