import React from "react";
import { Link } from "react-router";


export default class Footer extends React.Component {
  render() {
    const footer = {
      backgroundColor: "#032D58",
      color: "#fff",
      padding: "15px",
      marginRight: '0',
      marginLeft: '0'
    };
    const footerH3 = {
      fontSize: '12pt',
      color: '#CCC',
      letterSpacing: '.5px',
      marginTop: '15px'
    };
    const footerP = {
      fontSize: '10pt',
      margin: '1em 0 2em'
    };
    const footerPA = {
      textDecoration: 'underline',
      color: '#fff'
      
    };
    const copyrightDiv = {
      textAlign: 'center'
    };
    const footerLogos = {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    };
    
    return (
      <footer class="row" style={footer}>
            <div class="col-xs-12 col-md-12" style={copyrightDiv}>
                <img height="100" src="media/images/BYUlogo_stroke400.png" alt="BYU Logo"/>
                <h3 style={ footerH3 }>© 2011 BYU ATHLETICS. All Rights Reserved.<br/>331 SAB • Provo, UT 84602 | 801.422.2096</h3>
                <p style={ footerP }>
                    <Link style={footerPA} to="page/copyright/1282951">Copyright</Link> | <Link style={footerPA} to="page/privacy-policy/1282950">Privacy Policy</Link> | <Link style={footerPA} to="page/terms-of-use/1282952">Terms of Use</Link> | <Link style={footerPA} to="page/contact/1282928">Contact Us</Link> | <a style={footerPA} href="#">Feedback</a>
                </p>
            </div>
            
            <div className="container" style={footerLogos}>
                    <a href="http://www.espn.go.com"><img src="media/images/footer_espn_logo.png" class="img-responsive" alt="ESPN Logo"/></a>
                    <a href="http://www.byutv.org"><img src="media/images/footer_byu_tv_logo.png" class="img-responsive" alt="BYU TV Logo"/></a>
                    <a href="http://www.ksl.com/index.php?nid=774"><img src="media/images/footer_ksl_radio.png" class="img-responsive" alt="KSL Radio Logo"/></a>
                    <a href="http://www.wccsports.com"><img src="media/images/footer_wcc_logo.png" class="img-responsive" alt="WCC Logo"/></a>
                    <a href="http://www.byu.edu"><img src="media/images/footer_byu_edu.png" class="img-responsive" alt="BYU School Logo"/></a>
                    <a href="http://www.lds.org"><img src="media/images/footer_lds_church.png" class="img-responsive" alt="LDS Church"/></a>
            </div>
        </footer>
    );
  }
}
