import React from 'react';
import ProjectCell from '../../components/ProjectCell'
import Projects from '../../model/Projects'


export default () => (
  <div className="ProjectsParent">
    <h1>Projects</h1>
    <p>Here are some of the projects I have created.</p>
    {Projects.map((dataObj, i) => (<ProjectCell {...dataObj} key={i} />))}
  </div>
);