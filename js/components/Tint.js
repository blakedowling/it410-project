import React from "react";
import styles from'./tint.css';

export default class Tint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    componentDidMount() {
        // const script = document.createElement("script");
        // script.src = "https://cdn.hypemarks.com/pages/a5b5e5.js";
        // script.async = true;
        // var tintup = document.querySelectorAll('.tintup');
        // var tintContainer = tintup[0].parentElement;
        // tintContainer.appendChild(script);
        // console.log(script);
        $(document).ready(function() {
          $('section').append('<script src="https://cdn.hypemarks.com/pages/a5b5e5.js" async></script>');
          $('section').append('<div class="tintup" data-id="byu-sports-camps" data-columns="" data-expand="true" data-mobilescroll="true" data-infinitescroll="true" data-personalization-id="875963"></div>');
            
        });
        console.log('tint props');
    }
    // componentWillUnmount() {
    //     var tintup = document.querySelectorAll('.tintup');
    //     var tintContainer = tintup[0].parentElement;
    //     tintContainer.removeChild(tintContainer.childNodes[1]);
    // }
    render() {
        return (
            <div className={ styles.noPadding+ ' container' }>
                <h3 className={ 'col-md-12 ' + styles.heading }>Social Media Feed</h3>
                <section className={ styles.tintContainer }>
                    
                </section>
            </div>
        );
    }
}

