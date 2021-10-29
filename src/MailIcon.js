import React from 'react'

export class MailPath extends React.Component {
  render() {
    return (<path
      d="M 18,0 H 2 C 0.9,0 0.01,0.9 0.01,2 L 0,14 c 0,1.1 0.9,2 2,2 h 16 c 1.1,0 2,-0.9 2,-2 V 2 C 20,0.9 19.1,0 18,0 z m 0,14 H 2 V 4 l 8,5 8,-5 V 14 z M 10,7 2,2 h 16 l -8,5 z" />);
  }
}

// taken from https://design.google.com/icons/
export default class MailIcon extends React.Component {
  render() {
    return (<svg 
              version="1.1" 
              title="Email" 
              className="MailIcon" 
              x="0px" y="0px" 
              style={this.props.style}
      	      viewBox="0 0 20 16"
            >
              <MailPath/>
            </svg>);
  }
}

