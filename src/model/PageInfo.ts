export interface PageInfo {
  pagetitle: string,
  name: string,
  href: string
}

// compares paths ignoring case and trailing slashes, so "/projects/"
// still matches the "/projects" nav entry
export const isSamePath = (a: string, b: string) => {
  const normalize = (p: string) =>
    p.toLocaleLowerCase().replace(/\/+$/, "") || "/";
  return normalize(a) === normalize(b);
};

const pages: { [key: string]: PageInfo } = {
  Home: {
    pagetitle: "Greg DiCristofaro",
    name: "Home",
    href: "/"
  },
  Projects: {
    pagetitle: "Greg DiCristofaro - Projects",
    name: "Projects",
    href: "/projects"
  },
  Resume: {
    pagetitle: "Greg DiCristofaro - Résumé",
    name: "Résumé",
    href: "/resume"
  }
};

export default pages;


