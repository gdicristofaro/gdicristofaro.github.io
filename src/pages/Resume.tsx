import React from "react";
import { load } from "js-yaml";
import ResumePdfCard from "../components/ResumePdfCard";
import type { ResumeData } from "../model/ResumeData";
import resumeYamlRaw from "../model/resume.yaml?raw";
import renderResume from "../docsbuild/templates/resume.hbs";

// the site and the PDF/plaintext builds render the same Handlebars template,
// so the page here can't drift from the document that gets sent out
const resumeData = load(resumeYamlRaw) as ResumeData;
const resumeHtml = renderResume(resumeData);

const Resume = () => (
  <div className="animate-fade-in">
    <div className="mx-3">
      <div
        className="mx-auto mt-5 mb-8 max-w-260"
        dangerouslySetInnerHTML={{ __html: resumeHtml }}
      />
      <div className="mx-auto mb-7 max-w-260">
        <ResumePdfCard />
      </div>
    </div>
  </div>
);

export default Resume;
