import { ListItem, ListItemText, ListItemIcon, SvgIcon, List } from '@mui/material';
import React, { useState } from 'react';
import { MailPath } from './MailIcon';
import MenuIcon from './MenuIcon';
import Link from 'next/link';
import { GithubPath } from './GithubIcon';
import Drawer from '@mui/material/Drawer';
import NavBarParent from './NavBarParent';
import NavBarNameLink from './NavBarNameLink';
import { PageInfo } from '@/model/PageInfo';


const NavBarDrawer = (prop: { pages: PageInfo[], drawerOpen: boolean, setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>, pathName: string }) => {
  let { pages, drawerOpen, setDrawerOpen, pathName } = prop;
  // map other local pages to menu items
  let normalPageComp = pages.map((linkInf, i) => {
    return (<ListItem key={i} component={Link} href={linkInf.href} type='button' className={(pathName.toLocaleLowerCase() === linkInf.href.toLocaleLowerCase()) ? " selected" : ""}>
      <ListItemText primary={<div>{linkInf.name}</div>} />
    </ListItem>);
  });

  let emailComp = (
    <ListItem type='button' key={"email"} component="a" href="mailto:gregdicristofaro@gmail.com">
      <ListItemIcon>
        <SvgIcon className="drawer-svgicon" viewBox="0 0 20 20">
          <MailPath />
        </SvgIcon>
      </ListItemIcon>
      <ListItemText primary="Email" />
    </ListItem>);

  let githubComp = (
    <ListItem type='button' key={"github"}
      component="a" href="https://github.com/gdicristofaro">
      <ListItemIcon>
        <SvgIcon className="drawer-svgicon" viewBox="0 0 18 18">
          <GithubPath />
        </SvgIcon>
      </ListItemIcon>
      <ListItemText primary="GitHub" />
    </ListItem>);

  let pagesComp = [...normalPageComp, emailComp, githubComp];

  return (
    <Drawer
      PaperProps={{
        sx: {}
      }}
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <div
        className="MobileDrawer"
        tabIndex={0}
        role="button"
        onClick={() => setDrawerOpen(false)}
        onKeyDown={() => setDrawerOpen(false)}
      >
        <List>
          {pagesComp}
        </List>
      </div>
    </Drawer>
  );
}

const MobileMenuButton = (props: { setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  let { setDrawerOpen } = props;
  return (
    <div className="MobileMenuButtonParent" onClick={() => setDrawerOpen((prev: boolean) => !prev)}>
      <MenuIcon />
    </div>
  );
}

// pages are a series of links
export default (props: { opacity: number, pages: PageInfo[], pathName: string }) => {
  let { opacity, pages, pathName } = props;
  let [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div>
      <NavBarDrawer {...{ pages, drawerOpen, setDrawerOpen, pathName }} />
      <NavBarParent
        left={<MobileMenuButton {...{ drawerOpen, setDrawerOpen }} />}
        center={<NavBarNameLink opacity={opacity} />}
        right={undefined}
      />
    </div>
  )
}