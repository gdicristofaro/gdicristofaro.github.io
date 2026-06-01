import React, { ReactNode } from 'react';

export const HeaderHeight = 285;

// pages are a series of links
const Header = (props: { opacity: number, children?: ReactNode }) => {


  // gets very upper header that disappears on scroll
  const { opacity, children } = props;

  return (
    <div className="header" style={{ margin: "0px", padding: "0px" }}>
      <div className="header-inner" style={{ opacity: opacity }}>
        <div className="header-circle-photo">
          <img alt="a circle with a picture of me" title="A picture of me!" src="/img/circleIcon.png" />
        </div>
        <h1 className="header-letterhead">Greg DiCristofaro</h1>
        <p className="header-letterhead">
          <a href="http://www.gdicristofaro.com">www.gdicristofaro.com</a><span className="header-dot">•</span><a href="http://www.github.com/gdicristofaro">www.github.com/gdicristofaro</a></p>
        <p className="header-letterhead"><a href="mailto:gregdicristofaro@gmail.com">gregdicristofaro@gmail.com</a></p>
      </div>
      {children}
    </div>
  );
}

export default Header;