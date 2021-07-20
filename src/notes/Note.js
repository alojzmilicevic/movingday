// @flow
import React, { Fragment } from 'react';
import { Card, CardHeader, Divider, makeStyles } from "@material-ui/core";
import { ContentBox } from "./ContentBox";

const useStyles = makeStyles(theme => ({
  root: {
    border: '1px solid rgba(51,51,51,0.11)',
    backgroundColor: props => props.backgroundColor,
    borderRadius: 10,
  },
  cardHeader: {
    padding: '12px 16px 4px',
  }
}));

interface Props {
  id: number,
  boxes: ContentBox[],
}

/*
* This class corresponds to one Note, one Note = one Room.
* */
export const Note = ({ boxes, id }: Props) => {
  const { title, content, color } = boxes;
  const classes = useStyles({ backgroundColor: color });

  if (content.length === 0) return null;

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeader}
        title={title}
        titleTypographyProps={{ variant: 'subtitle2' }}
      />
      {content.map((data, index) => {
        data.parent = id;
        data.index = index;
        return <Fragment key={`${index}:${id}`}>
          <ContentBox {...data} />
          {index !== content.length - 1 && <Divider/>}
        </Fragment>;
      })}
    </Card>
  )
}