import React from "react";
import ProjectCard from "../components/ProjectCard";
import projects from "../model/Projects";

const ProjectsPage = () => (
  <div className="mx-auto mt-5 max-w-[1200px] animate-fade-in text-center opacity-0">
    {projects.map((dataObj, i) => (
      <ProjectCard {...dataObj} key={i} />
    ))}
  </div>
);

export default ProjectsPage;
