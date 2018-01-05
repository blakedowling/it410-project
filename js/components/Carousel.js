import React, { Component } from 'react';
import { Link } from 'react-router';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
 
export default class DemoCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    
    componentDidMount() {
        var URL = "https://byucougars.com/dl/feeds/scfront";
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
            urlTitle = item.title.replace(/ /g, '-').toLowerCase();
            link = 'camps/' + urlTitle + '/' + item.nid;
            alt = 'BYU Sports Camps - ' + item.title;
            slides.push(
                <div key={item.nid}>
                    <img src={item.field_single_use_photos} alt={alt}/>
                    <Link to={link} className="legend">{item.field_slider_text}</Link>
                </div>
            );
        });

        return (
            <Carousel>
                {slides}
            </Carousel>
        );
    }
}