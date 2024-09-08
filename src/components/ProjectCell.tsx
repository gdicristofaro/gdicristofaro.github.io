import { CardActions, Button, Card, CardMedia, CardContent, Typography } from '@mui/material';
import React from 'react';


export default (props: { 
  img: any, 
  header: string, 
  subheader?: string, 
  description: string,
  href: string, 
  alternateHref?: string, 
  alternateHrefTitle?: string}) => {

  let {img, header, description, href, alternateHref, alternateHrefTitle} = props;

  let alternateLink = alternateHref ?
      (<CardActions>
        <Button size="small" color="primary" href={alternateHref}>
          {alternateHrefTitle}
        </Button>
      </CardActions>) :
      undefined;

  return (
    <Card className="ProjectCell">
      <a href={href}
        className="projectLink"
      >
        <CardMedia
          component="img"
          src={img}
          title={header}
          className='ProjectCellImage'
        />
      </a>
      <CardContent>
        <Typography gutterBottom component="h1" className="ProjectCellTitle">
          {header}
        </Typography>
        <Typography component="p" className="ProjectCellParagraph">
          {description}
        </Typography>
      </CardContent>
      {alternateLink}
    </Card>
  );
}