import React from 'react';
import ProjectCell from './ProjectCell';
import ResumeImg from './img/resumeThumb.png';
const resumehtml = require('./resumehtml.html');



export default () => (<div>
    <h1 className="ResumePage">Resum&eacute;</h1>
    <div dangerouslySetInnerHTML={{ __html: resumehtml }} />
    <div>
        <ProjectCell img={ResumeImg} header="PDF Version"  description="Download the PDF version of my resume here" href="resume.pdf" />
    </div>
</div>
);