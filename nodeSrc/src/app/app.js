/*
TODO:
  finish up project data
 */

import React from 'react'
import ReactDOM from 'react-dom'
import BodyContent from './BodyContent' // Our custom react component
import injectTapEventPlugin from 'react-tap-event-plugin'

import Home from './Home'
import Projects from './Projects'
import Resume from './Resume'
import { useRouterHistory, IndexRoute, Router, Route, Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {createHashHistory} from 'history'
import {imgHeaderHeight} from './Header'

injectTapEventPlugin();

class UhOh extends React.Component {
  render() {
    return (
      <div style={{marginBottom: "500px"}}>
        <h1>There was an error</h1>
        <p>Click <Link to="/">here</Link> to go back to the main page</p>
      </div>);
    }
}

const routes = (
  <Route path="/" component={BodyContent}>
    <IndexRoute component={Home}/>
    <Route path="projects" component={Projects} />
    <Route path="resume" component={Resume} />
    <Route path="*" component={UhOh}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router
      history={useRouterHistory(createHashHistory)({queryKey: false})}
    >
      {routes}
    </Router>,
    document.getElementById("app"));
});
