import React from 'react';
import type { ResumeData } from '../model/ResumeData';

// Tailwind column width safelist: sm:w-1/5 sm:w-2/5 sm:w-3/5 sm:w-4/5 sm:w-1/2 sm:w-1/3 sm:w-2/3

function md(text: string): React.ReactNode {
  const trimmed = text.trim();
  const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return trimmed;
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
          ? <span key={i} className="font-bold">{part.slice(2, -2)}</span>
          : part
      )}
    </>
  );
}

function telHref(phone: string): string {
  return `tel:+${phone.replace(/\D/g, '')}`;
}

function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '');
}

const PhoneIcon = () => (
  <svg className="highlight-color icon inline-block align-text-bottom mr-1/2" fill="none"
    strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="highlight-color icon inline-block align-text-bottom mr-1/2" fill="none"
    strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);

const LinkIcon = () => (
  <svg className="highlight-color icon inline-block align-baseline mr-1/2" fill="none"
    strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="icon inline-block align-baseline mr-1/2" fill="none"
    strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="icon inline-block align-baseline mr-1/2" fill="none"
    strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);

const AcademicCapIcon = () => (
  <svg className="icon inline-block align-baseline mr-1/2" fill="none"
    strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
  </svg>
);

export default function ResumeComponent({
  name,
  title,
  phone,
  email,
  website,
  github,
  leftColumn,
  rightColumn,
  summary,
  workExperience,
  education,
  skills,
  achievements,
  projects,
  projectNoPrintBorderIdx
}: ResumeData) {
  return (
    <div className="resume-container">
      <header className="mb-3 break-inside-avoid-page">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1 uppercase">{name}</h1>
        <p className="font-semibold text-base highlight-color mb-1">{title}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div>
            <a href={telHref(phone)}>
              <PhoneIcon />
              <span>{phone}</span>
            </a>
          </div>
          <div>
            <a href={`mailto:${email}`}>
              <EmailIcon />
              <span>{email}</span>
            </a>
          </div>
          <div>
            <a href={website}>
              <LinkIcon />
              <span>{displayUrl(website)}</span>
            </a>
          </div>
          <div>
            <a href={github}>
              <LinkIcon />
              <span>{displayUrl(github)}</span>
            </a>
          </div>
        </div>
      </header>

      <div className="column-container sm:flex">
        <div className={`left-column sm:${leftColumn} pr-5`}>
          <section className="summary mb-5 break-inside-avoid-page">
            <h2 className="text-xl font-semibold uppercase text-gray-800 dark:text-gray-100 pb-1 border-b-2 border-gray-800 dark:border-gray-100 mb-3">
              Summary
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{md(summary)}</p>
          </section>

          <section className="mb-5">
            <h2 className="text-xl font-semibold uppercase text-gray-800 dark:text-gray-100 pb-1 border-b-2 border-gray-800 dark:border-gray-100 mb-3">
              Experience
            </h2>
            {workExperience.map((job, i) => (
              <div key={i} className={`mb-4 break-inside-avoid-page${i > 0 ? ' border-t border-dotted border-neutral-400 print-border-none' : ''}`}>
                <p className="font-bold text-lg text-gray-800 dark:text-gray-100">{job.title}</p>
                <p className="font-bold text-base mb-1 highlight-color">{job.company}</p>
                <div className="text-gray-600 dark:text-gray-300 text-xs mb-2">
                  <CalendarIcon />
                  <span className="italic mr-2">{job.timeSpan}</span>
                  <MapPinIcon />
                  <span className="italic">{job.location}</span>
                </div>
                <ul className="text-sm list-disc ml-5 text-gray-600 dark:text-gray-300">
                  {job.workItems.map((item, j) => (
                    <li key={j} className="mb-1">{md(item)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="break-inside-avoid-page">
            <h2 className="text-xl font-semibold uppercase text-gray-800 dark:text-gray-100 pb-1 border-b-2 border-gray-800 dark:border-gray-100 mb-3">
              Education
            </h2>
            {education.map((edu, i) => (
              <div key={i} className={`${i < education.length - 1 ? 'mb-4' : ''} ${i > 0 ? 'pt-3 border-t border-dotted border-neutral-400' : ''}`}>
                <p className="font-bold text-lg text-gray-800 dark:text-gray-100">{edu.degree}</p>
                <p className="font-bold mb-1 text-base highlight-color">{edu.institution}</p>
                <p className="text-gray-600 dark:text-gray-300 text-xs mb-2">
                  <CalendarIcon />
                  <span className="italic mr-2">{edu.timeSpan}</span>
                  <MapPinIcon />
                  <span className="italic mr-2">{edu.location}</span>
                  <AcademicCapIcon />
                  <span className="italic">GPA {edu.gpa}</span>
                </p>
                {edu.items && edu.items.length > 0 && (edu.items.length === 1 ? 
                (<span className="text-sm text-gray-600 dark:text-gray-300 italic">{md(edu.items[0])}</span>) : 
                (<ul className="text-sm text-gray-600 dark:text-gray-300 italic list-disc ml-5">
                    {edu.items.map((item, j) => (
                      <li key={j}>{md(item)}</li>
                    ))}
                  </ul>
                ))}
              </div>
            ))}
          </section>
        </div>

        <div className={`right-column sm:${rightColumn}`}>
          <section className="mb-5 break-inside-avoid-page">
            <h2 className="text-xl font-semibold uppercase text-gray-800 dark:text-gray-100 pb-1 border-b-2 border-gray-800 dark:border-gray-100 mb-2">
              Skills
            </h2>
            {skills.map((skill, i) => (
              <div key={i} className="skill-item mb-2 text-sm">
                <span className="text-sm font-bold text-gray-600 dark:text-gray-300 mb-1">{skill.category}:</span>
                {' '}
                <span className="text-sm text-gray-600 dark:text-gray-300">{skill.items.map(md).join(', ')}</span>
              </div>
            ))}
          </section>

          <section className="mb-5 break-inside-avoid-page">
            <h2 className="text-xl font-semibold uppercase text-gray-800 dark:text-gray-100 pb-1 border-b-2 border-gray-800 dark:border-gray-100 mb-3">
              Achievements
            </h2>
            {achievements.map((achievement, i) => (
              <div key={i} className={`mb-3 text-sm${i > 0 ? ' pt-3 border-t border-dotted border-neutral-400' : ''}`}>
                <p className="font-bold text-base text-gray-800 dark:text-gray-100 flex items-center">
                  <span className="highlight-color mr-1 text-sm mb-1">✓</span>
                  {achievement.title}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{md(achievement.description)}</p>
              </div>
            ))}
          </section>

          <section className="projects">
            <h2 className="text-xl font-semibold uppercase text-gray-800 dark:text-gray-100 pb-1 border-b-2 border-gray-800 dark:border-gray-100 mb-3">
              Projects
            </h2>
            {projects.map((project, i) => (
              <div key={i} className={`text-sm break-inside-avoid-page${i < projects.length - 1 ? ' mb-1 pb-3 border-b border-dotted border-neutral-400' + (projectNoPrintBorderIdx.includes(i) ? ' print-border-none' : '') : ' mb-4'}`}>
                <p className="font-bold text-gray-800 dark:text-gray-100 mb-1">{project.name}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {md(project.description)}{' '}
                </p>
                {project.link && <a className="highlight-color break-all" href={project.link}>{project.link.replaceAll(/^https?:\/\/(www)?/gi, '')}</a>}
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
