import React from "react";
import styles from "./calendar.css";
import { Link } from 'react-router';
import Equality from "../components/Equality";
import Ads from "../components/Ads";
import YBA from "../components/YBA";
import axios from 'axios';
import renderHTML from 'react-render-html';

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    
    componentDidMount() {
        document.title = "Calendar | BYU Sports Camps";
        var th = this;
        var URL = "https://byucougars.com/dl/feeds/sc-schedule";
        this.serverRequest = axios.get(URL).then(function(response) {
            th.setState({
                data: response.data
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    
    changeMonth() {
        var th = this;
        var monthSelector = document.querySelector('select');
        var month = monthSelector.options[monthSelector.selectedIndex].value;
        var URL = "https://byucougars.com/dl/feeds/sc-schedule/" + month;
        this.serverRequest = axios.get(URL).then(function(response) {
            th.setState({
                data: response.data
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    clearMonth() {
        var th = this;
        var URL = "https://byucougars.com/dl/feeds/sc-schedule";
        document.querySelector('select').selectedIndex = 0;
        this.serverRequest = axios.get(URL).then(function(response) {
            th.setState({
                data: response.data
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    
    render() {
        var camps = [];
        var register;
        var link;
        var urlTitle;
        var date;
        var end_date;
        this.state.data.forEach(item => {
            urlTitle = item.title.replace(/ /g, '-').toLowerCase();
            link = 'camps/' + urlTitle + '/' + item.nid;
            // link = 'camps/' + item.nid;
            if(item.field_registration_url == '') {
                if(item.field_registration_opens_date != '') {
                    register = <h5>Registration opens {item.field_registration_opens_date}</h5>;
                } else {
                    register = <h5>Registration not open</h5>;
                }
            } else {
                register = <h5><a href={item.field_registration_url}>Register</a></h5>;
            }
            
            // merges event_date and end_date depending on if the months are the same
            // e.g. May 3-7 vs. May 29-June 2
            if(item.field_end_date == '') {
                date = <h5>{item.field_event_date}</h5>;
            } else {
                var start = item.field_event_date.split(',');
                start = start[0];
                if(item.field_event_date.substring(0,3) == item.field_end_date.substring(0,3)) {
                    end_date = item.field_end_date.substr(item.field_end_date.indexOf(' ')+1);
                } else {
                    end_date = item.field_end_date;
                }
                date = <h5>{start}-{end_date}</h5>;
            }
            
            camps.push(
                <section key={item.nid} className={styles.row + " row"}>
                    <div className={styles.date + " col-sm-3"}>
                        {date}
                    </div>
                    <div className={"col-sm-6"}>
                        <h3 class={"text-center"}><Link to={link}>{renderHTML(item.title)}</Link></h3>
                        <div><h5>Who: {item.field_age_restriction}</h5></div>
                        <div><h5>Price: {item.field_price}</h5></div>
                    </div>
                    <div className={styles.register + " col-sm-3"}>
                        { register }
                    </div>
                </section>
            );
            
        });
        
        return (
            <div>
                <div className={ styles.scheduleBanner }>
                    <div className={"container " + styles.scheduleInfo}>
                        <h1 className={"text-center"}>All Camps Schedule</h1>
                        <div className={styles.filterDiv}>
                            <select onChange={this.changeMonth.bind(this)} name="months" className={styles.months}>
                                <option value="">-------Filter by Month-------</option>
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                            <button className={styles.apply + " btn-raised btn btn-default"} onClick={this.clearMonth.bind(this)}>Reset</button>
                        </div>
                        {camps}
                    </div>
                </div>
                <Equality/>
                <YBA/>
                <Ads/>
            </div>
        );
    }
}