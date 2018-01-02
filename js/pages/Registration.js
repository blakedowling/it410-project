import React from "react";
import styles from "./registration.css";
import Ads from "../components/Ads";
import axios from 'axios';
import renderHTML from 'react-render-html';


export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    
    componentDidMount() {
        // console.log(this);
        var th = this;
        this.serverRequest = axios.get("https://byucougars.com/dl/feeds/camp/1282736")
            .then(function(response) {
                console.log(response.data);
                th.setState({
                    data: response.data
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    render() {
        var tableRows = [];
        this.state.data.forEach(item => {
            tableRows.push(
                <tr key={item.nid}>
                    <td>{renderHTML(item.title)}</td>
                    <td><a href={item.field_registration_url}>Register Now</a></td>
                </tr>
            );
         });
        return (
            <div>
                <div className={styles.registrationBanner}>
                    <div className={"container " + styles.registrationInfo}>
                        <h1 className={"text-center"}>Registration</h1>
                        <table className={"table table-striped"}>
                            <thead>
                              <tr>
                                <th>Camp Name</th>
                                <th>Registration Link</th>
                              </tr>
                            </thead>
                            <tbody>
                              {tableRows}
                            </tbody>
                        </table>
                        <h5>Registration</h5>
                        <p>
                            Full tuition is due at the time of registration. No deposits or partial payments will be accepted.  
                            A parent can create one login identity for themselves and register multiple family members to different 
                            camps with that one login. At the time of registration, a parent will need to enter all medical 
                            emergency contact and insurance information.
                        </p>
                        <p>
                            Due to high demand, some camps fill very quickly and registering early is recommended. Walk-ons will 
                            be accepted in each program on a space-available basis only. For walk-on registrations, please call to 
                            check on the status of the program. When you receive your confirmation email, please read it immediately 
                            and check it over to verify that all information (camp dates, payment amount, etc.) is correct. Notify us 
                            immediately if any of the information is incorrect.
                        </p>
                        <p>
                            <b>Participants are allowed to make a roommate request at the time of registration.  We will not be able to 
                            honor a roommate request made within 10 days of the start of camp.</b>
                        </p>
                        
                        <h5>Cancellations and Refunds</h5>
                        <p className={ styles.alertMessage }>IF YOU REGISTER YOUR CHILD FOR A CAMP AND THEY DO NOT ATTEND, YOU WILL NOT RECEIVE A REFUND.</p>
                        <p>
                            Only a participant and his or her parents have authority to request a refund. Full refunds, minus the $35 nonrefundable 
                            portion of camp tuition, will be given on all cancellations requested by 5 p.m. 10 days before the camp begins. 
                            No refunds will be given after this deadline. For example, if you are attending a Basketball Camp beginning Monday, 
                            June 19th, refunds will not be given after 5 p.m. Friday, June 9th.
                        </p>
                        
                        <p>
                            The simplest way to cancel a camp registration is to email sportscamps@byu.edu with the participant name and camp ID 
                            number (confirmation number). If a program is canceled, a full refund will be given. Brigham Young University cannot be 
                            held responsible for any change or cancellation charges required by airlines, travel agencies or other institutions.
                        </p>
                        
                        <h5>Fathers and Sons Camp Cancellations</h5>
                        
                        <p>
                            Prior to April 20, 2017 there is a nonrefundable fee of $35 for cancellations from the Fathers and Sons Camp.  
                            After April 20, 2017 there is a nonrefundable fee of $100 per participant when cancelling a camp registration 
                            for Fathers and Sons Camp.  No refunds for cancellations within the 21 days before the camp begins.  For example, 
                            if you are attending Fathers and Sons Camp beginning Friday, May 26th, refunds will not be given after 5 p.m.Friday, May 5th.
                        </p>
                        <p><a href="http://byusportscamps.com/general-info">Learn more about general camp information</a></p>
                    </div>
                </div>
                <Ads/>
            </div>
        );
    }
}



