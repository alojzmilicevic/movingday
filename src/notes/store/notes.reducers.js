import * as Actions from './notes.actions';
import type { Action } from "./notes.actions";
import { COLOR_INDEX, createOwnerString } from "../../shared/constants";
import { v4 } from 'uuid';

export interface Box {
  id: number,
  owner: string,
  content: string,
  name: string,
}

export interface Note {
  id: number,
  title: string,
  content: Box [],
  color: string,
}

interface State {
  notes: Note[],
}

export const initialState: State = {
  loadingData: false,
  notes: [],
};

const countOccurrences = (arr, val) => {
  let i = 1;

  arr.forEach(cur => {
    if (cur.owner === val) {
      i += 1;
    }
  })

  return i;
};

export function notesReducer(state = initialState, action: Action) {
  switch (action.type) {
    case Actions.SET_NOTES:
      return { ...state, notes: action.payload }
    case Actions.CREATE_BOX:
      const { owner, content, color } = action.payload;

      const noteCopy = [...state.notes];
      const notes_arr = noteCopy[COLOR_INDEX[color]].content;

      const box = {
        owner,
        content,
        color,
        id: v4(),
        name: createOwnerString(owner, countOccurrences(notes_arr, owner))
      };
      notes_arr.push(box);

      return { ...state, notes: noteCopy };

    case Actions.DELETE_BOX: {
      const { boxId, parentId } = action.payload;

      const cpy = [...state.notes];
      const content = cpy[parentId].content;

      cpy[parentId].content = content.filter((item) => item.id !== (boxId));

      return { ...state, notes: cpy };
    }
    case Actions.UPDATE_BOX: {
      const { content, boxId, parentId } = action.payload;

      const notesCopy = [...state.notes];
      if (content === notesCopy[parentId].content[boxId].content) return state;

      notesCopy[parentId].content[boxId].content = content;

      return { ...state, notes: notesCopy };
    }
    default:
      return state
  }
}

export const getNotes = (state) => state.notes.notes;
export const isLoadingNotes = (state) => state.notes.loadingData;

