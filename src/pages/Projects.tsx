import React from 'react';
import ProjectCell from '../components/ProjectCell';
import projects from '../model/Projects';

const ProjectsPage = () => (
  <div className="mx-auto mt-5 max-w-[1200px] animate-fade-in text-center opacity-0">
    {projects.map((dataObj, i) => (<ProjectCell {...dataObj} key={i} />))}
  </div>
);

export default ProjectsPage;
