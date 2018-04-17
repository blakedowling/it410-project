import React from "react";

export default class Footer extends React.Component {
  render() {
    const footer = {
      backgroundColor: "#83BBEA",
      color: "#fff",
      padding: "15px",
      marginRight: '0',
      marginLeft: '0'
    };
    const footerH3 = {
      fontSize: '12pt',
      letterSpacing: '.5px',
      marginTop: '15px'
    };
    
    return (
      <footer class="row" style={footer}>
          <h3 style={ footerH3 }>© 2011 WEDDING SNAPS</h3>
      </footer>
    );
  }
}
