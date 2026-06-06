import { ListItem, ListItemText, ListItemIcon, SvgIcon, List, ListItemButton, Divider } from '@mui/material';
import React, { useState } from 'react';
import { MailPath } from './MailIcon';
import MenuIcon from './MenuIcon';
import { GithubPath } from './GithubIcon';
import Drawer from '@mui/material/Drawer';
import NavBarParent from './NavBarParent';
import NavBarNameLink from './NavBarNameLink';
import { PageInfo } from '@/model/PageInfo';
import { useNavigate } from 'react-router-dom';


const NavBarDrawer = (prop: { pages: PageInfo[], drawerOpen: boolean, setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>, pathName: string }) => {
  const { pages, drawerOpen, setDrawerOpen, pathName } = prop;
  const navigate = useNavigate();

  const normalPageComp = pages.map((linkInf, i) => {
    const isSelected = pathName.toLocaleLowerCase() === linkInf.href.toLocaleLowerCase();
    return (
      <ListItem key={i} disableGutters disablePadding className={isSelected ? "selected" : ""}>
        <ListItemButton onClick={() => navigate(linkInf.href)}>
          <ListItemText primary={<div>{linkInf.name}</div>} />
        </ListItemButton>
      </ListItem>
    );
  });

  const externalComps = [
    { text: 'Email', href: 'mailto:gregdicristofaro@gmail.com', viewbox: '0 0 20 20', svgpath: (<MailPath />) },
    { text: 'GitHub', href: 'https://github.com/gdicristofaro', viewbox: '0 0 18 18', svgpath: (<GithubPath />) }
  ].map(({ text, href, viewbox, svgpath }) => (
    <ListItem key={text} disableGutters disablePadding>
      <ListItemButton href={href}>
        <ListItemIcon className='drawer-icon'>
          <SvgIcon className="drawer-svgicon" viewBox={viewbox}>
            {svgpath}
          </SvgIcon>
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  ));

  return (
    <Drawer
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
          {normalPageComp}
        </List>
        <Divider />
        <List>
          {externalComps}
        </List>
      </div>
    </Drawer>
  );
};

const MobileMenuButton = (props: { setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { setDrawerOpen } = props;
  return (
    <div
      className="MobileMenuButtonParent"
      role="button"
      tabIndex={0}
      onClick={() => setDrawerOpen((prev: boolean) => !prev)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setDrawerOpen((prev: boolean) => !prev); }}
    >
      <MenuIcon />
    </div>
  );
};

const NavBarMobile = (props: { opacity: number, pages: PageInfo[], pathName: string }) => {
  const { opacity, pages, pathName } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="MobileNavParent">
      <NavBarDrawer {...{ pages, drawerOpen, setDrawerOpen, pathName }} />
      <NavBarParent
        left={<MobileMenuButton {...{ drawerOpen, setDrawerOpen }} />}
        center={<NavBarNameLink opacity={opacity} />}
        right={undefined}
      />
    </div>
  );
};

export default NavBarMobile;
