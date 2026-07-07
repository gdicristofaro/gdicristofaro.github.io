import React from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

const ResumePdfCard = () => (
  <a
    href="resume.pdf"
    className="group inline-flex w-fit items-center gap-4 rounded-lg bg-card/65 p-4 text-body no-underline shadow-md transition-[background-color,box-shadow] duration-300 hover:bg-card hover:shadow-lg"
  >
    <DocumentTextIcon className="h-10 w-10 shrink-0 text-highlight transition-colors duration-300" />
    <span>
      <span className="block text-lg font-medium leading-tight mb-0.5">
        PDF Version
      </span>
      <span className="block text-sm text-gray-600 dark:text-gray-300">
        View or download my r&eacute;sum&eacute;
      </span>
    </span>
  </a>
);

export default ResumePdfCard;
