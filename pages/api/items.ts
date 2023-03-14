import admin from "firebase-admin";
import { initializeApp, cert } from "firebase-admin/app";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ServiceAccount } from "firebase-admin/app";
import serviceAccount from "../../take-my-stuff-f74a3-d475c5c4254b.json";

initializeApp({ credential: cert(serviceAccount as ServiceAccount) });

const db = admin.firestore();

export default async function addItem(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = {
    category: req.body.category,
    name: req.body.name,
    ownerId: req.body.uId,
  };
  const newItem = await db.collection("items").add(data);

  res.status(200).json(newItem);
}
