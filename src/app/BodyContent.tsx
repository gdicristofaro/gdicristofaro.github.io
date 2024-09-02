'use client';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';

import NavBarMobile from './NavBarMobile';
import Header, { HeaderHeight } from './Header';
import Footer, { footerHeight } from './Footer';
import { MinDesktopWidth, NavBarHeight } from './NavBarConstants';
import NavBarDesktop from './NavBarDesktop';

declare global {
  interface Window {
  }
}

export const myPages = {
  Home: {
    pagetitle: "Greg DiCristofaro",
    name: "Home",
    href: "/"
    //content: (<Home />)
  },
  Projects: {
    pagetitle: "Greg DiCristofaro - Projects",
    name: "Projects",
    href: "/projects"
    //content: (<Projects />)
  },
  Resume:
  {
    pagetitle: "Greg DiCristofaro - Resum&eacute;",
    name: "Resum&eacute;",
    href: "/resume"
    //content: (<Resume />)
  }
};

interface BodyContentSettings {
  windowHeight: number,
  mobileDrawerOpen: boolean,
  isScrolled: boolean,
  scrollY: number
}

export const indexedPages = [myPages['Home'], myPages['Projects'], myPages['Resume']];

export default (props: {children: any}) => {
  let { children } = props;

  let [{windowHeight, mobileDrawerOpen, isScrolled, scrollY}, setSettings] = useState<BodyContentSettings>({
    windowHeight: window.innerHeight,
    mobileDrawerOpen: false,
    isScrolled: false,
    scrollY: window.scrollY
  });

  useEffect(() => {
    let onResizeEvent = (e: any) =>
      setSettings((prevSettings) => ({ ...prevSettings, windowWidth: window.innerWidth, windowHeight: window.innerHeight }));

    let onScrollEvent = (e: any) =>
      setSettings((prevSettings) => ({ ...prevSettings, scrollY: window.scrollY }));

    window.addEventListener('resize', onResizeEvent);
    window.addEventListener('scroll', onScrollEvent);

    return () => {
      window.removeEventListener('resize', onResizeEvent);
      window.removeEventListener('scroll', onScrollEvent);
    };
  }, []);

  let isMobileWidth = useMediaQuery(`(max-width:${MinDesktopWidth}px)`);

  const bodyHeight = windowHeight - NavBarHeight - footerHeight;

  let headerShownPercent = Math.min(1, Math.max(0, scrollY / HeaderHeight));
  let navBarOpacity = ((headerShownPercent - .75) * 4);
  let headerOpacity = 1 - headerShownPercent;

  // spacer for content so that it doesn't hide behind header
  let headerShift = Math.max(-scrollY, -HeaderHeight);

  const main = (
    <div
      className="main"
      style={{ minHeight: bodyHeight + "px" }}
    >
      {/* <CSSTransition
        component="div"
        transitionName="pagetransition"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      > */}
        {children}
      {/* </CSSTransition> */}
    </div>);

  let navbar;
  if (isMobileWidth) {
    // const mobileDrawerToggler = () => setSettings((prev) => ({...prev, mobileDrawerOpen: !prev.mobileDrawerOpen}));
    
    navbar = (
      <NavBarMobile
        // handleToggle={mobileDrawerToggler}
        pages={indexedPages}
        opacity={navBarOpacity}
      />);
  }
  else {
    navbar = (
      <NavBarDesktop
        pages={indexedPages}
        opacity={navBarOpacity}
      />
    )
  }

  return (
    <div className='bodycontent'>
      <div className='innerBodyContent' style={{ top: headerShift + 'px' }}>
        <Header opacity={headerOpacity}>
          {navbar}
        </Header>
      </div>
      <div style={{ height: (HeaderHeight + NavBarHeight) + 'px' }}></div>
      {main}
      <Footer />
    </div>
  );
}