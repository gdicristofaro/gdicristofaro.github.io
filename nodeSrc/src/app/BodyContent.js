import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';

import {NavBarDesktop} from './NavBarDesktop';
import {NavBarMobile} from './NavBarMobile';
import {NavBarHeight, MinDesktopWidth} from './NavBarCommon';
import Header, {HeaderHeight} from './Header';
import Main from './Main';
import { Footer, footerHeight } from './Footer';
import Home from './Home'
import Projects from './Projects'
import Resume from './Resume'
import MobileDrawer from './MobileDrawer'
import MenuItem from 'material-ui/MenuItem';
import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const $ = require('jQuery');


export var myPages = [];
myPages['Home'] =
  {pagetitle: "Greg DiCristofaro",
  name: "Home",
  href: "/",
  content: (<Home/>)};
myPages['Projects'] =
  {pagetitle: "Greg DiCristofaro - Projects",
  name: "Projects",
  href: "/projects",
  content: (<Projects/>)};
myPages['Resume'] =
  {pagetitle: "Greg DiCristofaro - Resum&eacute;",
  name: "Resum&eacute;",
  href: "/resume",
  content: (<Resume/>)};

export var indexedPages = [myPages['Home'], myPages['Projects'], myPages['Resume']];

export default class BodyContent extends React.Component {
  constructor(props, context) {
    super(props, context);
    var that = this;
    this.state = {mobileDrawerOpen : false, isScrolled: false};
    this.resizeEvent = function(e) {
      that.setState({"windowWidth" : window.innerWidth, "windowHeight": window.innerHeight})
    }

    this.scrollEvent = function(e) {
      var y = $(window).scrollTop();
      that.setState({scrollY: y});
    };
  }

  componentWillMount() {
    window.addEventListener('resize',this.resizeEvent);
    window.addEventListener('scroll', this.scrollEvent);
    this.scrollEvent();
    this.resizeEvent();
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEvent);
    window.removeEventListener('scroll', this.scrollEvent);
  }

  render () {
    const that = this;
    const mobileView = this.state.windowWidth < MinDesktopWidth;
    const bodyHeight = (this.state.windowHeight - NavBarHeight - footerHeight);
    var isMobileWidth = this.state.windowWidth < MinDesktopWidth;

    var headerShownPercent = Math.min(1, Math.max(0, this.state.scrollY / HeaderHeight));
    var navBarOpacity = ((headerShownPercent - .75) * 4);
    var headerOpacity = 1 - headerShownPercent;
 
    // spacer for content so that it doesn't hide behind header
    var headerShift =  Math.max(-this.state.scrollY, -HeaderHeight);



    const main = (
      <div
        className="main"
        style={{minHeight: bodyHeight + "px"}}
      >
        <ReactCSSTransitionGroup
          component="div"
          transitionName="pagetransition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {React.cloneElement(this.props.children, {
            key: this.props.location.pathname
          })}
        </ReactCSSTransitionGroup>
      </div>);


    var drawer = null;
    var navbar;
    if (isMobileWidth) {
      // sets position to requested
      var mobileDrawerSetter = function(toOpen) { that.setState({mobileDrawerOpen: toOpen}); };
      var mobileDrawerToggler = function() { mobileDrawerSetter(!that.state.mobileDrawerOpen); };

      drawer = (
        <MobileDrawer
          pages={indexedPages}
          mobileView={mobileView}
          location={this.props.location}
          setterFunct={mobileDrawerSetter}
          open={this.state.mobileDrawerOpen}
        />);

      navbar = (
        <NavBarMobile
          handleToggle={mobileDrawerToggler}
          pages={indexedPages}
          opacity={navBarOpacity}
          location={this.props.location}
        />);
    }
    else {
      navbar = (
        <NavBarDesktop
          pages={indexedPages}
          opacity={navBarOpacity}
          location={this.props.location}
        />
      )
    }

    return (
      <div
        className='bodycontent'
        style={{padding: '0px', margin: '0px', height: '100%', position: 'relative'}}
      >
        {drawer}
        <div style={{position: 'fixed', width: '100%', top: headerShift+'px', zIndex: '999'}}>
          <Header
            pages={indexedPages}
            location={this.props.location}
            opacity={headerOpacity}
          >
            {navbar}
          </Header>
        </div>
        <div style={{height: (HeaderHeight + NavBarHeight) + 'px'}}></div>
        {main}
        <Footer/>
      </div>
    );
  }

  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }
}

BodyContent.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

BodyContent.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object
};
