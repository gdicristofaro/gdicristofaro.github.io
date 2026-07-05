import React, { ReactNode } from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";
import pages, { PageInfo } from "../model/PageInfo";
import { useLocation } from "react-router-dom";

export const indexedPages: PageInfo[] = [
  pages["Home"],
  pages["Projects"],
  pages["Resume"],
];

const BodyContent = (props: { children: ReactNode }) => {
  const { children } = props;

  const { pathname: pathName } = useLocation();

  return (
    <div className="scroll-exit-fade-scope">
      <Header />
      <div className="flex min-h-dvh flex-col">
        <div className="sticky top-0 z-999 bg-bar">
          <NavBar pathName={pathName} pages={indexedPages} />
        </div>
        <div className="grow p-1">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default BodyContent;
