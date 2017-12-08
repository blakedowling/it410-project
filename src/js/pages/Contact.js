import React from "react";
import styles from "./registration.css";
import Ads from "../components/Ads";
import axios from 'axios';
import renderHTML from 'react-render-html';


export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    
    render() {
        const address = {
            paddingLeft: "15px"
        };
        return (
            <div>
                <div className={styles.registrationBanner}>
                    <div className={"container " + styles.contactInfo}>
                        <h1 className={"text-center"}>Contact</h1>
                        <h5>Contact Information</h5>
                        <p>
                            <b>Telephone number:</b> (801) 422-56724<br/>
                            <b>Email Address:</b> <a href="mailto:sportscamps@byu.edu" target="_top">sportscamps@byu.edu</a><br/>
                            <b>Mailing address:</b><br/>
                            <address style={address}>
                                BYU Sports Camps<br/>
                                310 Student Athlete Building<br/>
                                Provo, UT 84602
                            </address>
                        </p>
                    </div>
                </div>
                <Ads/>
            </div>
        );
    }
}



