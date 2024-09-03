export interface PageInfo {
  pagetitle: string,
  name: string,
  href: string
}

const pages: {[key: string]: PageInfo} = {
  Home: {
    pagetitle: "Greg DiCristofaro",
    name: "Home",
    href: "/"
    //content: (<Home />)
  },
  Projects: {
    pagetitle: "Greg DiCristofaro - Projects",
    name: "Projects",
    href: "/projects"
    //content: (<Projects />)
  },
  Resume: {
    pagetitle: "Greg DiCristofaro - Résumé",
    name: "Résumé",
    href: "/resume"
    //content: (<Resume />)
  }
};

export default pages;


