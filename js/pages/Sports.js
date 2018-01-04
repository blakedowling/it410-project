import React from "react";
import styles from "./sports.css";
import { Link } from 'react-router';
// import DemoCarousel from "../components/Carousel";
import Equality from "../components/Equality";
import Ads from "../components/Ads";
import axios from 'axios';
import renderHTML from 'react-render-html';

export default class Sports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataThere: false
        };
    }
    
    mountOrUpdate() {
        document.title = this.props.params.sport + ' Camps | BYU Sports Camps';
        var URL = "https://byucougars.com/dl/feeds/allcampspersport/" + this.props.params.sportid;
        var th = this;
        // console.log(this.props);
        this.serverRequest = axios.get(URL)
            .then(function(response) {
                th.setState({
                    data: response.data,
                    dataThere: true
                });
            // console.log(th.state.data);
        }.bind(this))
        .catch(function(error) {
            console.log(error);
        });
    }
    componentDidMount() {
        this.mountOrUpdate();
    }
    componentWillReceiveProps(nextProps) {
        // this.setState({ dataThere: false });
        this.mountOrUpdate();
    }

    render() {
        var camps = [];
        var link;
        var urlTitle;
        if(this.state.dataThere) {
            if(this.state.data.length != 0) {
                this.state.data.forEach(item => {
                    urlTitle = item.title.replace(/ /g, '-');
                    console.log(urlTitle);
                    link = 'camps/' + urlTitle + '/' + item.nid;
                    camps.push(
                        <div key={item.nid} className={ "col-sm-12 col-md-6 col-lg-4 " + styles.individualCamp }>
                            <div>
                                <h2><Link to={link}>{renderHTML(item.title)}</Link></h2>
                                <h3>{renderHTML(item.field_event_date)}</h3>
                                <h3>{item.field_age_restriction}</h3>
                                <h3>{item.field_price}</h3>
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
        
    return (
        <div>
            <div>
                <img className={ styles.campImg } src="media/images/17mbball_wallpaper (1).jpg" />
            </div>
            <div className={ "container-fluid" }>
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