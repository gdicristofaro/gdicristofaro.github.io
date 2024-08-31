import { CardActions, Button, Card, CardMedia, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';


export default (props: { 
  img: any, 
  style: any,
  header: string, 
  subheader?: string, 
  description: string,
  href: string, 
  alternateHref?: string, 
  alternateHrefTitle?: string}) => {

  let [mouseEntered, setMouseEntered] = useState(true);
  let {img, header, subheader, description, href, alternateHref, alternateHrefTitle, style} = props;

  let alternateLink = alternateHref ?
      (<CardActions>
        <Button size="small" color="primary" href={alternateHref}>
          {alternateHrefTitle}
        </Button>
      </CardActions>) :
      undefined;



  var imgStyle = mouseEntered ?
    { transition: ".5s", height: 200 } :
    { filter: "brightness(50%)", transition: ".5s", height: 200 };

  return (
    <Card style={style}>
      <a href={href}
        className="projectLink"
        onMouseEnter={() => setMouseEntered(true)}
        onMouseLeave={() => setMouseEntered(false)}
      >
        <CardMedia
          image={img}
          title={header}
          style={imgStyle}
        />
      </a>
      <CardContent>
        <Typography gutterBottom component="h2"
          style={{ fontSize: '1.5rem', fontWeight: 400, lineHeight: '1.35417em' }}
        >
          {header}
        </Typography>
        <Typography component="p"
          style={{ fontSize: '0.875rem', fontWeight: 400, lineHeight: '1.46429em' }}
        >
          {description}
        </Typography>
      </CardContent>
      {alternateLink}
    </Card>
  );
}