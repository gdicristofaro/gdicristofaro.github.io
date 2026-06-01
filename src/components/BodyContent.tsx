'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBarMobile from './NavBarMobile';
import Header, { HeaderHeight } from './Header';
import Footer, { footerHeight } from './Footer';
import { NavBarHeight } from './NavBarConstants';
import NavBarDesktop from './NavBarDesktop';
import pages, { PageInfo } from '../model/PageInfo';

interface BodyContentSettings {
  windowHeight: number,
  windowWidth: number,
  scrollY: number,
  showFooter: boolean
}

export const indexedPages: PageInfo[] = [pages['Home'], pages['Projects'], pages['Resume']];

const BodyContent = (props: { children: ReactNode }) => {
  const { children } = props;

  const location = useLocation();
  const pathName = location.pathname;

  const [{ windowHeight, windowWidth, scrollY, showFooter }, setSettings] = useState<BodyContentSettings>({
    windowHeight: 0,
    windowWidth: 0,
    scrollY: 0,
    showFooter: false
  });

  useEffect(() => {
    const onResizeEvent = () =>
      setSettings((prevSettings) => ({ ...prevSettings, windowWidth: window.innerWidth, windowHeight: window.innerHeight }));

    const onScrollEvent = () =>
      setSettings((prevSettings) => ({ ...prevSettings, scrollY: window.scrollY }));

    window.addEventListener('resize', onResizeEvent);
    window.addEventListener('scroll', onScrollEvent);

    setSettings(prev => ({ ...prev, windowHeight: window.innerHeight, scrollY: window.scrollY, showFooter: true }))

    return () => {
      window.removeEventListener('resize', onResizeEvent);
      window.removeEventListener('scroll', onScrollEvent);
    };
  }, []);

  const bodyHeight = windowHeight - NavBarHeight - footerHeight;

  const headerShownPercent = Math.min(1, Math.max(0, scrollY / HeaderHeight));
  const navBarOpacity = ((headerShownPercent - .75) * 4);
  const headerOpacity = 1 - headerShownPercent;

  // spacer for content so that it doesn't hide behind header
  const headerShift = Math.max(-scrollY, -HeaderHeight);

  const main = (
    <div
      className="main"
      style={{ minHeight: bodyHeight + "px" }}
    >
      {children}
    </div>);

  return (
    <div className='bodycontent'>
      <div className='innerBodyContent' style={{ top: headerShift + 'px' }}>
        <Header opacity={headerOpacity}>
          <NavBarMobile
            key="mobile-nav-parent"
            // handleToggle={mobileDrawerToggler}
            pathName={pathName}
            pages={indexedPages}
            opacity={navBarOpacity}
          />
          <NavBarDesktop
            key="desktop-nav-parent"
            pathName={pathName}
            pages={indexedPages}
            opacity={navBarOpacity}
          />
        </Header>
      </div>
      <div style={{ height: (HeaderHeight + NavBarHeight) + 'px' }}></div>
      {main}
      {showFooter && <Footer />}
    </div>
  );
}

export default BodyContent;