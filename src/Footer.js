
import React from 'react'

export const footerHeight = 50;

export class Footer extends React.Component {
  render() {
    return (
      <div className='footer' style={{display: 'table', height: footerHeight + "px", width: '100%'}}>
        <p style={{display: 'table-cell', verticalAlign: 'middle'}}>This website brought to you by: <a href="https://facebook.github.io/react/">React</a>, <a href="https://material-ui-next.com/">Material UI</a>, <a href="https://jquery.com/">jQuery</a> & <a href="https://design.google.com/icons/">Google's Material Icons</a>.</p>
      </div>
    );
  }
}
