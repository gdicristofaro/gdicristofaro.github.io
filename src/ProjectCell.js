import React from 'react';
import Card, {CardMedia, CardContent, CardActions} from 'material-ui/Card';
import Button from 'material-ui/Button';

import Typography from 'material-ui/Typography';



var IMG_BASEPATH = "img/";

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

  render() {
    var onMouseEnter = () => this.setState({mouseEntered: true});
    var onMouseOut = () => this.setState({mouseEntered: false});

    var alternateLink =
      (this.props.alternateHref !== undefined) ?
        (<CardActions>
          <Button size="small" color="primary" href={this.props.alternateHref}>
            {this.props.alternateHrefTitle}
          </Button>
        </CardActions>) :
        null;

        
    
    var imgStyle = (this.state.mouseEntered) ?
      {transition: ".5s", height: 200} :
      {filter: "brightness(50%)", transition: ".5s", height: 200};

    return (
      <Card style={this.props.style}>
        <a href={this.props.href} 
          className="projectLink" 
          onMouseEnter={onMouseEnter} 
          onMouseLeave={onMouseOut}
        >
          <CardMedia
            image= {IMG_BASEPATH + this.props.img}
            title={this.props.header}
            style={imgStyle}
          />
        </a>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2"
            style={{ fontSize: '1.5rem', fontWeight: 400, lineHeight: '1.35417em'}}
          >
            {this.props.header}
          </Typography>
          <Typography component="p" 
            style={{ fontSize: '0.875rem', fontWeight: 400, lineHeight: '1.46429em'}}
          >
            {this.props.description}
          </Typography>
        </CardContent>
        {alternateLink}
      </Card>
    );
  }
}
