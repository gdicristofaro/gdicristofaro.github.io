import React from 'react';
import MailIcon from './MailIcon';
import GithubIcon from './GithubIcon';
import MenuIcon from './MenuIcon';
import {Header, imgHeaderHeight} from './Header';
import NavBarCommon, {IconHeight, NavTextMargin, MobileWidth} from './NavBarCommon';

import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Link, Route, Router} from 'react-router';

const $ = require('jQuery');


// pages are a series of links
export class NavBarMobile extends React.Component {
  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }

  getMobileMenuButton() {
    return (
      <div onClick={this.props.handleToggle} style={{padding: '0px', width: MobileWidth + "px", marginLeft: NavTextMargin + 'px', marginTop: 'auto', marginBottom: 'auto', height: IconHeight + 'px'}}>
        <MenuIcon style={{height: IconHeight + 'px', cursor: "pointer"}} />
      </div>
    );
  }

  render() {
    const that = this;
    const emptyDiv = null;
    var opacity = this.props.opacity;
    return NavBarCommon.getNavBar(
      this.getMobileMenuButton(),
      NavBarCommon.getNameLink(opacity),
      emptyDiv);
  }
}

NavBarMobile.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

NavBarMobile.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

NavBarMobile.propTypes = {
  location: React.PropTypes.object.isRequired,
};
