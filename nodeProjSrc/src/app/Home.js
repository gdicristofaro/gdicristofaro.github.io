import React from 'react'
import {Link, Route, Router} from 'react-router'

export default class Home extends React.Component {
  render () {
    return (
      <div style={{display: 'block', overflow: 'hidden', marginBottom: '300px'}}>
        <h1 style={{textAlign: "center"}}>Hello!</h1>
        <img src="profile.jpg" style={{float: "left", marginRight: "10px", height: "200px"}} />
        <p>Hello, and welcome to my website.  I write software and teach music, and you can read more about my work history on my <Link to="/resume">resume</Link>.  Also, you can find some of my <Link to="/projects">software projects</Link> on this website.  All of these projects can also be found on my <a href="https://github.com/gdicristofaro">GitHub account</a> as well.  If you have any questions, feel free to email me at <a href="mailto: gregdicristofaro@gmail.com">gregdicristofaro@gmail.com</a>.</p>
        <p>Thanks,</p>
        <p>Greg DiCristofaro</p>
      </div>
    );
  }
}
