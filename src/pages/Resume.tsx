import React from 'react';
import { load } from 'js-yaml';
import ProjectCell from '../components/ProjectCell';
import ResumeComponent from '../components/ResumeComponent';
import type { ResumeData } from '../model/ResumeData';
import resumeYamlRaw from '../model/resume.yaml?raw';

const resumeData = load(resumeYamlRaw) as ResumeData;

const Resume = () => (
  <div className="page-transition">
    <div className="ml-3 mr-3">
      <div className="ml-auto mr-auto mt-5 mb-5 resume-width">
        <ResumeComponent {...resumeData} />
      </div>
      <div className="ml-auto mr-auto mb-5 resume-width">
        <ProjectCell
          img="/img/resumeThumb.png"
          header="PDF Version"
          description="Download the PDF version of my r&eacute;sum&eacute; here"
          href="resume.pdf"
        />
      </div>
    </div>
  </div>
);

export default Resume;
