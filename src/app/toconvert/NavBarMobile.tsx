import React from 'react';
import { GithubPath } from './GithubIcon';
import { MailPath } from './MailIcon';

import MenuIcon from './MenuIcon';
import NavBarCommon, { IconHeight, NavTextMargin, MobileWidth } from './NavBarCommon';
import DarkTheme from './DarkTheme';
import { NavLink } from 'react-router-dom';

import SvgIcon from '@material-ui/core/SvgIcon';

import { MuiThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';




const Drawer = (prop: { pages: any[] }) => {
  let { pages } = prop;
  // map other local pages to menu items
  let normalPageComp = pages.map((linkInf, i) => (
    <ListItem key={i} exact={true} component={NavLink} to={linkInf.href} activeClassName="selected" button>
      <ListItemText primary={<div dangerouslySetInnerHTML={{ __html: linkInf.name }}></div>} />
    </ListItem>));

  let emailComp = (
    <ListItem button key={"email"} component="a" href="mailto:gregdicristofaro@gmail.com">
      <ListItemIcon>
        <SvgIcon viewBox="0 0 20 20" style={{ marginRight: 0 }}>
          <MailPath />
        </SvgIcon>
      </ListItemIcon>
      <ListItemText primary="Email" />
    </ListItem>);

  let githubComp = (
    <ListItem button key={"github"}
      component="a" href="https://github.com/gdicristofaro">
      <ListItemIcon>
        <SvgIcon viewBox="0 0 18 18" style={{ marginRight: 0 }}>
          <GithubPath />
        </SvgIcon>
      </ListItemIcon>
      <ListItemText primary="GitHub" />
    </ListItem>);

  return (
    <MuiThemeProvider theme={DarkTheme}>
      <Drawer
        open={this.state.drawerOpen}
        onClose={() => setState({ drawerOpen: false })}
      >
        <div
          className="MobileDrawer"
          tabIndex={0}
          role="button"
          onClick={() => this.setState({ drawerOpen: false })}
          onKeyDown={() => this.setState({ drawerOpen: false })}
        >
          <List>
            {pages}
          </List>
        </div>
      </Drawer>
    </MuiThemeProvider>
  );
}

getMobileMenuButton() {
  return (
    <div onClick={() => this.setState({ drawerOpen: !this.state.drawerOpen })}
      style={{
        padding: '0px',
        width: MobileWidth + "px",
        marginLeft: NavTextMargin + 'px',
        marginTop: 'auto',
        marginBottom: 'auto',
        height: IconHeight + 'px'
      }}
    >
      <MenuIcon style={{ height: IconHeight + 'px', cursor: "pointer" }} />
    </div>
  );
}

// pages are a series of links
export default (props: {}) => {
  let [drawerOpen, setDrawerOpen] = useState(false);


  render() {
    const emptyDiv = null;
    var opacity = this.props.opacity;
    return (
      <div>
        {this.renderDrawer()}
        {NavBarCommon.getNavBar(
          this.getMobileMenuButton(),
          NavBarCommon.getNameLink(opacity),
          emptyDiv)}
      </div>
    )
  }
}