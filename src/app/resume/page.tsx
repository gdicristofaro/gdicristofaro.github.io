import React from 'react';
import ProjectCell from '../../components/ProjectCell';
import { default as ResumeHtml } from '../../model/resumehtml.html';

const Page = () => (<div className="page-transition">
    <div className="ml-3 mr-3">
        <div className="ml-auto mr-auto mt-5 mb-5 resume-width" dangerouslySetInnerHTML={{ __html: ResumeHtml }} />
        <div className="ml-auto mr-auto mb-5 resume-width">
            <ProjectCell img="/img/resumeThumb.png" header="PDF Version" description="Download the PDF version of my r&eacute;sum&eacute; here" href="resume.pdf" />
        </div>
    </div>
</div>
);

export default Page;