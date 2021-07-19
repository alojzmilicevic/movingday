import { combineReducers } from 'redux'
import { notesReducer } from "../notes/store/notes.reducers";
import modal from "../shared/modal/store/modal.reducer";

const rootReducer = combineReducers({
  notes: notesReducer,
  modal: modal,
})

export default rootReducer
