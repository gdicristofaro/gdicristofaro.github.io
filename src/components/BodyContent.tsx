import React, { ReactNode, useEffect } from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";
import pages, { isSamePath, PageInfo } from "../model/PageInfo";
import { useLocation } from "react-router-dom";

export const indexedPages: PageInfo[] = [
  pages["Home"],
  pages["Projects"],
  pages["Resume"],
];

const BodyContent = (props: { children: ReactNode }) => {
  const { children } = props;

  const { pathname: pathName } = useLocation();

  // announce route changes in the browser tab / screen reader (WCAG 2.4.2)
  useEffect(() => {
    const page = indexedPages.find((p) => isSamePath(p.href, pathName));
    if (page) {
      document.title = page.pagetitle;
    }
  }, [pathName]);

  return (
    <div className="scroll-exit-fade-scope">
      {/* keyboard users can jump past the letterhead and nav (WCAG 2.4.1);
          visible only while focused */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-1000 focus:rounded focus:bg-card focus:px-3 focus:py-2 focus:text-body"
      >
        Skip to main content
      </a>
      <Header />
      <div className="flex min-h-dvh flex-col">
        <div className="sticky top-0 z-999 bg-bar">
          <NavBar pathName={pathName} pages={indexedPages} />
        </div>
        <main id="main-content" className="grow p-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default BodyContent;
