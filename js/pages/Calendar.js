import React from "react";
import styles from "./calendar.css";
import { Link } from 'react-router';
import axios from 'axios';
import renderHTML from 'react-render-html';
var mysql = require('mysql');
import fetch from 'isomorphic-fetch';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-112638651-1');


export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    
     
    
    componentDidMount() {
        var th = this;
        document.title = "Event Calendar";
        this.serverRequest = axios.get('/events').then(function(response) {
            console.log(response);
            th.setState({
                data: response.data
            });
            // console.log(th.data);
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    
    
    render() {
        var events = [];
        var register;
        var link;
        var urlTitle;
        var newDate
        var month;
        var day;
        var year;
        var finalDate;
        var month_name = function(dt){
            var mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
            return mlist[dt.getMonth()];
        };
                    
        this.state.data.forEach(item => {
            newDate = new Date(item.EventTime);
            month = month_name(newDate);
            day = newDate.getDate();
            year = newDate.getFullYear();
            finalDate = month + " " + day + ", " + year;
            link = "event/" + item.EventID;
            
            events.push(
                <section key={item.EventID} className={styles.row + " row"}>
                    <div className={styles.date + " col-sm-4"}>
                        {finalDate}
                    </div>
                    <div className={"col-sm-8"}>
                        <h3 class={"text-center"}><Link to={link}>{renderHTML(item.Name)}</Link></h3>
                        <div><h5>Where: {renderHTML(item.Location)}</h5></div>
                    </div>
                </section>
            );
        });
        

        return (
            <div>
                <div className={ styles.scheduleBanner }>
                    <div className={"container " + styles.scheduleInfo}>
                        <h1 className={"text-center"}>Event Schedule</h1>
                        {events}
                    </div>
                </div>
            </div>
        );
    }
}