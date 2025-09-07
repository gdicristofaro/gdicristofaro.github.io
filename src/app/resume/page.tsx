import React from 'react';
import ProjectCell from '../../components/ProjectCell';
import { default as ResumeHtml } from '../../model/resumehtml.html';
//const ResumeHtml = require('../../model/resumehtml.html').default;

const Page = () => (<div className="page-transition">
    <h1 className="ResumePage page-header">R&eacute;sum&eacute;</h1>
    <div dangerouslySetInnerHTML={{ __html: ResumeHtml }} />
    <div className="page-content">
        <ProjectCell img="/img/resumeThumb.png" header="PDF Version" description="Download the PDF version of my r&eacute;sum&eacute; here" href="resume.pdf" />
    </div>
</div>
);

export default Page;