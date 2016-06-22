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
const iconHeight = 30;
const navBarHeight = 50;

// the minimum width before switching to mobile
const minDesktopWidth = 700;


// pages are a series of links
class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    var that = this;
    this.scrollEvent = function(e) {
      that.setState({"scrollPos" : window.scrollY});
    };

    this.resizeEvent = function(e) {
      that.setState({"windowWidth" : window.innerWidth})
    }

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
      },
      navigation: {
        textAlign: 'center'
      },
      navigationLink: {
        margin: '0px 15px'
      },
      navBarStyle: {
        width: '100%',
        height: navBarHeight + 'px',
        position: 'fixed',
        zIndex: 9999
      },
      navBarChild: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
      }
    };
  }

  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }

  componentWillMount() {
    window.addEventListener('scroll', this.scrollEvent);
    window.addEventListener('resize',this.resizeEvent);
    this.scrollEvent();
    this.resizeEvent();
  }


  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollEvent);
    window.removeEventListener('resize', this.resizeEvent);
  }

  getBigHeader(bigOpacity, upperPadding) {
    return (
      <div style={{opacity: bigOpacity, height: imgHeaderHeight + "px", padding: upperPadding + "px"}}>
        <img style={this.styles.circleIcon} title="A picture of me!" src='circleIcon.png'/>
        <h1 style={this.styles.letterhead}>Greg DiCristofaro</h1>
        <p style={this.styles.letterhead}>
          <a href="http://www.gdicristofaro.com">www.gdicristofaro.com</a> <span style={this.styles.dot}>•</span> <a href="http://www.github.com/gdicristofaro">www.github.com/gdicristofaro</a></p>
        <p style={this.styles.letterhead}><a href="mailto: gregdicristofaro@gmail.com">gregdicristofaro@gmail.com</a></p>
      </div>
    );
  }

  getNameLink(additionalStyle) {
    return (
      <div style={$.extend({}, this.styles.navBarChild, additionalStyle)}>
        <a href="http://www.gdicristofaro.com/">
          <div>
            <h1 style={this.styles.letterhead}>Greg DiCristofaro</h1>
          </div>
        </a>
      </div>
    );
  }

  getDesktopNavBar(littleOpacity, navBarTop) {
    var that = this;
    const pages = this.props.pages.map(function(linkInf, i) {
      var linkClass = (linkInf.href == that.props.location.pathname) ? "selected" : "";
      var innerText = {__html: linkInf.name};
      return (<Link
                style={that.styles.navigationLink}
                key={i}
                className={linkClass}
                to={linkInf.href}
                dangerouslySetInnerHTML={innerText}>
              </Link>);
    });

    return (
      <div style={$.extend({}, this.styles.navBarStyle, {top: navBarTop})} className='navbar'>
        {this.getNameLink({opacity: littleOpacity,  left: '20px'})}

        {/* navigation */}
        <div style={$.extend({}, this.styles.navBarChild, {left: '50%', transform: 'translate(-50%,-50%)'})}>
          <p className='navigation' style={this.styles.navigation}>{pages}</p>
        </div>

        {/* social links */}
        <div style={$.extend({}, this.styles.navBarChild, {opacity: littleOpacity,  right: '20px'})}>
          <a style={{paddingLeft: '10px', paddingRight: '10px'}} href="mailto: gregdicristofaro@gmail.com"><MailIcon style={{height: iconHeight + 'px'}}/></a>
          <a href="http://www.github.com/gdicristofaro"><GithubIcon style={{height: iconHeight + 'px'}}/></a>
        </div>
      </div>
    );
  }

  getMobileNavBar(littleOpacity, navBarTop) {
    var that = this;

    //
    var handleToggle = function() {
      that.setState({openDrawer: !that.state.openDrawer});
    };
    var handleClose = function() {
      that.setState({openDrawer: false});
    };


    var pages = this.props.pages.map(function(linkInf, i) {
      var menuStyle = (linkInf.href == that.props.location.pathname) ? {backgroundColor: '#5ACFE3'} : {};
      var innerText = {__html: linkInf.name};
      var onSelect = function() {
        handleClose();
        that.context.router.push(linkInf.href);
      }
      return (
        <MenuItem onTouchTap={onSelect} style={menuStyle} key={i}>
          <p dangerouslySetInnerHTML={innerText}></p>
        </MenuItem>);
    });

    var emailFunct = function() {
      handleClose();
      window.location = "mailto: gregdicristofaro@gmail.com";
    };

    pages.push(
      (<MenuItem onTouchTap={emailFunct} key={"EmailLink"}>Email</MenuItem>)
    );

    var githubFunct = function() {
      handleClose();
      window.location = "https://github.com/gdicristofaro";
    };

    pages.push(
      (<MenuItem onTouchTap={githubFunct} key={"GithubLink"}>GitHub</MenuItem>)
    );

    return (
      <div style={$.extend({}, this.styles.navBarStyle, {top: navBarTop})} className='mobileNavbar'>
        <div onClick={handleToggle} style={$.extend({}, this.styles.navBarChild, {left: '20px'})}>
          <MenuIcon style={{height: iconHeight + 'px'}} />
        </div>
        {this.getNameLink({opacity: littleOpacity, left: '50%', transform: 'translate(-50%,-50%)'})}
        <Drawer
          docked={false}
          width={200}
          open={this.state.openDrawer}
          onRequestChange={ handleToggle }
        >
          {pages}
        </Drawer>
      </div>
    );
  }

  getNavBar(littleOpacity, navBarTop, isMobile) {
    return (isMobile) ?
      this.getMobileNavBar(littleOpacity, navBarTop) :
      this.getDesktopNavBar(littleOpacity, navBarTop);
  }


  render() {
    const that = this;
    var isMobile = this.state.windowWidth < minDesktopWidth;

    var scrollPerc = Math.min(1, this.state.scrollPos / imgHeaderHeight);

    var littleOpacity = Math.max(0, ((scrollPerc - .75) * 4));
    var bigOpacity = 1 - scrollPerc;
    var bigPadding = (isMobile) ? navBarHeight + 10 : 10;
    var navBarTop = (isMobile) ? 0 : Math.max(0, imgHeaderHeight - this.state.scrollPos) + "px";

    return (
      <div className='header' style={$.extend({}, this.styles.header, {height: (imgHeaderHeight + navBarHeight) + "px"})}>
        {this.getBigHeader(bigOpacity, bigPadding)}
        {this.getNavBar(littleOpacity, navBarTop, isMobile)}
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
