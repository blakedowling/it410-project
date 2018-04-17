import React from "react";
import styles from "./create.css";
import { Link } from "react-router";
import axios from 'axios';
import renderHTML from 'react-render-html';

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      body: ''
    };
  }
      
  componentDidMount() {
    document.title = "Create Event";
  }
  
  render() {
    return (
      <div>
        <div className={styles.pageBanner}>
          <div className={"container " + styles.pageInfo}>
            <h1 className={"text-center " + styles.pageTitle}>Create Wedding</h1>
            <div>
              <form className={styles.form} method="post" action="/createEvent">
                Event Name:<br/>
                <input type="text" name="name" placeholder="Event Name"/>
                <br/>
                Location:<br/>
                <input type="text" name="venue" placeholder="Location"/>
                <br/>
                When (date and time):<br/>
                <input type="datetime-local" name="date"/>
                <br/><br/>
                <input type="submit" value="Submit"/>
              </form>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}
