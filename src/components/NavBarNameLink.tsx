import React from 'react';

// link to main website with name
export default (props: { opacity: number }) => {
  let { opacity } = props;

  return (
    <div className="navbar-name-div"
      style={{ opacity, visibility: opacity <= 0 ? 'hidden' : 'visible' }}
    >
      <a href="http://www.gdicristofaro.com/">
        <div>
          <h1 className="navbar-name-text header-letterhead">Greg DiCristofaro</h1>
        </div>
      </a>
    </div>
  );
};