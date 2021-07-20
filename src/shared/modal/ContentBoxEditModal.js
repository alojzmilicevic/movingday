import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, InputBase, Typography } from "@material-ui/core";
import { getRoomString } from "../constants";
import { hideModal } from "./store/modal.actions";
import { useDispatch } from "react-redux";
import * as NotesActions from "../../notes/store/notes.actions";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%'
  },
  header: {
    paddingBottom: theme.spacing(1),
    fontWeight: 500,
  },
  footer: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing(1),
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: 'white',
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    }
  }
}));

interface Props {
  data: any,
  index: number,
  parent: number,
}

function useBoxEdit({ content, parent, id, owner, index }) {
  const [text, setText] = useState(content);
  const dispatch = useDispatch();

  const closeModal = () => dispatch(hideModal());
  const deleteBox = (e) => {
    dispatch(NotesActions.deleteBox({ parentId: parent, boxId: id, owner }));
    closeModal();
    e.stopPropagation();
  };

  const updateBox = () => {
    dispatch(NotesActions.updateBox({ content: text, parentId: parent, boxId: index }))
    closeModal();
  }

  const updateText = (e) => setText(e.target.value);

  return { updateText, deleteBox, updateBox };
}


/*
* This component is a MODAL that opens when u press a ContentBox
* */
const ContentBoxEditModal = (props: Props) => {
  const { parent, content, name } = props;

  const { updateText, deleteBox, updateBox } = useBoxEdit(props);

  const classes = useStyles();

  const Header = () => <div className={classes.header}>
    <Typography
      variant={"subtitle1"}
      display={"inline"}
    >
      {`${getRoomString(parent)} `}
    </Typography>
    <Typography
      variant={"body1"}
      display={"inline"}
    >
      ({name})
    </Typography>
  </div>

  return (
    <div className={classes.root}>
      <Header/>
      <InputBase onChange={updateText} defaultValue={content} multiline/>
      <div className={classes.footer}>
        <Button
          size={'small'}
          onClick={deleteBox}
          endIcon={<DeleteIcon/>}
          variant={'contained'}
          className={classes.deleteButton}
        >
          Delete
        </Button>
        <Button onClick={updateBox}>Save</Button>
      </div>
    </div>
  );
};

export default ContentBoxEditModal;
