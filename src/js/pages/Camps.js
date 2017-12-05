import React from "react";
import styles from "./camps.css";
// import { Link } from 'react-router';
import Ads from "../components/Ads";
import axios from 'axios';
import renderHTML from 'react-render-html';

export default class Camps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            when: '',
            who: '',
            price: '',
            body: '',
            registration_url: ''
        };
    }
    
    componentDidMount() {
        var th = this;
        var URL = "https://byucougars.com/dl/feeds/camp/" + this.props.params.campid
        this.serverRequest = axios.get(URL).then(function(response) {
            const data = response.data[0];
            console.log(response);
            th.setState({
                title: data.title,
                when: data.field_event_date,
                who: data.field_age_restriction,
                price: data.field_price,
                body: data.body,
                registration_url: data.field_registration_url
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    // componentWillUnmount() {
    //     this.serverRequest.abort();
    // }
    render() {
        return (
            <div>
                <div className={ styles.campBanner }>
                    <div className={"container " + styles.campInfo}>
                        <h1 className={"text-center"}>{renderHTML(this.state.title)}</h1>
                        <div className={ styles.whenWhoPrice}>
                            <div><h4>When:</h4><h6>{renderHTML(this.state.when)}</h6></div>
                            <div><h4>Who:</h4><h6>{this.state.who}</h6></div>
                            <div><h4>Price:</h4><h6>{this.state.price}</h6></div>
                        </div>
                        {renderHTML(this.state.body)}
                        <button><a href={this.state.registration_url} target="_blank">Register</a></button>
                    </div>
                </div>
            
                <div className={ styles.relatedCamps + ' container' }>
                    <h3 className={"text-center"}>Related Camps</h3>
                    <div className={ styles.relatedCampFlex }>
                        <div className={styles.relatedCamp}>
                            <h4>Cubs Camp 1</h4>
                            <h6>June 9-10, 2018</h6>
                            <h6>Boys Entering Grades 6-8</h6>
                            <h6>$500</h6>
                            <button><a href="">Learn More</a></button>
                        </div>
                        <div className={styles.relatedCamp}>
                            <h4>Cubs Camp 2</h4>
                            <h6>June 16-17, 2018</h6>
                            <h6>Boys Entering Grades 6-8</h6>
                            <h6>$500</h6>
                            <button><a href="">Learn More</a></button>
                        </div>
                        <div className={styles.relatedCamp}>
                            <h4>Skills & Agility Clinic</h4>
                            <h6>June 23-24, 2018</h6>
                            <h6>Boys Entering Grades 6-8</h6>
                            <h6>$500</h6>
                            <button><a href="">Learn More</a></button>
                        </div>
                        <div className={styles.relatedCamp}>
                            <h4>Middle School</h4>
                            <h6>June 27-30, 2018</h6>
                            <h6>Boys Entering Grades 6-8</h6>
                            <h6>$1,000</h6>
                            <button><a href="">Learn More</a></button>
                        </div>
                    </div>
                </div>
                <Ads/>
            </div>
        );
    }
}