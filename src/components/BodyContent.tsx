import React, { ReactNode, useEffect, useState } from 'react';
import NavBarMobile from './NavBarMobile';
import Header, { HeaderHeight } from './Header';
import Footer, { footerHeight } from './Footer';
import { NavBarHeight } from './NavBarConstants';
import NavBarDesktop from './NavBarDesktop';
import pages, { PageInfo } from '../model/PageInfo';
import { useLocation } from 'react-router-dom';


interface BodyContentSettings {
  windowHeight: number,
  scrollY: number,
}

export const indexedPages: PageInfo[] = [pages['Home'], pages['Projects'], pages['Resume']];

const BodyContent = (props: { children: ReactNode }) => {
  const { children } = props;

  const { pathname: pathName } = useLocation();

  const [{ windowHeight, scrollY }, setSettings] = useState<BodyContentSettings>(() => ({
    windowHeight: window.innerHeight,
    scrollY: window.scrollY,
  }));

  useEffect(() => {
    const onResizeEvent = () =>
      setSettings((prev) => ({ ...prev, windowHeight: window.innerHeight }));

    const onScrollEvent = () =>
      setSettings((prev) => ({ ...prev, scrollY: window.scrollY }));

    window.addEventListener('resize', onResizeEvent);
    window.addEventListener('scroll', onScrollEvent);

    return () => {
      window.removeEventListener('resize', onResizeEvent);
      window.removeEventListener('scroll', onScrollEvent);
    };
  }, []);

  const bodyHeight = windowHeight - NavBarHeight - footerHeight;

  const headerShownPercent = Math.min(1, Math.max(0, scrollY / HeaderHeight));
  const navBarOpacity = ((headerShownPercent - .75) * 4);
  const headerOpacity = 1 - headerShownPercent;

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
      <Footer />
    </div>
  );
};

export default BodyContent;
