import React from "react";
import styles from "./FAQ.css";
import { Link } from "react-router";
import axios from 'axios';
import renderHTML from 'react-render-html';
import Ads from "../components/Ads";

export default class FAQ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return(
            <div className={styles.faqBanner}>
                <div className={styles.faqInfo + " container"}>
                    <h1 className={"text-center"}>Frequently Asked Questions</h1>
                    <h5 className={styles.question}>What day can I register?</h5>
                    <p><b>
                        Registration for the BYU summer sports camps will begin in January, 2016.  
                        The opening date is staggered for different camps and will be ordered as follows:
                    </b></p>
                    <p>Registration for Fathers and Sons Camp will begin on January 18th, 2017 at 8 AM Mountain time.</p>
                    <p>Registration for all other camps will begin on January 19th, 2017 at 8 AM Mountain time.</p>
                    <p>To register for one of our camps, <Link to="registration">CLICK HERE</Link>.</p>
                    <h5 className={styles.question}>Can I register over the phone?</h5>
                    <p>All registrations must be done online via our website.  To register for a camp, <Link to="registration">CLICK HERE</Link> or click on the REGISTRATION tab above.</p>
                    <h5 className={styles.question}>The camp I am interested in is full.  Do you have a waiting list?</h5>
                    <p>
                        We do offer a waiting list.  If a spot becomes available then the person at the top of the 
                        waiting list has 48 hours to respond before we move to the next person on the waiting list.  
                        You can put a son or daughter on the waiting list at the time of registration if the camp you 
                        are looking for is already full.
                    </p>
                    <h5 className={styles.question}>How quickly to BYU Sports Camps fill up?</h5>
                    <p>
                        Due to high demand, some camps fill very quickly.  We recommend that you register as 
                        early as possible in order to guarantee a spot in your desired camp.
                    </p> 
                    <h5 className={styles.question}>What are the dates of the camp I want to attend?</h5>
                    <p>
                        The dates for each camp can be found on the web page for that specific sport.  
                        Select the sport you are interested by clicking on the list on the right side of this page.
                    </p>
                    <h5 className={styles.question}>How can we make sure my son/daughter rooms with their friend?</h5>
                    <p>
                        Roommate requests can be made at the time of registration, and every effort will be made to meet these accommodations. 
                        However, as has always been the case, we cannot guarantee roommates.
                    </p>
                    <p><b>
                        Participants are allowed to make a roommate request at the time of registration.  
                        We will not be able to honor a roommate request made within 10 days of the start of camp.
                    </b></p>
                    <h5 className={styles.question}>I want to apply to be a camp counselor. How do I go about doing that?</h5>
                    <p>We appreciate your interest in being a sports camp counselor. Please click HERE and follow the application instructions.</p>
                </div>
            </div>   
        );
    }
}