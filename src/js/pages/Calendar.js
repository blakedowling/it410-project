import React from "react";
import styles from "./calendar.css";
import { Link } from 'react-router';
import Ads from "../components/Ads";
import axios from 'axios';
import renderHTML from 'react-render-html';

export default class Camps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    
    componentDidMount() {
        var th = this;
        var URL = "https://byucougars.com/dl/feeds/sc-schedule";
        this.serverRequest = axios.get(URL).then(function(response) {
            // const data = response.data[0];
            console.log(response);
            th.setState({
                data: response.data
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
        var camps = [];
        var link;
        this.state.data.forEach(item => {
            link = 'camps/' + item.nid;
            camps.push(
                <section key={item.nid} className={styles.row + " row"}>
                    <div className={styles.date + " col-sm-3"}>
                        <h5>{item.field_event_date}</h5>
                    </div>
                    <div className={"col-sm-6"}>
                        <h3 class={"text-center"}><Link to={link}>{renderHTML(item.title)}</Link></h3>
                        <div><h5>Who: {item.field_age_restriction}</h5></div>
                        <div><h5>Price: {item.field_price}</h5></div>
                    </div>
                    <div className={styles.register + " col-sm-3"}>
                        <h5><a href={item.field_registration_url}>Register</a></h5>
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
                            <select name="months" className={styles.months}>
                                <option value="">-------Filter by Month-------</option>
                                <option value="Jan">January</option>
                                <option value="Feb">February</option>
                                <option value="Mar">March</option>
                                <option value="Apr">April</option>
                                <option value="May">May</option>
                                <option value="Jun">June</option>
                                <option value="Jul">July</option>
                                <option value="Aug">August</option>
                                <option value="Sep">September</option>
                                <option value="Oct">October</option>
                                <option value="Nov">November</option>
                                <option value="Dec">December</option>
                            </select>
                            <span className={styles.apply + " btn-raised btn btn-default"}>Apply</span>
                            <span className={styles.apply + " btn-raised btn btn-default"} >Clear</span>
                        </div>
                        {camps}
                    </div>
                </div>
                <Ads/>
            </div>
        );
    }
}