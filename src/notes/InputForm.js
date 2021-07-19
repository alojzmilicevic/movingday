// @flow
import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { TextField, Select } from 'mui-rff';
import {
  Button,
  Card,
  CardActions as MuiCardActions,
  makeStyles,
  CardHeader,
  CardContent,
  Divider,
  MenuItem,
  ClickAwayListener,
  Collapse,
} from "@material-ui/core";
import { COLORS, PEOPLE } from "../shared/constants";
import { ColorPicker } from "../shared/ColorPicker";
import { useDispatch } from "react-redux";
import { createBox } from "./store/notes.actions";

const useStyles = makeStyles({
  root: {
    width: '50%',
  },
  card: {
    backgroundColor: props => props.backgroundColor,
    padding: '0px 16px',
    boxShadow: '0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)'
  },
  cardContent: {
    padding: "8px 0px",
    "&:last-child": {
      paddingBottom: 0
    }
  },
  actions: {
    display: 'flex',
    padding: 4,
  },
  noteInput: {
    fontSize: 12,
  },
  header: {
    padding: "16px 0px 0px 0px",
  },
  avatar: {
    width: '100%',
  }
});

export const InputForm = () => {
  const [color, setColor] = useState(COLORS.WHITE);
  const classes = useStyles({ backgroundColor: color });
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  async function onSubmit(values: FormData) {
    dispatch(createBox(values));
  }

  const handleClickAway = () => {
    setOpen(false);
  };

  const CardActions = ({ form }) =>
    <MuiCardActions className={classes.actions}>
      <ColorPicker color={color} setColor={setColor}/>
      <Button onClick={form.reset}>Reset</Button>
      <Button type={'submit'}>Create</Button>
    </MuiCardActions>

  const Header = () => <div>
    <CardHeader
      className={classes.header}
      classes={{ avatar: classes.avatar }}
      avatar={
        <Select
          multiline
          onClick={() => setOpen(true)}
          name="owner"
          label={"Owner"}
        >
          <MenuItem value={PEOPLE.NONE}>None</MenuItem>
          <MenuItem value={PEOPLE.ALMA}>Alma</MenuItem>
          <MenuItem value={PEOPLE.ALOJZ}>Alojz</MenuItem>
        </Select>

      }/>
    <Divider/>
  </div>

  const Content = () => <CardContent className={classes.cardContent}>
    <TextField
      multiline
      onClick={() => setOpen(true)}
      InputProps={{ disableUnderline: true, classes: { input: classes.noteInput } }}
      placeholder={"Create note ..."}
      name="content"
      required
      type={"text"}
    />
    <TextField style={{ display: "none" }} value={color} name={"color"}/>
  </CardContent>

  return (
    <Form
      initialValues={{ owner: PEOPLE.NONE, color: color }}
      onSubmit={onSubmit}
      render={({ handleSubmit, form, values }) => (
        <ClickAwayListener mouseEvent={'onMouseUp'} onClickAway={handleClickAway}>
          <form
            id={'myForm'}
            className={classes.root}
            onSubmit={(e) => {
              handleSubmit(e);
              form.reset();
            }
            }
          >
            <Card className={classes.card}>
              <Collapse in={open}>
                <Header/>
              </Collapse>
              <Content/>
              <Collapse in={open}>
                <CardActions form={form}/>
              </Collapse>
            </Card>
          </form>
        </ClickAwayListener>

      )}
    />
  );
}