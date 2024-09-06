export interface PageInfo {
  pagetitle: string,
  name: string,
  href: string
}

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


