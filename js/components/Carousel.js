import React, { Component } from 'react';
import { Link } from 'react-router';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
 
export default class DemoCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [ 
                    { key: 1, url:'media/images/wedding1.jpg', alt:'venue with mountains' },
                    { key: 2, url:'media/images/wedding2.jpg', alt:'reception' },
                    { key: 3, url:'media/images/wedding3.jpg', alt:'wedding ceremony' },
                    { key: 4, url:'media/images/wedding5.jpg', alt:'bride and groom' },
                    { key: 5, url:'media/images/wedding6.jpg', alt:'bouquet toss' },
                ]
        };
    }
    
    componentDidMount() {

    }
    render() {
        var slides = [];
        this.state.data.forEach(item => {
            slides.push(
                <div key={item.key}>
                    <img src={item.url} alt={item.alt}/>
                </div>
            );
        });
        
        return (
            <div>
                <div className="desktopSlider">
                    <Carousel>
                        {slides}
                    </Carousel>
                </div>
                <div className="mobilePic">
                </div>
            </div>
        );
    }
}