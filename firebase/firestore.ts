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
