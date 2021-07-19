// @flow
import React from 'react';
import { Card, CardHeader, Divider, makeStyles } from "@material-ui/core";
import { Box } from "./Box";
import { v4 } from "uuid";

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
  boxes: Box[],
}

export const Note = (props: Props) => {
  const { boxes, id } = props;
  const { title, content, color } = boxes;
  const classes = useStyles({ backgroundColor: color });

  if (content.length === 0 ) return null;

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeader}
        title={title}
        titleTypographyProps={{
          variant: 'subtitle2'
        }}
      />
      {content.map((data, index) => <React.Fragment key={v4()}>
        <Box key={JSON.stringify(data)} data={data} parent={id} index={index}/>
        {index !== content.length - 1 && <Divider/>}
      </React.Fragment>)}
    </Card>
  )
}