import React from "react";

export default class Spinner extends React.Component {
  render() {
      const spinner = {
          position: 'absolute',
          width: '100%',
          textAlign: 'center',
          fontSize: '24pt',
          color: 'white',
          marginTop: '-118px'
      };
    return (
        <div style={spinner}>
            <i className="fa fa-spinner fa-spin" /><span> Loading...</span>
        </div>
    );
  }
}