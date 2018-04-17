import React from "react";
import styles from "./calendar.css";
import { Link } from 'react-router';
import axios from 'axios';
import renderHTML from 'react-render-html';
var mysql = require('mysql');
import ReactGA from 'react-ga';
ReactGA.initialize('UA-112638651-1');

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataThere: false,
            data: []
        };
    }
    
     
    
    componentDidMount() {
        // var connection = mysql.createConnection({
        //     host: 'localhost',
        //     user: 'blaked93',
        //     password: '',
        //     database: 'c9'
        // });
        // connection.query("SELECT * FROM EVENT;", function (err, rows, fields) {
        //     if (err) throw err;
        //     console.log(rows);
        // });
        
        
        document.title = "Calendar | BYU Sports Camps";
        var th = this;
        var URL = "https://dev.byucougars.com/dl/feeds/sc-schedule";
        this.setState({ loading: true }, () => {
            this.serverRequest = axios.get(URL).then(function(response) {
                th.setState({
                    loading: false,
                    dataThere: true,
                    data: response.data
                });
            })
            .catch(function(error) {
                console.log(error);
            });
        });
    }
    
    changeMonth() {
        var th = this;
        var monthSelector = document.querySelector('select');
        var month = monthSelector.options[monthSelector.selectedIndex].value;
        var URL = "https://dev.byucougars.com/dl/feeds/sc-schedule/" + month;
        this.setState({ loading: true }, () => {
            this.serverRequest = axios.get(URL).then(function(response) {
                th.setState({
                    loading: false,
                    data: response.data
                });
            })
            .catch(function(error) {
                console.log(error);
            });
        });
    }
    clearMonth() {
        var th = this;
        var URL = "https://dev.byucougars.com/dl/feeds/sc-schedule";
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
    
    registerClick(item) {
        console.log(item);
        ReactGA.event({
            category: 'Register',
            action: 'Register for ' + item.title,
            label: item.field_registration_url,
        });
    }
    
    render() {
        var camps = [];
        var register;
        var link;
        var urlTitle;
        // var date;
        // var end_date;
        var element;
        var month;
        if(!this.state.loading) {
            if(this.state.data.length == 0) {
                element = document.querySelector('select');
                month = element.options[element.selectedIndex].text;
                camps.push(
                    <section className={styles.noCamps}>
                        <h2>There are no camps in {month}</h2>
                    </section>
                );
                
            } else {
                this.state.data.forEach(item => {
                    urlTitle = item.title.replace(/ /g, '-').toLowerCase();
                    link = 'camps/' + urlTitle + '/' + item.nid;
                    // link = 'camps/' + item.nid;
                    var tempStartDates = [];
                    var tempEndDates;
                    var startDate;
                    var endDate = [];
                    var date = [];
                    
                    if(item.field_end_date !== '') {
                        // splits end_date array into single event dates by splitting on every other comma and then getting rid of extra whitespace
                        tempEndDates = item.field_end_date.toString();
                        tempEndDates = tempEndDates.match(/[^,]+,[^,]+/g);
                        for(var i=0; i < tempEndDates.length; i++) {
                            tempEndDates[i] = tempEndDates[i].trim();
                        }
                    }
                    // trims each start date to get rid of any leading whitespace
                    tempStartDates = item.field_event_date.toString();
                    tempStartDates = tempStartDates.match(/[^,]+,[^,]+/g);
                    for(var j=0; j < tempStartDates.length; j++) {
                        tempStartDates[j] = tempStartDates[j].trim();
                    }
                    
                    for(var k=0; k < tempStartDates.length; k++) {
                        // if there is no end_date, each event date will stand alone in the array
                        if(item.field_end_date === '') {
                            // console.log(Date.parse(tempStartDates[k]));
                            date.push( <h5 key={Date.parse(tempStartDates[k])}>{tempStartDates[k]}</h5> );
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
                            // console.log((startDate));
                            date.push( <h5 key={Date.parse(startDate)}>{startDate}-{endDate}</h5> );
                        }
                    }
                    
                    if(item.field_registration_url == '') {
                        if(item.field_registration_opens_date != '') {
                            register = <h5>Registration opens {item.field_registration_opens_date}</h5>;
                        } else {
                            register = <h5>Registration not open</h5>;
                        }
                    } else {
                        register = <h5><a href={item.field_registration_url} onClick={this.registerClick.bind(this, item)} target="_blank">Register</a></h5>;
                    }
                    
                    // // merges event_date and end_date depending on if the months are the same
                    // // e.g. May 3-7 vs. May 29-June 2
                    // if(item.field_end_date == '') {
                    //     date = <h5>{item.field_event_date}</h5>;
                    // } else {
                    //     var start = item.field_event_date.split(',');
                    //     start = start[0];
                    //     if(item.field_event_date.substring(0,3) == item.field_end_date.substring(0,3)) {
                    //         end_date = item.field_end_date.substr(item.field_end_date.indexOf(' ')+1);
                    //     } else {
                    //         end_date = item.field_end_date;
                    //     }
                    //     date = <h5>{start}-{end_date}</h5>;
                    // }
                    
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
            }
        }
        
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
                            {this.state.loading && 
                                <span className={styles.spinner}><i className="fa fa-spinner fa-spin" /> Loading...</span>
                            }
                        </div>
                        {camps}
                    </div>
                </div>
            </div>
        );
    }
}