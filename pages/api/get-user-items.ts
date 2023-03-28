import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "@/firebase/firestore";

type Item = {
  name: string;
  category: string;
  ownerId: string;
};

export default async function getUserItems(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.uId;
  const allItems: Item[] = [];
  const itemsRef = await firestore.collection("items");
  const snapshot = await itemsRef.where("ownerId", "==", userId).get();
  snapshot.forEach((item) => {
    allItems.push(item.data() as Item);
  });
  res.status(200).json(allItems);
}
