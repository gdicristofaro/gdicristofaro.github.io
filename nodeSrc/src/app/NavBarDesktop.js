import React from 'react';
import MailIcon from './MailIcon';
import GithubIcon from './GithubIcon';
import MenuIcon from './MenuIcon';
import {Header, imgHeaderHeight} from './Header';
import NavBarCommon, {IconHeight, NavTextMargin} from './NavBarCommon';

import {Link, Route, Router} from 'react-router';

const $ = require('jQuery');

// pages are a series of links
export class NavBarDesktop extends React.Component {
  // desktop icons to go to the right
  getIcons(opacity) {
    return (
      <div
        className="opacityTransitionable"
        style={{opacity: opacity, marginRight:  NavTextMargin + 'px'}}
      >
        <a style={{paddingLeft: '10px', paddingRight: '10px'}} href="mailto: gregdicristofaro@gmail.com">
          <MailIcon style={{height: IconHeight + 'px'}}/>
        </a>
        <a href="http://www.github.com/gdicristofaro">
          <GithubIcon style={{height: IconHeight + 'px'}}/>
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

  render() {
    const that = this;
    var opacity = (this.props.isScrolled) ? 1 : 0;

    return NavBarCommon.getNavBar(
      NavBarCommon.getNameLink(opacity, {marginLeft: NavTextMargin + 'px'}),
      this.getNavLinks(),
      this.getIcons(opacity));
  }
}

NavBarDesktop.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
