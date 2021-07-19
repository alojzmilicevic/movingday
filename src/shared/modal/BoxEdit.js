import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, InputBase, Typography } from "@material-ui/core";
import { getRoomString } from "../constants";
import { hideModal } from "./store/modal.actions";
import { useDispatch } from "react-redux";
import { deleteBox, updateBox } from "../../notes/store/notes.actions";
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

// TODO: extract logic from component
const BoxEdit = (props) => {
  const { data, index, parent } = props;
  const { content, name, owner, id } = data;
  const [text, setText] = useState(content);

  const dispatch = useDispatch();
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
      <InputBase onChange={(e) => setText(e.target.value)} defaultValue={content} multiline/>
      <div className={classes.footer}>
        <Button
          size={'small'}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(hideModal());
            dispatch(deleteBox({ parentId: parent, boxId: id, owner }));
          }}
          endIcon={<DeleteIcon/>}
          variant={'contained'}
          className={classes.deleteButton}
        >
          Delete
        </Button>
        <Button onClick={() => {
          dispatch(updateBox({ content: text, parentId: parent, boxId: index }))
          dispatch(hideModal())
        }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default BoxEdit;
