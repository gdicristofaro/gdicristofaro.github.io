import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="homepage-main page-transition page-content mt-8">
    <div className="homepage-profile-picture">
      <img
        src="/img/profile.jpg"
        alt="my profile picture"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
    <p className="homepage-paragraph description-text">
      Hello, and welcome to my website.
      You can read more about my work history on my <Link to="/resume">resum&eacute;</Link>.
      Also, you can find some of my <Link to="/projects">software projects</Link> on this website.
      All of these projects can also be found on my <a href="https://github.com/gdicristofaro">GitHub account</a> as well.
      If you have any questions, feel free to email me at <a href="mailto:gregdicristofaro@gmail.com">gregdicristofaro@gmail.com</a>.
    </p>
    <p className="homepage-paragraph description-text">Thanks,</p>
    <p className="homepage-paragraph description-text">Greg DiCristofaro</p>
  </div>
);

export default Home;
