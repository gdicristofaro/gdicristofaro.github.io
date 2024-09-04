import React from 'react';
import ProjectCell from '../../components/ProjectCell';
const resumehtml = require('../../model/resumehtml.html');

export default () => (<div className="page-transition">
    <h1 className="ResumePage page-header">R&eacute;sum&eacute;</h1>
    <div dangerouslySetInnerHTML={{ __html: resumehtml }} />
    <div className="page-content">
        <ProjectCell img="/img/resumeThumb.png" header="PDF Version" description="Download the PDF version of my r&eacute;sum&eacute; here" href="resume.pdf" />
    </div>
</div>
);