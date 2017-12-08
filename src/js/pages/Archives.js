import React from "react";

import Article from "../components/Article";

export default class Archives extends React.Component {
  render() {
    const page = {
      margin: "100px 30px 30px"
    };
    const { query } = this.props.location;
    const { params } = this.props;
    const { article } = params;
    const { date, filter } = query;

    const Articles = [
      "Some Article",
      "Some Other Article",
      "Yet Another Article",
      "Still More",
      "Fake Article",
      "Partial Article",
      "American Article",
      "Mexican Article",
    ].map((title, i) => <Article key={i} title={title}/> );

    return (
      <div style={page}>
        <h1>Calendar</h1>
        article: {article}, date: {date}, filter: {filter}
        <div class="row">{Articles}</div>
      </div>
    );
  }
}
