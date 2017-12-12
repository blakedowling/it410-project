import React from "react";
import styles from "./page.css";
import Ads from "../components/Ads";
import axios from 'axios';
import renderHTML from 'react-render-html';


export default class Registration extends React.Component {
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



