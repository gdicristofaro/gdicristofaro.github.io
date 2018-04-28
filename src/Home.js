import React from 'react'
import {Link} from 'react-router-dom'

export default class Home extends React.Component {
  render () {
    return (
      <div style={{display: 'block'}}>
        <h1 style={{textAlign: "center"}}>Hello!</h1>
        <img src="img/profile.jpg" alt="my profile" style={{float: "left", marginRight: "10px", height: "200px"}} />
        <p style={{marginTop: 0}}>Hello, and welcome to my website.  I write software and play music.  You can read more about my work history on my <Link to="/resume">resum&eacute;</Link>.  Also, you can find some of my <Link to="/projects">software projects</Link> on this website.  All of these projects can also be found on my <a href="https://github.com/gdicristofaro">GitHub account</a> as well.  If you have any questions, feel free to email me at <a href="mailto:gregdicristofaro@gmail.com">gregdicristofaro@gmail.com</a>.</p>
        <p>Thanks,</p>
        <p>Greg DiCristofaro</p>
      </div>
    );
  }
}
