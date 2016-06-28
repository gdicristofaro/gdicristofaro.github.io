import React from 'react';
import MailIcon from './MailIcon';
import GithubIcon from './GithubIcon';
import MenuIcon from './MenuIcon';
import {Header, imgHeaderHeight} from './Header';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Link, Route, Router} from 'react-router';


const $ = require('jQuery');

// the minimum width before switching to mobile
const minDesktopWidth = 700;
const iconHeight = 30;
export const navBarHeight = 50;
const navTextMargin = 20;


// pages are a series of links
export class NavBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    var that = this;
    this.scrollEvent = function(e) {
      that.setState({"scrollPos" : window.scrollY});
    };
    this.handleToggle = this.handleToggle.bind(this);
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

  // link to main website with name
  getNameLink(opacity, style) {
    return (
      <div style={$.extend({}, style, {opacity: opacity, display: this.getDisplay(opacity)})}>
        <a href="http://www.gdicristofaro.com/">
          <div>
            <h1 style={{textAlign: 'center'}} className="letterhead">Greg DiCristofaro</h1>
          </div>
        </a>
      </div>
    );
  }

  getMobileMenu() {
    var that = this;
    // handles menu close
    var handleClose = function() { that.setState({openDrawer: false}); };

    // map other local pages to menu items
    var pages = this.props.pages.map(function(linkInf, i) {
      var menuStyle = (linkInf.href == that.props.location.pathname) ? {backgroundColor: '#5ACFE3'} : {};
      var innerText = {__html: linkInf.name};
      var onSelect = function() {
        handleClose();
        that.context.router.push(linkInf.href);
      }
      return (
        <MenuItem onTouchTap={onSelect} style={menuStyle} key={i}>
          <span dangerouslySetInnerHTML={innerText}></span>
        </MenuItem>);
    });

    // adds a menu item to the pages to be rendered in sidebar
    const getLinkButton = function(label, href) {
      var funct = function() {
        handleClose();
        window.location = href;
      };
      var innerText = {__html: label};
      pages.push(
        (<MenuItem
          style={{}}
          onTouchTap={funct}
          key={label}
        >
          <span dangerouslySetInnerHTML={innerText}></span>
        </MenuItem>)
      );
    }

    getLinkButton("Email", "mailto: gregdicristofaro@gmail.com");
    getLinkButton("GitHub", "https://github.com/gdicristofaro");

    return (
      <Drawer
        docked={false}
        width={200}
        open={this.state.openDrawer}
        onRequestChange={ this.handleToggle }
      >
        {pages}
      </Drawer>);
  }

  // handles menu toggle
  handleToggle() {
    console.log(this);
    this.setState({openDrawer: !this.state.openDrawer});
  }

  getMobileMenuButton() {
    return (
      <div onClick={this.handleToggle} style={{marginLeft : '20px'}}>
        <MenuIcon style={{height: iconHeight + 'px'}} />
      </div>
    );
  }

  // only display if opacity is greater than 0
  getDisplay(opacity) {
    return (opacity > 0) ? "block" : "none";
  }

  // desktop icons to go to the right
  getDesktopIcons(opacity) {
    return (
      <div style={{opacity: opacity, display: this.getDisplay(opacity), marginRight:  navTextMargin + 'px'}}>
        <a style={{paddingLeft: '10px', paddingRight: '10px'}} href="mailto: gregdicristofaro@gmail.com">
          <MailIcon style={{height: iconHeight + 'px'}}/>
        </a>
        <a href="http://www.github.com/gdicristofaro">
          <GithubIcon style={{height: iconHeight + 'px'}}/>
        </a>
      </div>
    );
  }

  // desktop version containing links for navigation; opacity is always 1
  getNavLinks() {
    var that = this;
    // render pages
    const pages = this.props.pages.map(function(linkInf, i) {
      var linkClass = (linkInf.href == that.props.location.pathname) ? "selected" : "";
      var innerText = {__html: linkInf.name};
      return (<Link
                style={{margin: "0px 15px"}}
                key={i}
                className={linkClass}
                to={linkInf.href}
                dangerouslySetInnerHTML={innerText}>
              </Link>);
    });

    return (
      <div style={{margin: "0px 15px"}}>
        <p className='navigation' style={{textAlign: 'center'}}>{pages}</p>
      </div>
    );
  }

  // retrieves nav bar component given left, center, right component
  getNavBar(left, center, right, extra) {
    const child = {position: 'absolute', top: '50%', transform: 'translateY(-50%)'};
    const parent = {minHeight: navBarHeight + "px", width: '100%'};
    return (
      <div className="navbar" style={parent}>
        {extra}
        <div style={$.extend({padding: '0px', margin: '0px', position: 'relative'}, parent)}>
          <div style={$.extend({}, child, {textAlign: "center", width: '100%'})}>
            {center}
          </div>
          <div style={$.extend({}, child, {left: 0})}>
            {left}
          </div>
          <div style={$.extend({}, child, {right: 0})}>
            {right}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const that = this;
    var scrollPerc = Math.min(1, this.state.scrollPos / imgHeaderHeight);
    var opacity = Math.max(0, ((scrollPerc - .75) * 4));

    return (this.props.mobileView) ?
      this.getNavBar(
        this.getMobileMenuButton(),
        this.getNameLink(opacity),
        null,
        this.getMobileMenu()) :
      this.getNavBar(
        this.getNameLink(opacity, {marginLeft: navTextMargin + 'px'}),
        this.getNavLinks(),
        this.getDesktopIcons(opacity),
        null);
  }
}

NavBar.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

NavBar.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

NavBar.propTypes = {
  location: React.PropTypes.object.isRequired,
};
