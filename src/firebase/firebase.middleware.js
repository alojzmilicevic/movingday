import { CREATE_BOX, DELETE_BOX, UPDATE_BOX } from "../notes/store/notes.actions";
import FirebaseAPI from "./firebaseApi";
import { INIT } from "./firebase.actions";

let FB;

const firebaseMiddleware = store => next => (action) => {
  switch (action.type) {
    case INIT:
      FB = new FirebaseAPI(
        store,
        store.dispatch,
      );
      next(action);
      break;
    case UPDATE_BOX:
    case CREATE_BOX:
    case DELETE_BOX:
      next(action);
      FB.saveData();
      break;
    default:
      return next(action);
  }

  return false;
};

export default firebaseMiddleware;