import React from 'react';
import ProjectCell from '../../components/ProjectCell';
const resumehtml = require('../../components/resumehtml.html');


//"/src/**/*.html"


export default () => (<div>
    <h1 className="ResumePage">Resum&eacute;</h1>
    <div dangerouslySetInnerHTML={{ __html: resumehtml }} />
    <div>
        <ProjectCell img="/img/resumeThumb.png" header="PDF Version" description="Download the PDF version of my resume here" href="resume.pdf" />
    </div>
</div>
);