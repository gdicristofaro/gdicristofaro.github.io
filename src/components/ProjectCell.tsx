import React from 'react';


const ProjectCell = (props: {
  img: string,
  header: string,
  subheader?: string,
  description: string,
  href: string,
  alternateHref?: string,
  alternateHrefTitle?: string}) => {

  const {img, header, description, href, alternateHref, alternateHrefTitle} = props;

  return (
    <div className="m-[10px] inline-block max-w-[350px] overflow-hidden rounded-lg bg-card text-left align-top text-body shadow-md">
      <a href={href} className="block">
        <img
          src={img}
          title={header}
          alt={header}
          className="h-[200px] w-full object-cover brightness-[.85] transition-[filter] duration-500 hover:brightness-100"
        />
      </a>
      <div className="p-4">
        <h1 className="mb-2 text-[24px] font-medium leading-[1.25]">{header}</h1>
        <p className="text-[14px]">{description}</p>
      </div>
      {alternateHref && (
        <div className="px-4 pb-3">
          <a href={alternateHref} className="inline-block text-sm font-medium uppercase text-link hover:text-link-hover">
            {alternateHrefTitle}
          </a>
        </div>
      )}
    </div>
  );
}

export default ProjectCell;
