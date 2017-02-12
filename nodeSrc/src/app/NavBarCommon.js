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
export const MinDesktopWidth = 700;
export const IconHeight = 30;
export const NavBarHeight = 50;
export const NavTextMargin = 20;


// pages are a series of links
var NavBarCommon = {};
export default NavBarCommon;


// only display if opacity is greater than 0
NavBarCommon.getDisplay = function(opacity) {
  return (opacity > 0) ? "block" : "none";
};

  // link to main website with name
NavBarCommon.getNameLink = function(opacity, style) {
  return (
    <div
      style={$.extend({}, style, {opacity: opacity})}
      className="opacityTransitionable"
    >
      <a href="http://www.gdicristofaro.com/">
        <div>
          <h1 style={{textAlign: 'center'}} className="letterhead">Greg DiCristofaro</h1>
        </div>
      </a>
    </div>
  );
};

  // retrieves nav bar component given left, center, right component
NavBarCommon.getNavBar = function(left, center, right) {
  const child = {position: 'absolute', top: '50%', transform: 'translateY(-50%)'};
  const parent = {minHeight: NavBarHeight + "px", width: '100%'};
  return (
    <div className="navbar" style={parent}>
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
};
