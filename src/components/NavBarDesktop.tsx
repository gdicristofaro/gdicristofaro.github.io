import React from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Link } from "react-router-dom";
import NavBarParent from "./NavBarParent";
import NavBarNameLink from "./NavBarNameLink";
import { PageInfo } from "@/model/PageInfo";

const DesktopIconsParent = () => {
  return (
    <div className="flex flex-row justify-end text-right">
      <a
        className="mx-[10px] text-on-bar hover:text-accent-hover"
        href="mailto:gregdicristofaro@gmail.com"
        aria-label="Email"
      >
        <EnvelopeIcon className="h-[30px] w-auto" />
      </a>
      <a
        className="text-on-bar hover:text-accent-hover"
        href="http://www.github.com/gdicristofaro"
        aria-label="GitHub"
      >
        <SiGithub />
      </a>
    </div>
  );
};

const DesktopNavLinks = (props: { pages: PageInfo[]; pathName: string }) => {
  const { pages, pathName } = props;

  const pagesEls = pages.map(function (linkInf, i) {
    if (linkInf.href.toLocaleLowerCase() === pathName.toLocaleLowerCase()) {
      return (
        <span className="mx-[15px] text-accent" key={i}>
          {linkInf.name}
        </span>
      );
    } else {
      return (
        <Link
          className="mx-[15px] text-on-bar no-underline hover:text-accent-hover"
          key={i}
          to={linkInf.href}
        >
          {linkInf.name}
        </Link>
      );
    }
  });

  return (
    <div className="m-0 text-[120%] font-semibold uppercase">{pagesEls}</div>
  );
};

const NavBarDesktop = (props: { pathName: string; pages: PageInfo[] }) => {
  const { pathName, pages } = props;
  return (
    <div className="hidden min-[700px]:block">
      <NavBarParent
        left={<NavBarNameLink />}
        center={<DesktopNavLinks pages={pages} pathName={pathName} />}
        right={<DesktopIconsParent />}
      />
    </div>
  );
};

export default NavBarDesktop;
