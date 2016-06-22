import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardTitle, CardMedia, CardText, CardActions} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const $ = require('jQuery');

/*
img
header
subheader
description
href
alternateHref
alternateHrefTitle
 */
export default class ProjectCell extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {mouseEntered: false};
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    var onMouseEnter = () => this.setState({mouseEntered: true});
    var onMouseOut = () => this.setState({mouseEntered: false});

    var alternateLink =
      (this.props.alternateHref !== undefined) ?
        (<CardActions>
          <FlatButton
          label={this.props.alternateHrefTitle}
          linkButton={true}
          href={this.props.alternateHref}
          />
        </CardActions>) :
        null;

      var imgStyle = (this.state.mouseEntered) ?
        {transition: ".3s"} :
        {filter: "brightness(50%)", transition: ".3s"};

    return(
        <Paper style={this.props.style}>
          <a href={this.props.href} className="projectLink" onMouseEnter={onMouseEnter} onMouseLeave={onMouseOut}>
            <CardMedia
                overlay={(<CardTitle title={this.props.header} subtitle={this.props.subheader}/>)}>
              <img className="projectImage" style={imgStyle} src={this.props.img} />
            </CardMedia>
          </a>
          <CardText>{this.props.description}</CardText>
          {alternateLink}
        </Paper>);
  }
}

ProjectCell.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
