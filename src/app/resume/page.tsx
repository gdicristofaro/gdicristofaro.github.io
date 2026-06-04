import { promises as fs } from 'fs';
import path from 'path';
import { load } from 'js-yaml';
import ProjectCell from '../../components/ProjectCell';
import ResumeComponent from '../../components/ResumeComponent';
import type { ResumeData } from '../../model/ResumeData';

export default async function Page() {
  const yaml = await fs.readFile(
    path.join(process.cwd(), 'src/model/resume.yaml'),
    'utf-8'
  );
  const resumeData = load(yaml) as ResumeData;

  return (
    <div className="page-transition">
      <div className="ml-3 mr-3">
        <div className="ml-auto mr-auto mt-5 mb-5 resume-width">
          <ResumeComponent {...resumeData} />
        </div>
        <div className="ml-auto mr-auto mb-5 resume-width">
          <ProjectCell img="/img/resumeThumb.png" header="PDF Version" description="Download the PDF version of my r&eacute;sum&eacute; here" href="resume.pdf" />
        </div>
      </div>
    </div>
  );
}
