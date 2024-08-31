/**
 TODO:
 project cells - get video and demo up and running
 resume
 */


import React from 'react'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom'
import { CSSTransition, TransitionGroup } from "react-transition-group";

import BodyContent from './BodyContent'
import Home from './Home'
import Projects from './Projects'
import Resume from './Resume'

/**
 * simple error page
 */
class UhOh extends React.Component {
  render() {
    return (
      <div style={{marginBottom: "500px"}}>
        <h1>There was an error</h1>
        <p>Click <Link to="/">here</Link> to go back to the main page</p>
      </div>);
    }
}


ReactDOM.render(
  <Router>
    <Route
      render={({ location }) => (
        <BodyContent>
            <TransitionGroup>
              <CSSTransition key={location.pathname} classNames="pagetransition" timeout={300}>
                <Switch location={location}>
                  <Route path="/" exact={true} component={Home} />
                  <Route path="/projects" exact={true} component={Projects} />
                  <Route path="/resume" exact={true} component={Resume} />
                  <Route component={UhOh} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
        </BodyContent>
      )}
    />
  </Router>,
  document.getElementById("root"));