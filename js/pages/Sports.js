import React from "react";
import styles from "./sports.css";
import { Link } from 'react-router';
import Spinner from "../components/Spinner";
import axios from 'axios';
import renderHTML from 'react-render-html';

export default class Sports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            dataThere: false,
            sport: '',
            image: '',
            letter: ''
        };
    }
    
    mountOrUpdate(params) {
        var title = params.sport.replace(/-/g, ' ');
        title = title.replace(/\b[a-z]/g,function(f){return f.toUpperCase();}) + ' | BYU Sports Camps';
        document.title = title;
        var URL = "https://byucougars.com/dl/feeds/allcampspersport/" + params.sportid;
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
        this.setState({ loading: true }, () => {
            this.serverRequest = axios.get("https://byucougars.com/dl/feeds/sports-camps/" + params.sportid)
            .then(function(response) {
                const data = response.data[0];
                th.setState({
                    loading: false,
                    sport: data.name,
                    image: data.field_scimage,
                    letter: data.field_sport_letter
                });
            }.bind(this))
            .catch(function(error) {
                console.log(error);
            });
        });
    }
    componentDidMount() {
        this.mountOrUpdate(this.props.params);
    }
    componentWillReceiveProps(nextProps) {
        this.mountOrUpdate(nextProps.params);
    }

    render() {
        var camps = [];
        var letter;
        var link;
        var urlTitle;
        
        
        // var date;
        // var end_date;
        if(this.state.dataThere) {
            if(this.state.data.length != 0) {
                this.state.data.forEach(item => {
                    // console.log(item);
                    var tempStartDates = [];
                    var tempEndDates;
                    var startDate;
                    var endDate = [];
                    var date = [];
        
                    urlTitle = item.title.replace(/ /g, '-').toLowerCase();
                    link = 'camps/' + urlTitle + '/' + item.nid;
                    
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
                            date.push( <h3 key={Date.parse(tempStartDates[k])}>{tempStartDates[k]}</h3> );
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
                            date.push( <h3 key={Date.parse(startDate)}>{startDate}-{endDate}</h3> );
                        }
                    }
                    
                    // if(item.field_end_date == '') {
                    //     date = <h3>{item.field_event_date}</h3>;
                    // } else {
                    //     var start = item.field_event_date.split(',');
                    //     start = start[0];
                    //     if(item.field_event_date.substring(0,3) == item.field_end_date.substring(0,3)) {
                    //         end_date = item.field_end_date.substr(item.field_end_date.indexOf(' ')+1);
                    //     } else {
                    //         end_date = item.field_end_date;
                    //     }
                    //     date = <h3>{start}-{end_date}</h3>;
                    // }
                    
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
                if (this.state.letter != '') {
                    letter = 
                    <div className={ "col-sm-12 col-md-12 col-lg-8 " + styles.letter }>
                        { renderHTML(this.state.letter) }
                    </div>
                    ;
                }
                
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
                    {this.state.loading && 
                        <Spinner/>
                    }
                </div>
                <div className={ "container-fluid " + styles.campsContainer }>
                    
                    <div className={ styles.row + " row" }>
                        {letter}
                        {camps}
                    </div>
                    
                </div>
            </div>
        );
    }
}