import admin from "firebase-admin";
import { cert, getApps } from "firebase-admin/app";

const fireBaseAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_ID,
  private_key: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
};

if (!getApps().length) {
  admin.initializeApp({ credential: cert(fireBaseAccount) });
}

export const firestore = admin.firestore();

type User = {
  uid: string;
  name: string;
  email: string;
  friends: string[];
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const usersRef = firestore.collection("users");
  const userQuery = await usersRef.where("email", "==", email).get();
  const userDoc = userQuery.docs[0];
  if (!userDoc) {
    return null;
  }
  return { uid: userDoc.id, ...userDoc.data() } as User;
};

export const updateUserFriends = async (
  uid: string,
  friends: string[]
): Promise<void> => {
  const usersRef = firestore.collection("users");
  const userDoc = await usersRef.doc(uid).get();
  if (!userDoc.exists) {
    throw new Error(`User ${uid} does not exist`);
  }
  console.log("friends:", friends, "AHLGHALG");
  await usersRef.doc(uid).update({ friends });
};

export const getUserById = async (uid: string): Promise<User | null> => {
  try {
    const userDoc = await firestore.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      return null;
    }
    const userData = userDoc.data() as User;
    return userData;
  } catch (error) {
    console.error("Error getting user by id", error);
    return null;
  }
};
