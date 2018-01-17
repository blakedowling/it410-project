import React from "react";
import styles from "./sports.css";
import { Link } from 'react-router';
import Equality from "../components/Equality";
import Ads from "../components/Ads";
import YBA from "../components/YBA";
import axios from 'axios';
import renderHTML from 'react-render-html';

export default class Sports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataThere: false,
            sport: '',
            image: ''
        };
    }
    
    mountOrUpdate() {
        var title = this.props.params.sport.replace(/-/g, ' ');
        title = title.replace(/\b[a-z]/g,function(f){return f.toUpperCase();}) + ' | BYU Sports Camps';
        document.title = title;
        var URL = "https://byucougars.com/dl/feeds/allcampspersport/" + this.props.params.sportid;
        var th = this;
        this.serverRequest = axios.get(URL)
            .then(function(response) {
                th.setState({
                    data: response.data,
                    dataThere: true
                });
        }.bind(this))
        .catch(function(error) {
            console.log(error);
        });
        this.serverRequest = axios.get("https://byucougars.com/dl/feeds/sports-camps/" + this.props.params.sportid)
            .then(function(response) {
                const data = response.data[0];
                th.setState({
                    sport: data.name,
                    image: data.field_scimage
                });
        }.bind(this))
        .catch(function(error) {
            console.log(error);
        });
    }
    componentDidMount() {
        this.mountOrUpdate();
    }
    componentWillReceiveProps(nextProps) {
        this.mountOrUpdate();
    }

    render() {
        var camps = [];
        var link;
        var urlTitle;
        var date;
        var end_date;
        if(this.state.dataThere) {
            if(this.state.data.length != 0) {
                this.state.data.forEach(item => {
                    urlTitle = item.title.replace(/ /g, '-').toLowerCase();
                    link = 'camps/' + urlTitle + '/' + item.nid;
                    
                    if(item.field_end_date == '') {
                        date = <h3>{item.field_event_date}</h3>;
                    } else {
                        var start = item.field_event_date.split(',');
                        start = start[0];
                        if(item.field_event_date.substring(0,3) == item.field_end_date.substring(0,3)) {
                            end_date = item.field_end_date.substr(item.field_end_date.indexOf(' ')+1);
                        } else {
                            end_date = item.field_end_date;
                        }
                        date = <h3>{start}-{end_date}</h3>;
                    }
                    
                    camps.push(
                        <div key={item.nid} className={ "col-sm-12 col-md-6 col-lg-4 " + styles.individualCamp }>
                            <div>
                                <h2><Link to={link}>{renderHTML(item.title)}</Link></h2>
                                {date}
                                <h3>{item.field_age_restriction}</h3>
                                <h3>{item.field_price}</h3>
                                <p className={styles.learnMoreButton}><Link to={link}>Learn More</Link></p>
                            </div>
                        </div>
                    );
                    
                });
            } else {
                camps.push(
                    <h2 key={1} className={styles.noCamps}>There are currently no camps open for {this.props.params.sport}</h2>
                );
            }
        }
        
        // const { query } = this.props.location;
        const { params } = this.props;
        const { sport } = params;
        // const { alt } = 'BYU Sports Camps - ' + this.state.sport;
        
        return (
            <div>
                <div>
                    <img className={ styles.campImg } src={this.state.image} alt={ this.state.sport } />
                </div>
                <YBA/>
                <div className={ "container-fluid " + styles.campsContainer }>
                    <div className={ styles.row + " row" }>
                        {camps}
                    </div>
                </div>
                <Equality/>
                <Ads/>
            </div>
        );
    }
}