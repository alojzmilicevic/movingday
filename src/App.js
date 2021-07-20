// @flow
import { Container, makeStyles } from "@material-ui/core";
import { InputForm } from "./notes/input/InputForm";
import './style.css';
import { ModalRoot } from "./shared/modal/Modal";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "./notes/store/notes.reducers";
import type { Box } from "./notes/store/notes.reducers";
import { Note } from "./notes/Note";
import Masonry from "react-masonry-css";
import { init } from "./firebase/firebase.actions";

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
  },
});

const breakpointColumnsObj = {
  default: 5,
  1280: 4,
  1000: 3,
  800: 2,
  460: 1,
};

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const notes = useSelector(getNotes);

  useEffect(() => {
    dispatch(init())
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <div style={{ marginTop: 56 }}/>
      <ModalRoot/>
      <div className={classes.content}>
        <InputForm/>
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((boxes: Box[], index) => boxes.content.length !== 0 ?
          <Note id={index} key={"id" + index} boxes={boxes}/> : null)}
      </Masonry>
    </Container>

  );
}

export default App;
