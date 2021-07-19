// @flow
import type { Box } from "./notes.reducers";

export interface Action {
  type: string,
  payload?: any,
}

export const CREATE_BOX = 'CREATE_BOX';
export const DELETE_BOX = 'DELETE_BOX';
export const UPDATE_BOX = 'UPDATE_BOX';
export const SET_NOTES = 'SET_NOTES';

export const setNotes: Action = payload => ({
  type: SET_NOTES,
  payload,
})

export const createBox: Action = (payload: Box) => ({
  type: CREATE_BOX,
  payload,
});

export const deleteBox: Action = (payload: { parentId: number, boxId: number, owner: number }) => ({
  type: DELETE_BOX,
  payload,
})

export const updateBox: Action = (payload: { content: string, parentId: number, boxId: number }) => ({
  type: UPDATE_BOX,
  payload,
})
