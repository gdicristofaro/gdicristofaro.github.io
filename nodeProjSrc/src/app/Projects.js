import React from 'react';
import ReactDOM from 'react-dom';

import ProjectCell from './ProjectCell'

var projData = [
  {
    img: 'mobileNewsWeather.png',
    header: 'Mobile News & Weather',
    description: "jQuery-based mobile application for determining local weather and news using Yahoo and Google API’s. This project was first created on October 7th, 2012 and was updated recently for changes in API's and to make use of React.",
    href: 'http://www.github.com/gdicristofaro/MobileNewsWeather',
    alternateHref: 'http://gdicristofaro.github.io/MobileNewsWeather',
    alternateHrefTitle: 'Live Demo'
  },
  {
    img: 'seamCarve.png',
    header: 'Seam Carve',
    description: "Scala implementation of the Seam-Carving Algorithm. This project was first created in 2013.  The project utilizes play framework, xuggle, nodejs/npm/gulp, material ui, fancybox, jquery, react, react dropzone, react swipeable views, and whammy.",
    href: 'https://github.com/gdicristofaro/SeamCarve',
    alternateHref: 'http://seamcarve.herokuapp.com/',
    alternateHrefTitle: 'Live Demo'
  },
  {
    img: 'NPuzzle.png',
    header: 'NPuzzle',
    description: "Android NPuzzle game with an A* search algorithm for solving.",
    href: 'https://github.com/gdicristofaro/NPuzzle'
  },
  {
    img: 'CSPSolver.png',
    header: 'CSPSolver',
    description: "Scheduling program based on the AC-3 algorithm utilizing Apache POI API to import from excel documents written in Scala.",
    href: 'https://github.com/gdicristofaro/CSPSolver'
  },
  {
    img: 'spellChecker.png',
    header: 'SpellChecker',
    description: "Spell-checking algorithm built in C, which loads and unloads a dictionary file and checks words in a dictionary utilizing a self-developed hash map with buckets.",
    href: 'https://github.com/gdicristofaro/SpellChecker'
  },
  {
    img: 'XMIParser.png',
    header: 'XMI Parser',
    description: "Parses XMI (version 1.1) and formats class information found in a class diagram into html format.",
    href: 'https://github.com/gdicristofaro/XMI-parser'
  },
  {
    img: 'wordpress.jpg',
    header: 'WordpressDownloader',
    description: "Downloads attachments listed in a WordPress export xml file.",
    href: 'https://github.com/gdicristofaro/WordpressDownloader'
  },
  {
    img: 'concentration.png',
    header: 'Concentration Game',
    description: "Memory-style game built in Java AWT and Swing, which can be configured to either use images or text for pairs.",
    href: 'https://github.com/gdicristofaro/ConcentrationGame'
  }
];


export default class Projects extends React.Component {
  render() {
    return (
      <div style={{textAlign: "center"}}>
        <h1>Projects</h1>
        <p>Here some of the projects I have created.</p>
        {projData.map((dataObj, i) => (
          <ProjectCell {...dataObj}
            style={{
              maxWidth: "300px",
              margin: "20px",
              display: "inline-block",
              verticalAlign:"top",
              textAlign: "left"}}
            key={i}
          />))}
      </div>
    );
  }
}
