import React from 'react';
import MailIcon from './MailIcon';
import GithubIcon from './GithubIcon';
import MenuIcon from './MenuIcon';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Link, Route, Router} from 'react-router';


const $ = require('jQuery');


export const imgHeaderHeight = 300;

// pages are a series of links
class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    var that = this;
    this.scrollEvent = function(e) {
      that.setState({"scrollPos" : window.scrollY});
    };

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

  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }

  componentWillMount() {
    window.addEventListener('scroll', this.scrollEvent);
    this.scrollEvent();
  }


  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollEvent);
  }

  // gets very upper header that disappears on scroll
  render() {

    const that = this;
    var opacity = 1 - Math.min(1, this.state.scrollPos / imgHeaderHeight);

    return (
      <div className='header'>
        <div style={{opacity: opacity, margin: "0px", padding: "0px", height: imgHeaderHeight + "px"}}>
        <img style={this.styles.circleIcon} title="A picture of me!" src='circleIcon.png'/>
        <h1 style={this.styles.letterhead}>Greg DiCristofaro</h1>
        <p style={this.styles.letterhead}>
          <a href="http://www.gdicristofaro.com">www.gdicristofaro.com</a> <span style={this.styles.dot}>•</span> <a href="http://www.github.com/gdicristofaro">www.github.com/gdicristofaro</a></p>
        <p style={this.styles.letterhead}><a href="mailto: gregdicristofaro@gmail.com">gregdicristofaro@gmail.com</a></p>
        </div>
      </div>
    );
  }
}

Header.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

Header.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

Header.propTypes = {
  location: React.PropTypes.object.isRequired,
};


export default Header
