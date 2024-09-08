import React from 'react';
import ProjectCell from '../../components/ProjectCell'
import Projects from '../../model/Projects'


export default () => (
  <div className="ProjectsParent page-transition">
    <h1 className="page-header">Projects</h1>
    <p className="description-text projects-text">Here are some of the projects I have created.</p>
    {Projects.map((dataObj, i) => (<ProjectCell {...dataObj} key={i} />))}
  </div>
);