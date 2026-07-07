import React from "react";
import { load } from "js-yaml";
import ResumeComponent from "../components/ResumeComponent";
import ResumePdfCard from "../components/ResumePdfCard";
import type { ResumeData } from "../model/ResumeData";
import resumeYamlRaw from "../model/resume.yaml?raw";

const resumeData = load(resumeYamlRaw) as ResumeData;

const Resume = () => (
  <div className="animate-fade-in">
    <div className="mx-3">
      <div className="mx-auto mt-5 mb-8 max-w-260">
        <ResumeComponent {...resumeData} />
      </div>
      <div className="mx-auto mb-7 max-w-260">
        <ResumePdfCard />
      </div>
    </div>
  </div>
);

export default Resume;
