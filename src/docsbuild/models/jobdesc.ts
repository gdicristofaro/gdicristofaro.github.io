export interface JobDesc {
  postingText: string;
  postingURL: string;
  companyURL: string;
  dateFound: Date;
  hasCoverLetter?: boolean;
  hasReferences?: boolean;
  additionalQuestions?: string[];
}

/*
jobapp new <slug>
    


jobapp new <slug> — scaffolds the directory and drops a jobdesc.yaml template with the fields pre-listed.
jobapp build <slug> — yaml to HTML and text, then HTML to PDF, one command, keeping the HTML as a durable output rather than a temp file.
jobapp check <slug> — mechanical verification. Page count, blank-space detection, pdftotext round-trip for ATS readability, em dash lint, bold count. Deterministic, exits nonzero, readable stderr.

*/
