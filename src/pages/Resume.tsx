import React from "react";
import ResumePdfCard from "../components/ResumePdfCard";
// both generated from resume.html at build time (see vite-plugin-resume.ts),
// so the page here can't drift from the document that gets sent out
import "../model/resume.css";
import resumeHtml from "../model/resume.body.html?raw";

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
