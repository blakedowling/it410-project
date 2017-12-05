import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
 
export default class DemoCarousel extends Component {
    render() {
        return (
            // <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>
            <Carousel>
                <div>
                    <img src="media/images/17mbball_wallpaper (1).jpg" />
                    <p className="legend">Camp 1</p>
                </div>
                <div>
                    <img src="media/images/17mbball_wallpaper (1).jpg" />
                    <p className="legend">Camp 2</p>
                </div>
                <div>
                    <img src="media/images/17mbball_wallpaper (1).jpg" />
                    <p className="legend">Camp 3</p>
                </div>
            </Carousel>
        );
    }
}
 
// ReactDOM.render(<DemoCarousel />, document.querySelector('.demo-carousel'));