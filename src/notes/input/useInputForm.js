import { COLORS } from "../../shared/constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBox } from "../store/notes.actions";

export function useInputForm() {
  const [color, setColor] = useState(COLORS.WHITE);
  const [formIsOpen, setFormIsOpen] = useState(false);

  const dispatch = useDispatch();

  const createNewItem = (values) => dispatch(createBox(values))
  const closeForm = () => setFormIsOpen(false);
  const openForm = () => setFormIsOpen(true);

  const submitForm = (handleSubmit, form) => {
    handleSubmit();
    form.reset();
  }

  return {
    color,
    setColor,
    formIsOpen,
    createNewItem,
    closeForm,
    openForm,
    submitForm,
  };
}