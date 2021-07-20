// @flow
import React from 'react';
import {
  ListItem,
  makeStyles,
  Typography
} from "@material-ui/core";
import { useDispatch } from "react-redux";
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
  wrap: {
    width: "inherit",
    wordWrap: 'break-word',
    whiteSpace: 'pre-line'
  },
}));

interface Props {
  data: {},
  parent: number,
}

function useBox(props) {
  const dispatch = useDispatch();

  const openBoxEditModal = () => dispatch(showModal(ModalTypes.BOX_EDIT, props));

  return {
    openBoxEditModal,
  }
}


/*
* This class corresponds to one moving box.
* */
export const ContentBox = (props: Props) => {
  const classes = useStyles();
  const { content, name } = props;

  const { openBoxEditModal } = useBox(props);
  return (
    <ListItem
      onClick={openBoxEditModal}
      className={classes.root}
    >
      <Typography variant={"caption"}> {name} </Typography>
      <Typography className={classes.wrap} variant={"body2"}> {content} </Typography>
    </ListItem>
  )
}