import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';

import {NavBar, navBarHeight} from './NavBar';
import Header from './Header';
import Main from './Main';
import { Footer, footerHeight } from './Footer';
import Home from './Home'
import Projects from './Projects'
import Resume from './Resume'

export var myPages = [];
myPages['Home'] =
  {pagetitle: "Greg DiCristofaro",
  name: "Home",
  href: "/",
  content: (<Home/>)};
myPages['Projects'] =
  {pagetitle: "Greg DiCristofaro - Projects",
  name: "Projects",
  href: "/projects",
  content: (<Projects/>)};
myPages['Resume'] =
  {pagetitle: "Greg DiCristofaro - Resum&eacute;",
  name: "Resum&eacute;",
  href: "/resume",
  content: (<Resume/>)};

export var indexedPages = [myPages['Home'], myPages['Projects'], myPages['Resume']];

const minDesktopWidth = 700;

export default class BodyContent extends React.Component {
  constructor(props, context) {
    super(props, context);
    var that = this;
    this.resizeEvent = function(e) {
      that.setState({"windowWidth" : window.innerWidth, "windowHeight": window.innerHeight})
    }
  }

  componentWillMount() {
    window.addEventListener('resize',this.resizeEvent);
    this.resizeEvent();
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEvent);
  }

  render () {
    const mobileView = this.state.windowWidth < minDesktopWidth;
    const bodyHeight = (this.state.windowHeight - navBarHeight - footerHeight);
    const main = (
      <div
        className="main"
        style={{minHeight: bodyHeight + "px"}}
      >
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
      </div>);

    // change order for container reflecting mobile view
    const stickyContainer = (mobileView) ?
    (<StickyContainer>
      <Sticky stickyStyle={{zIndex: 9999}}>
        <NavBar pages={indexedPages} mobileView={mobileView} location={this.props.location}/>
      </Sticky>
      <Header pages={indexedPages} location={this.props.location}/>
      {main}
      <Footer/>
    </StickyContainer>) :
      (<StickyContainer>
        <Header pages={indexedPages} location={this.props.location}/>
        <Sticky stickyStyle={{zIndex: 9999}}>
          <NavBar pages={indexedPages} mobileView={mobileView} location={this.props.location}/>
        </Sticky>
        {main}
        <Footer/>
      </StickyContainer>);

    return (
      <div
        className='bodycontent'
        style={{padding: '0px', margin: '0px', height: '100%', position: 'relative'}}
      >
        {stickyContainer}
      </div>
    );
  }
}

BodyContent.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object
};
