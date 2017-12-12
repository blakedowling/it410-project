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
        var register;
        if(this.state.registration_url != '') {
            register = <button><a href={this.state.registration_url} target="_blank">Register</a></button>;
        } else {
            register = <h3 className={styles.noRegistration + " text-center"}>Registration for this camp is not yet open</h3>;
        }
        
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
                        {register}
                    </div>
                </div>
                <Ads/>
            </div>
        );
    }
}