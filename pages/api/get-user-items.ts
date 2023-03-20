
import { DocumentData } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import {db} from "./utils"

export default async function getUserItems(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const userId = req.body.uId;
    const allItems: DocumentData[] = [];
    const itemsRef = await db.collection('items')
    const snapshot = await itemsRef.where('ownerId', "==", userId).get();
    snapshot.forEach(item => {
    allItems.push(item.data())
  })
    res.status(200).json(allItems);
  }
  