import React from 'react';
import MailIcon from './MailIcon';
import GithubIcon from './GithubIcon';
import Link from 'next/link';
import NavBarParent from './NavBarParent';
import NavBarNameLink from './NavBarNameLink';



// desktop icons to go to the right
const DesktopIconsParent = (props: {opacity: number}) => {
  let {opacity} = props;

  return (
    <div className="desktop-icons-parent" style={{opacity, visibility: opacity <= 0 ? "hidden": "visible"}}>
      <a className="email-link" href="mailto:gregdicristofaro@gmail.com">
        <MailIcon/>
      </a>
      <a href="http://www.github.com/gdicristofaro">
        <GithubIcon/>
      </a>
    </div>
  );
}

// desktop version containing links for navigation; opacity is always 1
const DesktopNavLinks = (props: {pages: any[]}) => {
  let {pages} = props;

  // render pages
  const pagesEls = pages.map(function(linkInf, i) {
    //var linkClass = (linkInf.href == that.props.location.pathname) ? "selected" : "";
    var innerText = {__html: linkInf.name};
    return (<Link
              className="DesktopNavLink"
              key={i}
              href={linkInf.href}
              // dangerouslySetInnerHTML={innerText}
              >
                {linkInf.name}
            </Link>);
  });

  return (
    <div className="DesktopNavLinks">
      <p className='navigation'>{pagesEls}</p>
    </div>
  );
}


// pages are a series of links
export default (props: {opacity: number, pages: any[]}) => {
  let {opacity, pages} = props;
  return (
    <NavBarParent
      className="DesktopNavParent"
      left={<NavBarNameLink opacity={opacity} />}
      center={<DesktopNavLinks pages={pages} /> }
      right={<DesktopIconsParent opacity={opacity} />}
    />
  );
}