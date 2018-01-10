import React, { Component } from 'react';
import { Link } from 'react-router';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import $ from 'jquery';
 
export default class DemoCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    
    componentDidMount() {
        var URL = "https://byucougars.com/dl/feeds/scrank";
        var th = this;
        // console.log(this.props);
        this.serverRequest = axios.get(URL)
            .then(function(response) {
                th.setState({
                    data: response.data
                });
            // console.log(th.state.data);
        }.bind(this))
        .catch(function(error) {
            console.log(error);
        });
    }
    render() {
        var slides = [];
        var link;
        var urlTitle;
        var alt;
        this.state.data.forEach(item => {
            urlTitle = item.name.replace(/ /g, '-').toLowerCase();
            link = 'sports/' + urlTitle + '/' + item.tid;
            alt = 'BYU Sports Camps - ' + item.name;
            slides.push(
                <div key={item.nid}>
                    <img src={item.field_scimage} alt={alt}/>
                    <div className="legend">
                        <button>
                            <Link to={link}>{item.name} Camps</Link>
                        </button>
                    </div>
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