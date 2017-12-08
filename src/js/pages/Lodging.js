import React from "react";
import styles from "./registration.css";
import Ads from "../components/Ads";
import axios from 'axios';
import renderHTML from 'react-render-html';


export default class Lodging extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    
    render() {
        const imgDiv = {
            display: "inline-block"
        };
        return (
            <div>
                <div className={styles.registrationBanner}>
                    <div className={"container " + styles.contactInfo}>
                        <h1 className={"text-center"}>Lodging</h1>
                        <h5>Sports Camps Preferred Lodging</h5>
                        <p>
                            If on-campus housing is full or you just want to stay close to campus 
                            while your child is at camp, try our two preferred hotels, next door 
                            to each other. They are the closest hotels to campus and offer special 
                            rates for BYU Sports Camps participants.
                        </p>
                        <p><b>Special BYU Sports Camps Rates:</b></p>
                        <b>$99 - Courtyard Marriott</b><br/>
                        <b>$109 - Springhill Suites by Marriott</b>
                        <div styles={imgDiv}>
                            <img src="./media/images/SpringhillSuites.png" alt="Springhill Suites Marriott"/>
                            <img src="./media/images/courtyard.png" alt="Courtyard Marriott"/>
                        </div>
                    </div>
                </div>
                <Ads/>
            </div>
        );
    }
}



