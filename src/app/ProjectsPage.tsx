import React from 'react';
import ProjectCell from './ProjectCell'
import Projects from './Projects'


export default () => (
  <div className="ProjectsParent">
    <h1>Projects</h1>
    <p>Here are some of the projects I have created.</p>
    {Projects.map((dataObj, i) => (<ProjectCell {...dataObj} key={i} />))}
  </div>
);