import React from "react";
import { Link } from "react-router-dom";

const linkClass = "text-link font-semibold hover:text-link-hover";

const Home = () => (
  <div className="mx-auto mt-8 block max-w-200 animate-fade-in">
    <div className="relative float-left mr-5 h-50 w-36">
      <img
        src="/img/profile.jpg"
        alt="Greg DiCristofaro"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
    <p className="mt-0 text-lg">
      Hello, and welcome to my website. You can read more about my work history
      on my{" "}
      <Link className={linkClass} to="/resume">
        r&eacute;sum&eacute;
      </Link>
      . Also, you can find some of my{" "}
      <Link className={linkClass} to="/projects">
        software projects
      </Link>{" "}
      on this website. All of these projects can also be found on my{" "}
      <a className={linkClass} href="https://github.com/gdicristofaro">
        GitHub account
      </a>{" "}
      as well. If you have any questions, feel free to email me at{" "}
      <a className={linkClass} href="mailto:gregdicristofaro@gmail.com">
        gregdicristofaro@gmail.com
      </a>
      .
    </p>
    <p className="mt-0 text-lg">Thanks,</p>
    <p className="mt-0 text-lg">Greg DiCristofaro</p>
  </div>
);

export default Home;
