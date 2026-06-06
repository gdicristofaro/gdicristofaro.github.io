import React, { ReactNode } from 'react';

export const HeaderHeight = 285;

const Header = (props: { opacity: number, children?: ReactNode }) => {
  const { opacity, children } = props;

  return (
    <div className="header" style={{ margin: "0px", padding: "0px" }}>
      <div className="header-inner" style={{ opacity: opacity }}>
        <div className="header-circle-photo">
          <img
            alt="Greg DiCristofaro"
            src="/img/circleIcon.png"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <h1 className="header-letterhead">Greg DiCristofaro</h1>
        <p className="header-letterhead">
          <a href="http://www.gdicristofaro.com">www.gdicristofaro.com</a>
          <span className="header-dot">•</span>
          <a href="http://www.github.com/gdicristofaro">www.github.com/gdicristofaro</a>
        </p>
        <p className="header-letterhead"><a href="mailto:gregdicristofaro@gmail.com">gregdicristofaro@gmail.com</a></p>
      </div>
      {children}
    </div>
  );
};

export default Header;
