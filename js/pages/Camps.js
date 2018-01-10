import React from "react";
import styles from "./camps.css";
import Equality from "../components/Equality";
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
            console.log(data);
            th.setState({
                title: data.title,
                when: data.field_event_date,
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
        var padTop;
        var register;
        if(this.state.registration_url != '') {
            register = <button><a href={this.state.registration_url} target="_blank">Register</a></button>;
        } else {
            if(this.state.registration_date != '') {
                    register = <h3 className={styles.noRegistration + " text-center"}>Registration opens {this.state.registration_date}</h3>;
            } else if(Date.parse(this.state.when) > Date.now()) {
                register = <h3 className={styles.noRegistration + " text-center"}>Registration not open</h3>;
            } else {
                register = <h3 className={styles.noRegistration + " text-center"}>Registration for this camp is closed</h3>;
            }
        }
        
        return (
            <div>
                <div className={styles.campBanner} style={{background: imageURL}}>
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
                <Equality/>
                <Ads/>
            </div>
        );
    }
}