import React from 'react';
import ProjectCell from './ProjectCell'

var projData = [
  {
    img: 'constantqtransform.png',
    header: 'Constant Q Transform',
    description: "In this project, someone can view all the pitches in a piece of music. ConstantQJs utilizes Benjamin Blankertz's algorithm implementing the Constant Q Transform.",
    href: 'https://github.com/gdicristofaro/constantqjs',
    alternateHref: 'https://gdicristofaro.github.io/constantqjs/',
    alternateHrefTitle: 'Live Demo'
  },
  {
    img: 'calendarmaker.png',
    header: 'CalendarMaker',
    description: "Generates powerpoint of year long calendar with custom events, pictures and banners written with react, material ui and PptxGenJS",
    href: 'https://www.github.com/gdicristofaro/CalendarMaker',
    alternateHref: 'https://gdicristofaro.github.io/CalendarMaker/',
    alternateHrefTitle: 'Live Demo'
  },
  {
    img: 'psdtosvg.png',
    header: 'PSDtoSVG',
    description: "Using python, this app creates an svg by generating svg paths for all layers of an svg except for the bottom most layer.  The bottom most layer is converted to a dataurl to be embedded in the svg.  The generated svg can be utilized for various data visualizations.",
    href: 'https://www.github.com/gdicristofaro/PSDtoSVG',
    alternateHref: 'https://psdtosvg.herokuapp.com/',
    alternateHrefTitle: 'Live Demo'
  },
  {
    img: 'mapmaker.png',
    header: 'MapMaker',
    description: "Generates a map of the world with a map for a particular country superimposed using angular 2 and js canvas for image rendering.  The generated image is divided into quarters for easy printing.",
    href: 'https://www.github.com/gdicristofaro/MapMaker',
    alternateHref: 'https://gdicristofaro.github.io/MapMaker/',
    alternateHrefTitle: 'Live Demo'
  },
  {
    img: 'seamCarve.png',
    header: 'Seam Carve',
    description: "Scala implementation of the Seam-Carving Algorithm. This project was first created in 2013.  The project utilizes play framework, xuggle, nodejs/npm/gulp, material ui, fancybox, jquery, react, react dropzone, react swipeable views, and whammy.",
    href: 'https://github.com/gdicristofaro/SeamCarve',
    alternateHref: 'https://seamcarve.herokuapp.com/',
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
        <p>Here are some of the projects I have created.</p>
        {projData.map((dataObj, i) => (
          <ProjectCell {...dataObj}
            style={{
              maxWidth: "350px",
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
