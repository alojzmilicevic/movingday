// @flow
import React from 'react';
import {
  ListItem,
  makeStyles,
  Typography
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { ModalTypes } from "../shared/modal/Modal";
import { showModal } from "../shared/modal/store/modal.actions";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "transparent",
    padding: '4px 16px 4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    "&:hover": {
      backgroundColor: 'rgba(1,1,1,0.08)',
      cursor: 'pointer',
    }
  },
  content: {
    width: "inherit",
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap'
  },
}));

interface Props {
  data: {},
  parent: number,
}

// TODO: extract logic from component
export const Box = (props: Props) => {
  const classes = useStyles();
  const { content, name } = props.data;
  const dispatch = useDispatch();
  return (
    <ListItem
      onClick={() => dispatch(showModal(ModalTypes.BOX_EDIT, props))}
      className={classes.root}
    >
      <Typography variant={"caption"}> {name} </Typography>
      <div className={classes.content}>
        <Typography
          key={v4()}
          variant={"body2"}
        >
          {content}
        </Typography>
      </div>
    </ListItem>
  )
}