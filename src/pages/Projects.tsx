import React from 'react';
import ProjectCell from '../components/ProjectCell';
import projects from '../model/Projects';

const ProjectsPage = () => (
  <div className="ProjectsParent page-transition mt-5">
    {projects.map((dataObj, i) => (<ProjectCell {...dataObj} key={i} />))}
  </div>
);

export default ProjectsPage;
