import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Page = () => (
  <div className="homepage-main page-transition page-content mt-8">
    <div className="homepage-profile-picture" >
      <Image unoptimized fill src="/img/profile.jpg" alt="my profile picture" />
    </div>
    <p className="homepage-paragraph description-text">
      Hello, and welcome to my website.
      You can read more about my work history on my <Link href="/resume">resum&eacute;</Link>.
      Also, you can find some of my <Link href="/projects">software projects</Link> on this website.
      All of these projects can also be found on my <a href="https://github.com/gdicristofaro">GitHub account</a> as well.
      If you have any questions, feel free to email me at <a href="mailto:gregdicristofaro@gmail.com">gregdicristofaro@gmail.com</a>.</p>
    <p className="homepage-paragraph description-text">Thanks,</p>
    <p className="homepage-paragraph description-text">Greg DiCristofaro</p>
  </div>
);

export default Page;