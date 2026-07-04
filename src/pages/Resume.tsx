import React from 'react';
import { load } from 'js-yaml';
import ProjectCell from '../components/ProjectCell';
import ResumeComponent from '../components/ResumeComponent';
import type { ResumeData } from '../model/ResumeData';
import resumeYamlRaw from '../model/resume.yaml?raw';

const resumeData = load(resumeYamlRaw) as ResumeData;

const Resume = () => (
  <div className="animate-fade-in opacity-0">
    <div className="mx-3">
      <div className="mx-auto my-5 max-w-[65rem]">
        <ResumeComponent {...resumeData} />
      </div>
      <div className="mx-auto mb-5 max-w-[65rem]">
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
