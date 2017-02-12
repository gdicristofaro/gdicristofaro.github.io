import React from 'react';
import MailIcon from './MailIcon';
import GithubIcon from './GithubIcon';
import MenuIcon from './MenuIcon';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class MobileDrawer extends React.Component {
  render() {
    var that = this;
    // handles menu close
    var setterFunct = this.props.setterFunct;

    // map other local pages to menu items
    var pages = this.props.pages.map(function(linkInf, i) {
      var menuStyle = (linkInf.href == that.props.location.pathname) ? {backgroundColor: '#5ACFE3'} : {};
      var innerText = {__html: linkInf.name};
      var onSelect = function() {
        setterFunct(false);
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
        setterFunct(false);
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
        open={this.props.open}
        onRequestChange={ setterFunct }
      >
        {pages}
      </Drawer>);

  }

  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }
}

MobileDrawer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

MobileDrawer.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

MobileDrawer.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object
};
