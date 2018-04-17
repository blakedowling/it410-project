import React from "react";
import styles from "./camps.css";
import axios from 'axios';
import renderHTML from 'react-render-html';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-112638651-1');


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
            image: '',
            dataThere: false
        };
    }
    
    componentDidMount() {
        var title = this.props.params.camp.replace(/-/g, ' ');
        title = title.replace(/byu/, 'BYU');
        title = title.replace(/\b[a-z]/g,function(f){return f.toUpperCase();}) + ' | BYU Sports Camps';
        document.title = title;
        var th = this;
        var URL = "https://dev.byucougars.com/dl/feeds/camp/" + this.props.params.campid;
        this.serverRequest = axios.get(URL).then(function(response) {
            const data = response.data[0];
            th.setState({
                dataThere: true,
                title: data.title,
                // splits event date on every other comma
                event_date: data.field_event_date.match(/[^,]+,[^,]+/g),
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
    
    registerClick() {
        var th = this;
        ReactGA.event({
            category: 'Register',
            action: 'Register for ' + th.state.title,
            label: th.state.registration_url,
        });
    }
    
    render() {
        const imageURL = 'url(' + this.state.image + ')';
        var register;
        var tempStartDates = [];
        var tempEndDates;
        var startDate;
        var endDate = [];
        var date = [];
        if(this.state.dataThere) {
            if(this.state.registration_url != '') {
                register = <a href={this.state.registration_url} className={styles.registerButton} onClick={this.registerClick.bind(this)} target="_blank">Register</a>;
            } else {
                if(this.state.registration_date != '') {
                        register = <h3 className={styles.noRegistration + " text-center"}>Registration opens {this.state.registration_date}</h3>;
                } else if(Date.parse(this.state.end_date) > Date.now()) {
                    register = <h3 className={styles.noRegistration + " text-center"}>Registration date TBA</h3>;
                } else {
                    register = <h3 className={styles.noRegistration + " text-center"}>Registration for this camp is closed</h3>;
                }
            }
            
            if(this.state.end_date !== '') {
                // splits end_date array into single event dates by splitting on every other comma and then getting rid of extra whitespace
                tempEndDates = this.state.end_date.toString();
                tempEndDates = tempEndDates.match(/[^,]+,[^,]+/g);
                for(var i=0; i < tempEndDates.length; i++) {
                    tempEndDates[i] = tempEndDates[i].trim();
                }
            }
            // trims each start date to get rid of any leading whitespace
            for(var j=0; j < this.state.event_date.length; j++) {
                tempStartDates[j] = this.state.event_date[j].trim();
            }
                
            for(var k=0; k < tempStartDates.length; k++) {
                // if there is no end_date, each event date will stand alone in the array
                if(this.state.end_date === '') {
                    date.push( <h6 key={k}>{tempStartDates[k]}</h6> );
                } else {
                    // turns start_date into month day (i.e. June 25, 2018 --> June 25)
                    startDate = tempStartDates[k].split(',');
                    startDate = startDate[0];
                    // if both start and end date are the same month this will get rid of the month ont he end date
                    if(tempStartDates[k].substring(0,3) == tempEndDates[k].substring(0,3)) {
                        endDate = tempEndDates[k].substr(tempEndDates[k].indexOf(' ')+1);
                    } else {
                        endDate = tempEndDates[k];
                    }
                    date.push( <h6 key={k}>{startDate}-{endDate}</h6> );
                }
            }
        }
        
        return (
            <div>
                <div className={styles.campBanner} style={{backgroundImage: imageURL}}>
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
            </div>
        );
    }
}