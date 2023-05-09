import firebase from "firebase/app";
import "firebase/firestore";

type User = {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  friends?: string[];
  // createdAt: firebase.firestore.Timestamp;
  // updatedAt: firebase.firestore.Timestamp;
};

export default User;
