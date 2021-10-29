import React from 'react'

export default class MenuIcon extends React.Component {
  render() {
    return (
      <svg version="1.1" title="Menu Icon" className="MenuIcon" x="0px" y="0px" style={this.props.style}
      	 viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
      </svg>
    )
  }
}