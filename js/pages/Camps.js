import React from "react";
import styles from "./camps.css";
import Equality from "../components/Equality";
import Ads from "../components/Ads";
import axios from 'axios';
import renderHTML from 'react-render-html';
import YBA from "../components/YBA";


export default class Camps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            event_date: '',
            end_date: '',
            who: '',
            price: '',
            body: '',
            registration_url: '',
            registration_date: '',
            image: ''
            
        };
    }
    
    componentDidMount() {
        var title = this.props.params.camp.replace(/-/g, ' ');
        title = title.replace(/byu/, 'BYU');
        title = title.replace(/\b[a-z]/g,function(f){return f.toUpperCase();}) + ' | BYU Sports Camps';
        document.title = title;
        var th = this;
        var URL = "https://byucougars.com/dl/feeds/camp/" + this.props.params.campid;
        this.serverRequest = axios.get(URL).then(function(response) {
            const data = response.data[0];
            th.setState({
                title: data.title,
                event_date: data.field_event_date,
                end_date: data.field_end_date,
                who: data.field_age_restriction,
                price: data.field_price,
                body: data.body,
                registration_url: data.field_registration_url,
                registration_date: data.field_registration_opens_date,
                image: data.field_sport_camp_image
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
        const imageURL = 'url(' + this.state.image + ') no-repeat fixed center';
        var register;
        if(this.state.registration_url != '') {
            register = <button><a href={this.state.registration_url} target="_blank">Register</a></button>;
        } else {
            if(this.state.registration_date != '') {
                    register = <h3 className={styles.noRegistration + " text-center"}>Registration opens {this.state.registration_date}</h3>;
            } else if(Date.parse(this.state.end_date) > Date.now()) {
                register = <h3 className={styles.noRegistration + " text-center"}>Registration not open</h3>;
            } else {
                register = <h3 className={styles.noRegistration + " text-center"}>Registration for this camp is closed</h3>;
            }
        }
        var date;
        var end_date;
        if(this.state.end_date == '') {
            date = <h6>{this.state.event_date}</h6>;
        } else {
            var start = this.state.event_date.split(',');
            start = start[0];
            if(this.state.event_date.substring(0,3) == this.state.end_date.substring(0,3)) {
                end_date = this.state.end_date.substr(this.state.end_date.indexOf(' ')+1);
            } else {
                end_date = this.state.end_date;
            }
            date = <h6>{start}-{end_date}</h6>;
        }
        
        return (
            <div>
                <div className={styles.campBanner} style={{background: imageURL}}>
                    <div className={"container " + styles.campInfo}>
                        <h1 className={"text-center"}>{renderHTML(this.state.title)}</h1>
                        <div className={ styles.whenWhoPrice}>
                            <div><h4>When:</h4>{date}</div>
                            <div><h4>Who:</h4><h6>{this.state.who}</h6></div>
                            <div><h4>Price:</h4><h6>{this.state.price}</h6></div>
                        </div>
                        {renderHTML(this.state.body)}
                        {register}
                    </div>
                </div>
                <Equality/>
                <YBA/>
                <Ads/>
            </div>
        );
    }
}