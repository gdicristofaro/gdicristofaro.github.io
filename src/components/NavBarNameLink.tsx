import React from 'react';

// link to main website with name
const NavBarNameLink = () => {
  return (
    <div className="leading-[50px]">
      <a className="no-underline" href="http://www.gdicristofaro.com/">
        <div>
          <h1 className="m-0 text-left text-[160%] font-light text-accent">Greg DiCristofaro</h1>
        </div>
      </a>
    </div>
  );
};

export default NavBarNameLink;
