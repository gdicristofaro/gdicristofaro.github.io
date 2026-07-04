import React, { ReactNode } from 'react';

// retrieves nav bar component given left, center, right component
const NavBarParent = (props: { left: ReactNode, center: ReactNode, right: ReactNode, className?: string }) => {
  const { left, center, right, className } = props;

  return (
    <div className={"relative mx-[10px] flex min-h-[50px] flex-row flex-wrap items-center justify-center bg-bar p-0 font-light text-on-bar" + (className ? " " + className : "")}>
      <div className="flex-1 whitespace-nowrap text-left">{left}</div>
      <div className="flex-1 whitespace-nowrap text-center">{center}</div>
      <div className="flex-1 whitespace-nowrap text-right">{right}</div>
    </div>
  );
};

export default NavBarParent;
