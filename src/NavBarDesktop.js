import React from 'react';
import MailIcon from './MailIcon';
import GithubIcon from './GithubIcon';
import NavBarCommon, {IconHeight, MailWidth, GithubWidth, NavTextMargin, NavBarHeight} from './NavBarCommon';

import {NavLink} from 'react-router-dom';

// pages are a series of links
export class NavBarDesktop extends React.Component {
  // desktop icons to go to the right
  getIcons(opacity) {
    var visibility = (opacity <= 0) ? "hidden" : "visible";
    return (
      <div
        style={{opacity: opacity, visibility: visibility, height: IconHeight + 'px', padding: "0px", marginTop: "auto", marginBottom: "auto", marginRight:  NavTextMargin + 'px'}}
      >
        <a style={{marginLeft: '10px', marginRight: '10px'}} href="mailto:gregdicristofaro@gmail.com">
          <MailIcon style={{height: IconHeight + 'px', width: MailWidth + 'px'}}/>
        </a>
        <a href="http://www.github.com/gdicristofaro">
          <GithubIcon style={{height: IconHeight + 'px', width: GithubWidth + 'px'}}/>
        </a>
      </div>
    );
  }

  // desktop version containing links for navigation; opacity is always 1
  getNavLinks() {
    // render pages
    const pages = this.props.pages.map(function(linkInf, i) {
      //var linkClass = (linkInf.href == that.props.location.pathname) ? "selected" : "";
      var innerText = {__html: linkInf.name};
      return (<NavLink
                exact={true}
                style={{margin: "auto 15px"}}
                key={i}
                activeClassName="selected"
                to={linkInf.href}
                dangerouslySetInnerHTML={innerText}>
              </NavLink>);
    });

    return (
      <div style={{margin: "0px 15px"}}>
        <p className='navigation' style={{lineHeight: NavBarHeight + "px", textAlign: 'center'}}>{pages}</p>
      </div>
    );
  }

  render() {
    var opacity = this.props.opacity;

    return NavBarCommon.getNavBar(
      NavBarCommon.getNameLink(opacity, {marginLeft: NavTextMargin + 'px'}),
      this.getNavLinks(),
      this.getIcons(opacity));
  }
}