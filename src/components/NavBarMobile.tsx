import React, { useState } from "react";
import { Bars3Icon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { SiGithub } from "@icons-pack/react-simple-icons";
import NavBarParent from "./NavBarParent";
import NavBarNameLink from "./NavBarNameLink";
import { PageInfo } from "@/model/PageInfo";
import { useNavigate } from "react-router-dom";

const itemClass =
  "flex w-full items-center gap-3 px-4 py-2 text-left text-body hover:bg-black/5 dark:hover:bg-white/10";

const NavBarDrawer = (prop: {
  pages: PageInfo[];
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pathName: string;
}) => {
  const { pages, drawerOpen, setDrawerOpen, pathName } = prop;
  const navigate = useNavigate();

  const normalPageComp = pages.map((linkInf, i) => {
    const isSelected =
      pathName.toLocaleLowerCase() === linkInf.href.toLocaleLowerCase();
    return (
      <li key={i}>
        <button
          type="button"
          onClick={() => navigate(linkInf.href)}
          className={
            isSelected
              ? "flex w-full items-center px-4 py-2 text-left bg-accent text-[#303030] hover:bg-[#75e6f9]"
              : itemClass
          }
        >
          {linkInf.name}
        </button>
      </li>
    );
  });

  const externalComps = [
    {
      text: "Email",
      href: "mailto:gregdicristofaro@gmail.com",
      icon: <EnvelopeIcon className="h-6 w-6" />,
    },
    {
      text: "GitHub",
      href: "https://github.com/gdicristofaro",
      icon: <SiGithub />,
    },
  ].map(({ text, href, icon }) => (
    <li key={text}>
      <a href={href} className={itemClass}>
        {icon}
        <span>{text}</span>
      </a>
    </li>
  ));

  return (
    <>
      <button
        type="button"
        aria-label="Close navigation menu"
        className={`fixed inset-0 z-[1000] cursor-default bg-black/50 transition-opacity duration-300 ${drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setDrawerOpen(false)}
      />
      <div
        className={`fixed left-0 top-0 z-[1001] h-full min-w-[35dvw] bg-card py-2 text-body shadow-xl transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
        tabIndex={0}
        role="button"
        onClick={() => setDrawerOpen(false)}
        onKeyDown={() => setDrawerOpen(false)}
      >
        <ul>{normalPageComp}</ul>
        <hr className="my-2 border-t border-black/10 dark:border-white/20" />
        <ul>{externalComps}</ul>
      </div>
    </>
  );
};

const MobileMenuButton = (props: {
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setDrawerOpen } = props;
  return (
    <div
      className="my-auto h-[30px] w-[45px] p-0"
      role="button"
      tabIndex={0}
      aria-label="Open navigation menu"
      onClick={() => setDrawerOpen((prev: boolean) => !prev)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ")
          setDrawerOpen((prev: boolean) => !prev);
      }}
    >
      <Bars3Icon className="h-[30px] w-auto cursor-pointer text-on-bar hover:text-accent-hover" />
    </div>
  );
};

const NavBarMobile = (props: { pages: PageInfo[]; pathName: string }) => {
  const { pages, pathName } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-[700px]:hidden">
      <NavBarDrawer {...{ pages, drawerOpen, setDrawerOpen, pathName }} />
      <NavBarParent
        left={<MobileMenuButton {...{ drawerOpen, setDrawerOpen }} />}
        center={<NavBarNameLink />}
        right={undefined}
      />
    </div>
  );
};

export default NavBarMobile;
