import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { makeStyles } from '@material-ui/core/styles';
import ContentBoxEditModal from './ContentBoxEditModal';
import { getBackgroundColor, getModalProps, getModalType } from "./store/modal.reducer";
import { hideModal } from "./store/modal.actions";

export const ModalTypes = {
  NONE: -1,
  BOX_EDIT: 0,
};

const ModalComponents = {
  [ModalTypes.BOX_EDIT]: ContentBoxEditModal,
};

const useStyles = makeStyles({
  overlay: {
    display: 'flex',
    padding: 16,
    backgroundColor: props => props.backgroundColor,
    minWidth: 350,
    maxWidth: 450,
    boxShadow: '0 4px 23px 0 rgba(0,0,0,0.08)',
    outline: 0,
  },
});

export const ModalRoot = () => {
  const dispatch = useDispatch();
  const modalType = useSelector(getModalType);
  const modalProps = useSelector(getModalProps);
  const backgroundColor = useSelector(getBackgroundColor);

  const classes = useStyles({ backgroundColor });

  if (modalType === ModalTypes.NONE) return null;

  const SpecificModal = ModalComponents[modalType];

  return (
    <Modal
      closeTimeoutMS={500}
      isOpen
      onRequestClose={() => dispatch(hideModal())}
      className={classes.overlay}
      ariaHideApp={false}
    >
      <SpecificModal {...modalProps} />
    </Modal>
  );
}
