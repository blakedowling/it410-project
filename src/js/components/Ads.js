import React from "react";
import styles from'./ads.css';

export default class Ads extends React.Component {
  render() {
    return (
        <div className={ styles.ads+ ' container' }>
            <a href="#"><img src="media/images/Coke-Powerade.png" alt="Powerade"/></a>
            <a href="#"><img src="media/images/nike.png" alt="Nike"/></a>
            <a href="#"><img src="media/images/Dicks-Sporting-Goods.png" alt="Dicks"/></a>
            <a href="#"><img src="media/images/zionsbank.png" alt="Zions Bank"/></a>
        </div>
    );
  }
}
