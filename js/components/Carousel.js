import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
 
export default class DemoCarousel extends Component {
    render() {
        return (
            // <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>
            <Carousel>
                <div>
                    <img src="media/images/17mbball_wallpaper (1).jpg" />
                    <p className="legend">Boys Basketball</p>
                </div>
                <div>
                    <img src="media/images/football.jpg" />
                    <p className="legend">Football</p>
                </div>
                <div>
                    <img src="media/images/baseball.jpg" />
                    <p className="legend">Baseball</p>
                </div>
                <div>
                    <img src="media/images/w-soccer.jpg" />
                    <p className="legend">Soccer</p>
                </div>
            </Carousel>
        );
    }
}