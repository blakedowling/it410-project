import React from "react";
import styles from "./event.css";
import axios from 'axios';
import renderHTML from 'react-render-html';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-112638651-1');


export default class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            venue: '',
            body: '',
            image: '',
        };
    }
    
    componentDidMount() {
        console.log(this.props.params);
        // var title = this.props.params.camp.replace(/-/g, ' ');
        // title = title.replace(/byu/, 'BYU');
        // title = title.replace(/\b[a-z]/g,function(f){return f.toUpperCase();}) + ' | BYU Sports Camps';
        // document.title = title;
        var th = this;
        var URL = "/event/" + this.props.params.id;
        this.serverRequest = axios.get(URL).then(function(response) {
            console.log(response);
            th.setState({
                title: response.data.Name,
                date: response.data.EventTime,
                venue: response.data.Location,
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    
    
    render() {
        var month_name = function(dt){
            var mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
            return mlist[dt.getMonth()];
        };
        // const imageURL = 'url(' + this.state.image + ')';
        // var register;
        var newDate = new Date(this.state.date);
        var month = month_name(newDate);
        var day = newDate.getDate();
        var year = newDate.getFullYear();
        var finalDate = month + " " + day + ", " + year;
        
        
            
        
        return (
            <div>
                <div className={styles.campBanner}>
                    <div className={"container " + styles.campInfo}>
                        <h1 className={"text-center"}>{renderHTML(this.state.title)}</h1>
                        <div className={ styles.whenWhoPrice}>
                            <div><h4>When:</h4>{finalDate}</div>
                            <div><h4>Where:</h4><h6>{this.state.venue}</h6></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}