import React from "react";

export default class YBA extends React.Component {
  render() {
     const yba = {
        // fontSize: '20pt',
        fontFamily: 'serif',
        margin: '20px',
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    };
    return (
        <h4 style={yba}>
            BYU Sports Camps Presented by YBA Shirts
        </h4>
    );
  }
}