import React from 'react';
import ProjectCell from '../../components/ProjectCell'
import Projects from '../../model/Projects'


const Page = () => (
  <div className="ProjectsParent page-transition mt-5">
    {Projects.map((dataObj, i) => (<ProjectCell {...dataObj} key={i} />))}
  </div>
);

export default Page;