import React from 'react';

export const HeaderHeight = 300;

// pages are a series of links
export default class Header extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.styles = {
      header: {
        //position: 'fixed',
        width: '100%'
      },
      circleIcon: {
        height: '200px',
        margin: '0px auto',
        display: 'block'
      },
      dot: {
        fontSize: '75%'
      },
      letterhead: {
        margin: '0px',
        textAlign: 'center',
        lineHeight: 1.5
      }
    };
  }

  // gets very upper header that disappears on scroll
  render() {
    var opacity = this.props.opacity;

    return (
      <div className="header" style={{margin: "0px", padding: "0px"}}>
        <div style={{opacity: opacity, height: HeaderHeight}}>
          <img style={this.styles.circleIcon} alt="a circle of me" title="A picture of me!" src='img/circleIcon.png'/>
          <h1 style={this.styles.letterhead}>Greg DiCristofaro</h1>
          <p style={this.styles.letterhead}>
            <a href="http://www.gdicristofaro.com">www.gdicristofaro.com</a> <span style={this.styles.dot}>•</span> <a href="http://www.github.com/gdicristofaro">www.github.com/gdicristofaro</a></p>
          <p style={this.styles.letterhead}><a href="mailto:gregdicristofaro@gmail.com">gregdicristofaro@gmail.com</a></p>
        </div>
        {this.props.children}
      </div>
    );
  }
}
