import React from 'react';
import MailIcon from './MailIcon';
import GithubIcon from './GithubIcon';
import { Link } from 'react-router-dom';
import NavBarParent from './NavBarParent';
import NavBarNameLink from './NavBarNameLink';
import { PageInfo } from '@/model/PageInfo';


const DesktopIconsParent = (props: { opacity: number }) => {
  const { opacity } = props;

  return (
    <div className="desktop-icons-parent" style={{ opacity, visibility: opacity <= 0 ? "hidden" : "visible" }}>
      <a className="email-link" href="mailto:gregdicristofaro@gmail.com">
        <MailIcon />
      </a>
      <a href="http://www.github.com/gdicristofaro">
        <GithubIcon />
      </a>
    </div>
  );
};

const DesktopNavLinks = (props: { pages: PageInfo[], pathName: string }) => {
  const { pages, pathName } = props;

  const pagesEls = pages.map(function (linkInf, i) {
    if (linkInf.href.toLocaleLowerCase() === pathName.toLocaleLowerCase()) {
      return (<span className="DesktopNavLink selected" key={i}>{linkInf.name}</span>);
    } else {
      return (<Link className="DesktopNavLink" key={i} to={linkInf.href}>{linkInf.name}</Link>);
    }
  });

  return (
    <div className="DesktopNavLinks">
      <div className='navigation'>{pagesEls}</div>
    </div>
  );
};

const NavBarDesktop = (props: { opacity: number, pathName: string, pages: PageInfo[] }) => {
  const { opacity, pathName, pages } = props;
  return (
    <NavBarParent
      className="DesktopNavParent"
      left={<NavBarNameLink opacity={opacity} />}
      center={<DesktopNavLinks pages={pages} pathName={pathName} />}
      right={<DesktopIconsParent opacity={opacity} />}
    />
  );
};

export default NavBarDesktop;
