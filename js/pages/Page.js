import React from "react";
import styles from "./page.css";
import Ads from "../components/Ads";
import axios from 'axios';
import renderHTML from 'react-render-html';
// import { findDOMNode } from ‘react-dom’;
// import $ from 'jquery';


export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        };
    }
    
    mountOrUpdate() {
        var th = this;
        var URL = "https://byucougars.com/dl/feeds/sc-basic-page/" + this.props.params.pageid;
        // console.log(this.props.params);
        // const paramsURL = "#/page/" + this.props.params.title + "/" + this.props.params.pageid;
        // console.log(paramsURL);
        // const windowURL = window.location.hash.substring(0, window.location.hash.length-10);
        // console.log(windowURL);
        // if(paramsURL != windowURL) {
        //     this.props.history.push(windowURL);
        // }
        this.serverRequest = axios.get(URL)
            .then(function(response) {
                const data = response.data[0];
                th.setState({
                    title: data.title,
                    body: data.body
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
        this.mountOrUpdate();
    }
    
    redirectRegister() {
        this.props.history.push("page/registration/1282926");
    }
    
    render() {
        return (
            <div>
                <div className={styles.pageBanner}>
                    <div className={"container " + styles.pageInfo}>
                        <h1 className={"text-center"}>{ this.state.title }</h1>
                        <div>{renderHTML(this.state.body)}</div>
                    </div>
                </div>
                <Ads/>
            </div>
        );
    }
}
$(document).ready(function() {
    // click function for all content - loaded statically and dynamically
    $(document).on("click", ".basic-page-href", function(e) {
        e.preventDefault();
        var location = window.location.hash;
        // gets count of #'s in the url
        var hashes = (location.match(/#/g) || []).length;
        // if there are multiple #'s then this removes the second one and everything after it
        if(hashes > 1) {
            var count = 0;
            for(var i=0; i < window.location.hash.length; i++) {
                if(window.location.hash[i] == "#") {
                    count++;
                    if(count == 2) {
                        window.location.hash = location.substring(0, i);
                        break;
                    }
                }
            }
        }
        // changes the location.hash and manually scrolls to corresponding html element w/ID
        window.location.hash = window.location.hash + $(this).attr('href');
        $('html, body').animate({
            scrollTop: $( $(this).attr('href') ).offset().top - 80
        }, 1000);
    });
    
    $(document).on("click", ".redirect-register", function(e) {
        e.preventDefault();
        // Page.redirectRegister();
        // console.log(Page);
        // Page.this.props.history.push("page/registration/1282926");
    });
});



