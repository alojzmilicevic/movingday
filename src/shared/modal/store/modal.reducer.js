import { HIDE_MODAL, SHOW_MODAL } from './modal.actions';
import { createSelector } from 'reselect'
import { COLORS, getColorFromParent } from "../../constants";

const initialState = {
  modalType: -1,
}

function modal(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modalType: action.modalType,
        modalProps: action.modalProps,
      };

    case HIDE_MODAL:
      return { ...state, modalProps: {}, modalType: -1 };

    default:
      return state;
  }
}

export const getModalType = state => state.modal.modalType;
export const getModalProps = state => {
  return state.modal.modalProps;
};
export const getBackgroundColor = createSelector(
  getModalProps,
  modalProps => modalProps ? getColorFromParent(modalProps.parent) : COLORS.WHITE
)

export default modal;