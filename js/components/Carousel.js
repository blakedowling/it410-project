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
        const viewButton = {
            border: '1px solid white',
            background: 'none',
            marginTop: '.25em',
            padding: '0'
        };
        const viewA = {
            fontSize: '14pt',
            padding: '.3em 1em',
            color: 'white',
            textTransform: 'uppercase'
        }
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
                        <button>{item.name}
                        </button>
                        <button style={viewButton}>
                            <Link to={link} style={viewA}>View Camps</Link>
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