import React from 'react';

// retrieves nav bar component given left, center, right component
export default (props: { left: any, center: any, right: any, className?: string }) => {
  let { left, center, right, className } = props;

  return (
    <div className={"navbar" + (className ? " " + className : "")}>
      <div className="navbar-child navbar-child-left">{left}</div>
      <div className="navbar-child navbar-child-center">{center}</div>
      <div className="navbar-child navbar-child-right">{right}</div>
    </div>
  );
};
