import firebase from "firebase/app";
import 'firebase/database'
import { setNotes } from "../notes/store/notes.actions";
import { getNotes } from "../notes/store/notes.reducers";
import { postNotes } from "../api/notes.api";

const firebaseConfig = {
  apiKey: "AIzaSyBKbxrlofBkZAjt5AL1Up9THwqhZvs5FFw",
  authDomain: "moving-day-862e2.firebaseapp.com",
  databaseURL: "https://moving-day-862e2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "moving-day-862e2",
  storageBucket: "moving-day-862e2.appspot.com",
  messagingSenderId: "180913664607",
  appId: "1:180913664607:web:5667b91e250256e15861ea"
};

export default class FirebaseAPI {
  constructor(store, dispatch) {
    this.store = store;
    this.dispatch = dispatch;

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.database = firebase.database();
    this.dbRef = this.database.ref('notes');

    this.dbRef.on('value', snapshot => {
      const data = snapshot.val();
      data.forEach(note => {
        if (!note.content) {
          note.content = [];
        }
      })
      if (data) {
        dispatch(setNotes(data));
      }
    })
  }

  saveData() {
    this.dispatch(postNotes(getNotes(this.store.getState())));
  }
}
