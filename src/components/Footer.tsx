
import React from 'react'

const linkClass = 'text-on-bar no-underline hover:text-accent-hover';
const dotClass = 'mx-1';

const Footer = () => (
  <footer className="flex h-10 w-full items-center justify-center bg-bar font-light text-on-bar">
    <p className="m-1 text-center  text-xs">
      <a className={linkClass} href="http://www.gdicristofaro.com">gdicristofaro.com</a>
      <span className={dotClass}>•</span>
      <a className={linkClass} href="mailto:gregdicristofaro@gmail.com">Email</a>
      <span className={dotClass}>•</span>
      <a className={linkClass} href="http://www.github.com/gdicristofaro">GitHub</a>
    </p>
  </footer>
);

export default Footer;
