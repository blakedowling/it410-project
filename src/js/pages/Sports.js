import React from "react";
import styles from "./sports.css";
import { Link } from 'react-router';
import DemoCarousel from "../components/Carousel";
import Ads from "../components/Ads";
import axios from 'axios';
import renderHTML from 'react-render-html';

export default class Sports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    
    mountOrUpdate() {
        // console.log(this.props);
        var URL = "https://byucougars.com/dl/feeds/allcampspersport/" + this.props.params.sportid;
        var th = this;
        this.serverRequest = axios.get(URL)
            .then(function(response) {
                console.log(response.data);
                th.setState({
                    data: response.data
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    componentDidMount() {
        this.mountOrUpdate();
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.params.sportid == nextProps.params.sportid) {
            console.log('props changing');
            this.mountOrUpdate();
        }
        
    }
    componentWillUnmount() {
        console.log('unmounting ' + this.serverRequest);
        this.serverRequest.abort();
    }

    render() {
        var camps = [];
        var link;
        if(this.state.data.length != 0) {
            this.state.data.forEach(item => {
                link = 'camps/' + item.nid;
                camps.push(
                    <div key={item.nid} className={ "col-xs-12 col-md-6 col-lg-4 " + styles.individualCamp }>
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
            // console.log('length is zero');
            camps.push(
                <h2 className={styles.noCamps}>There are currently no camps open for {this.props.params.sport}</h2>
            );
        }
        // const { query } = this.props.location;
        const { params } = this.props;
        const { sport } = params;
        
    return (
        <div>
            <DemoCarousel/>
            <Ads/>
            <div className={ "container-fluid" }>
                <div className={ "row" }>
                    {camps}
                </div>
            </div>
        </div>
    );
  }
}