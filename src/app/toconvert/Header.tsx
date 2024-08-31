import React from 'react';

export const HeaderHeight = 300;

const styles = {
  header: {
    //position: 'fixed',
    width: '100%'
  },
  circleIcon: {
    height: '200px',
    margin: '0px auto',
    display: 'block'
  },
  dot: {
    fontSize: '75%'
  },
  letterhead: {
    margin: '0px',
    textAlign: 'center',
    lineHeight: 1.5
  }
};

// pages are a series of links
export default (props: {opacity: number, children: any, styles: { circleIcon: any, letterhead: any, dot: any}}) => {


// gets very upper header that disappears on scroll
  const { opacity, styles: {circleIcon, letterhead, dot}, children} = props;  

  return (
    <div className="header" style={{ margin: "0px", padding: "0px" }}>
      <div style={{ opacity: opacity, height: HeaderHeight }}>
        <img style={circleIcon} alt="a circle of me" title="A picture of me!" src='img/circleIcon.png' />
        <h1 style={letterhead}>Greg DiCristofaro</h1>
        <p style={letterhead}>
          <a href="http://www.gdicristofaro.com">www.gdicristofaro.com</a> <span style={dot}>•</span> <a href="http://www.github.com/gdicristofaro">www.github.com/gdicristofaro</a></p>
        <p style={letterhead}><a href="mailto:gregdicristofaro@gmail.com">gregdicristofaro@gmail.com</a></p>
      </div>
      {children}
    </div>
  );
}
