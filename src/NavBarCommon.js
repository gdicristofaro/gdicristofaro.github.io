import React from 'react';
import * as $ from 'jquery';

// the minimum width before switching to mobile
export const MinDesktopWidth = 700;
export const IconHeight = 30;
export const MailWidth = 40;
export const GithubWidth = 30;
export const MobileWidth = 45;
export const NavBarHeight = 50;
export const NavTextMargin = 20;


// pages are a series of links
var NavBarCommon = {};
export default NavBarCommon;

  // link to main website with name
NavBarCommon.getNameLink = function(opacity, style) {
  var visibility = (opacity <= 0) ? "hidden" : "visible";
  return (
    <div
      style={$.extend({}, style, {opacity: opacity, visibility: visibility, lineHeight: NavBarHeight+"px"})}
    >
      <a href="http://www.gdicristofaro.com/">
        <div>
          <h1 style={{textAlign: 'left'}} className="letterhead">Greg DiCristofaro</h1>
        </div>
      </a>
    </div>
  );
};

  // retrieves nav bar component given left, center, right component
NavBarCommon.getNavBar = function(left, center, right) {
  const child = {flex: 1, whiteSpace: 'nowrap'};
  const parent = {minHeight: NavBarHeight + "px", width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'};

  return (
      <div className="navbar" style={$.extend({padding: '0px', margin: '0px', position: 'relative'}, parent)}>
        <div style={$.extend({}, child, {textAlign: 'left'})}>
          {left}
        </div>
        <div style={$.extend({}, child, {textAlign: 'center'})}>
          {center}
        </div>
        <div style={$.extend({}, child, {textAlign: 'right'})}>
          {right}
        </div>
      </div>
  );
};
