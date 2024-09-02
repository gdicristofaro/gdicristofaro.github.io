import Link from 'next/link';
import React from 'react'
import Image from 'next/image'

export default () => (
  <div className="homepage-main">
    <h1 className="homepage-header">Hello!</h1>
    <img className="homepage-profile-picture" src="/img/profile.jpg" alt="my profile picture" />
    <p className="homepage-paragraph">
      Hello, and welcome to my website.
      I write software and play music.
      You can read more about my work history on my <Link href="/resume">resum&eacute;</Link>.
      Also, you can find some of my <Link href="/projects">software projects</Link> on this website.
      All of these projects can also be found on my <a href="https://github.com/gdicristofaro">GitHub account</a> as well.
      If you have any questions, feel free to email me at <a href="mailto:gregdicristofaro@gmail.com">gregdicristofaro@gmail.com</a>.</p>
    <p>Thanks,</p>
    <p>Greg DiCristofaro</p>
  </div>
);