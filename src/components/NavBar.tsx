import React, { useEffect, useRef } from "react";
import { Bars3Icon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Link } from "react-router-dom";
import { PageInfo } from "@/model/PageInfo";

// links the hamburger button (popoverTarget) to the drawer element
const DRAWER_ID = "site-nav-drawer";

const externalLinks = [
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
];

// link to main website with name
const NameLink = () => (
  <div className="scroll-exit-fade-in leading-12.5">
    <a className="no-underline" href="http://www.gdicristofaro.com/">
      <span className="block text-left text-xl font-light text-accent">
        Greg DiCristofaro
      </span>
    </a>
  </div>
);

const desktopLinkClass =
  "mx-3.75 text-on-bar no-underline hover:text-accent-hover aria-current-page:text-accent aria-current-page:decoration-2";

const drawerItemClass =
  "flex w-full items-center gap-3 px-4 py-2 text-left text-body no-underline hover:bg-black/5 dark:hover:bg-white/10 aria-current-page:bg-accent aria-current-page:font-semibold aria-current-page:text-on-accent aria-current-page:hover:bg-accent-bright";

// the page links, marked up once for both layouts; the current page is
// conveyed with aria-current and styled via the aria-current-page variant
const PageLinks = (props: {
  pages: PageInfo[];
  pathName: string;
  listClassName?: string;
  itemClassName: string;
}) => {
  const { pages, pathName, listClassName, itemClassName } = props;
  return (
    <ul className={listClassName}>
      {pages.map((linkInf) => (
        <li key={linkInf.href}>
          <Link
            to={linkInf.href}
            className={itemClassName}
            aria-current={
              linkInf.href.toLocaleLowerCase() === pathName.toLocaleLowerCase()
                ? "page"
                : undefined
            }
          >
            {linkInf.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const NavBar = (props: { pages: PageInfo[]; pathName: string }) => {
  const { pages, pathName } = props;
  const drawerRef = useRef<HTMLDivElement>(null);

  // light dismiss only covers clicks outside the popover and Escape, so
  // close the drawer when a link inside it navigates
  useEffect(() => {
    drawerRef.current?.togglePopover(false);
  }, [pathName]);

  return (
    <nav aria-label="Main">
      <div className="relative mx-2.5 flex min-h-12.5 flex-row flex-wrap items-center justify-center bg-bar p-0 font-light text-on-bar">
        <div className="flex-1 whitespace-nowrap text-left">
          <button
            type="button"
            popoverTarget={DRAWER_ID}
            className="my-auto cursor-pointer text-on-bar hover:text-accent-hover desktop:hidden"
          >
            <Bars3Icon className="h-7.5 w-auto" />
            <span className="sr-only">Menu</span>
          </button>
          <div className="hidden desktop:block">
            <NameLink />
          </div>
        </div>
        <div className="flex-1 whitespace-nowrap text-center">
          <div className="desktop:hidden">
            <NameLink />
          </div>
          <PageLinks
            pages={pages}
            pathName={pathName}
            listClassName="hidden justify-center text-base font-semibold uppercase desktop:flex"
            itemClassName={desktopLinkClass}
          />
        </div>
        <div className="flex-1 whitespace-nowrap text-right">
          <div className="scroll-exit-fade-in hidden flex-row justify-end text-right desktop:flex">
            <a
              className="mx-2.5 text-on-bar hover:text-accent-hover"
              href="mailto:gregdicristofaro@gmail.com"
              aria-label="Email"
            >
              {/* the envelope glyph only fills 21x16.5 of the default
                  24x24 viewBox; crop to its bounds so the drawn icon
                  spans the full h-6 height like the GitHub icon */}
              <EnvelopeIcon viewBox="1.5 3.75 21 16.5" className="h-6 w-auto" />
            </a>
            <a
              className="text-on-bar hover:text-accent-hover"
              href="https://github.com/gdicristofaro"
              aria-label="GitHub"
            >
              <SiGithub />
            </a>
          </div>
        </div>
      </div>
      <div
        id={DRAWER_ID}
        ref={drawerRef}
        popover="auto"
        className={
          "fixed inset-y-0 left-0 right-auto m-0 h-full min-w-drawer border-0 bg-card p-0 py-2 text-body shadow-xl " +
          "-translate-x-full transition-all transition-discrete duration-300 open:translate-x-0 starting:open:-translate-x-full " +
          "backdrop:bg-black/50 backdrop:opacity-0 backdrop:transition-all backdrop:transition-discrete backdrop:duration-300 open:backdrop:opacity-100 starting:open:backdrop:opacity-0 " +
          "desktop:hidden"
        }
      >
        <PageLinks
          pages={pages}
          pathName={pathName}
          itemClassName={drawerItemClass}
        />
        <hr className="my-2 border-t border-black/10 dark:border-white/20" />
        <ul>
          {externalLinks.map(({ text, href, icon }) => (
            <li key={text}>
              <a href={href} className={drawerItemClass}>
                {icon}
                <span>{text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
