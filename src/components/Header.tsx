import React from "react";

const letterhead = "m-0 text-center";
const linkClass = "text-xs/5 text-on-bar no-underline hover:text-accent-hover";
const dotClass = "text-xs/5 mx-1";

const Header = () => {
  return (
    <div className="m-0 w-full bg-bar px-0 py-2 font-light text-on-bar">
      <div className="scroll-exit-fade">
        <div className="relative mx-auto mb-2 block h-50 w-50">
          <img
            alt="Greg DiCristofaro"
            src="/img/circleIcon.png"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <h1 className={`${letterhead} text-xl font-light text-accent`}>
          Greg DiCristofaro
        </h1>
        <p className={letterhead}>
          <a className={linkClass} href="http://www.gdicristofaro.com">
            www.gdicristofaro.com
          </a>
          <span className={dotClass}>•</span>
          <a className={linkClass} href="http://www.github.com/gdicristofaro">
            www.github.com/gdicristofaro
          </a>
        </p>
        <p className={letterhead}>
          <a className={linkClass} href="mailto:gregdicristofaro@gmail.com">
            gregdicristofaro@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Header;
