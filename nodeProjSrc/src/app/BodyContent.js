import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Home from './Home'
import Projects from './Projects'
import Resume from './Resume'

export var myPages = [];
myPages['Home'] = {pagetitle: "Greg DiCristofaro", name: "Home", href: "/", content: (<Home/>)};
myPages['Projects'] = {pagetitle: "Greg DiCristofaro - Projects", name: "Projects", href: "/projects", content: (<Projects/>)};
myPages['Resume'] = {pagetitle: "Greg DiCristofaro - Resum&eacute;", name: "Resum&eacute;", href: "/resume", content: (<Resume/>)};

export var indexedPages = [myPages['Home'], myPages['Projects'], myPages['Resume']];



export default class BodyContent extends React.Component {
  render () {
    return (
      <div className='bodycontent' style={{padding: '0px', margin: '0px'}}>
        <Header pages={indexedPages} location={this.props.location}/>

        <div className="main">
          <ReactCSSTransitionGroup
            component="div"
            transitionName="pagetransition"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {React.cloneElement(this.props.children, {
              key: this.props.location.pathname
            })}
          </ReactCSSTransitionGroup>
        </div>
        <Footer/>
      </div>
    );
  }
}

BodyContent.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object
};
