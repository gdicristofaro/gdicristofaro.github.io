import React, { ReactNode } from 'react';

// retrieves nav bar component given left, center, right component
const NavBarParent = (props: { left: ReactNode, center: ReactNode, right: ReactNode, className?: string }) => {
  const { left, center, right, className } = props;

  return (
    <div className={"navbar" + (className ? " " + className : "")}>
      <div className="navbar-child navbar-child-left">{left}</div>
      <div className="navbar-child navbar-child-center">{center}</div>
      <div className="navbar-child navbar-child-right">{right}</div>
    </div>
  );
};

export default NavBarParent;