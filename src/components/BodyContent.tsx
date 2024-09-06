'use client';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';

import NavBarMobile from './NavBarMobile';
import Header, { HeaderHeight } from './Header';
import Footer, { footerHeight } from './Footer';
import { MinDesktopWidth, NavBarHeight } from './NavBarConstants';
import NavBarDesktop from './NavBarDesktop';
import pages, {PageInfo} from '../model/PageInfo';
import { usePathname } from 'next/navigation';
import { ViewTransitions } from 'next-view-transitions';


interface BodyContentSettings {
  windowHeight: number,
  mobileDrawerOpen: boolean,
  isScrolled: boolean,
  scrollY: number
}

export const indexedPages: PageInfo[] = [pages['Home'], pages['Projects'], pages['Resume']];

export default (props: {children: any}) => {
  let { children } = props;

  let pathName = usePathname();

  let [{windowHeight, mobileDrawerOpen, isScrolled, scrollY}, setSettings] = useState<BodyContentSettings>({
    windowHeight: 0,
    mobileDrawerOpen: false,
    isScrolled: false,
    scrollY: 0
  });

  useEffect(() => {
    let onResizeEvent = (e: any) =>
      setSettings((prevSettings) => ({ ...prevSettings, windowWidth: window.innerWidth, windowHeight: window.innerHeight }));

    let onScrollEvent = (e: any) =>
      setSettings((prevSettings) => ({ ...prevSettings, scrollY: window.scrollY }));

    window.addEventListener('resize', onResizeEvent);
    window.addEventListener('scroll', onScrollEvent);

    setSettings(prev => ({...prev, windowHeight: window.innerHeight, scrollY: window.scrollY}))

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
        {children}
    </div>);

  let navbar;
  if (isMobileWidth) {
    // const mobileDrawerToggler = () => setSettings((prev) => ({...prev, mobileDrawerOpen: !prev.mobileDrawerOpen}));
    
    navbar = (
      <NavBarMobile
        // handleToggle={mobileDrawerToggler}
        pathName={pathName}
        pages={indexedPages}
        opacity={navBarOpacity}
      />);
  }
  else {
    navbar = (
      <NavBarDesktop
        pathName={pathName}
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