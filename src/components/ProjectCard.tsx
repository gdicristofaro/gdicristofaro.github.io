import React from "react";

const ProjectCard = (props: {
  img: string;
  header: string;
  subheader?: string;
  description: string;
  href: string;
  alternateHref?: string;
  alternateHrefTitle?: string;
}) => {
  const { img, header, description, href, alternateHref, alternateHrefTitle } =
    props;

  return (
    <div className="m-2.5 inline-block max-w-87.5 overflow-hidden rounded-lg bg-card text-left align-top text-body shadow-md">
      <a href={href} className="block">
        <img
          src={img}
          title={header}
          alt={header}
          className="h-50 w-full object-cover brightness-80 transition-[filter] duration-500 hover:brightness-100"
        />
      </a>
      <div className="p-4">
        <h1 className="mb-2 text-2xl font-medium leading-tight">{header}</h1>
        <p className="text-sm">{description}</p>
      </div>
      {alternateHref && (
        <div className="px-4 pb-3">
          <a
            href={alternateHref}
            className="inline-block text-sm font-semibold uppercase text-link hover:text-link-hover"
          >
            {alternateHrefTitle}
          </a>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
