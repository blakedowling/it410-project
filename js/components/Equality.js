import React from "react";

export default class Equality extends React.Component {
  render() {
     const equal = {
        color: 'black',
        margin: '15px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic'
    };
    return (
        <p style={equal}>
            BYU Sports Camps are open to any and all entrants, 
            limited only by age, gender, and space in the camp.
        </p>
    );
  }
}