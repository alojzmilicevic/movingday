// @flow
import React from 'react';
import { Form } from 'react-final-form';
import { TextField } from 'mui-rff';
import {
  Button,
  Card,
  CardActions as MuiCardActions,
  makeStyles,
  CardContent,
  ClickAwayListener,
  Collapse,
} from "@material-ui/core";
import { PEOPLE } from "../../shared/constants";
import { ColorPicker } from "../../shared/ColorPicker";
import { useInputForm } from "./useInputForm";
import { CollapsableSelect } from "./CollapsableSelect";

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
});

export const InputForm = () => {
  const { formIsOpen, color, setColor, createNewItem, openForm, closeForm, submitForm } = useInputForm();
  const classes = useStyles({ backgroundColor: color });

  const CardActions = ({ form }) =>
    <MuiCardActions>
      <ColorPicker color={color} setColor={setColor}/>
      <Button onClick={form.reset}>Reset</Button>
      <Button type={'submit'}>Create</Button>
    </MuiCardActions>

  const Content = () => <CardContent className={classes.cardContent}>
    <TextField
      multiline
      onClick={openForm}
      InputProps={{ disableUnderline: true }}
      placeholder={"Create note ..."}
      name="content"
      required
      type={"text"}
    />
  </CardContent>

  return (
    <Form
      initialValues={{ owner: PEOPLE.NONE, color: color }}
      onSubmit={createNewItem}
      render={({ handleSubmit, form }) => (
        <ClickAwayListener mouseEvent={'onMouseUp'} onClickAway={closeForm}>
          <form
            className={classes.root}
            onSubmit={(e) => submitForm(() => handleSubmit(e), form)}
          >
            <Card className={classes.card}>
              <CollapsableSelect formIsOpen={formIsOpen}/>
              <Content/>
              <Collapse in={formIsOpen}>
                <CardActions form={form}/>
              </Collapse>
            </Card>
          </form>
        </ClickAwayListener>

      )}
    />
  );
}