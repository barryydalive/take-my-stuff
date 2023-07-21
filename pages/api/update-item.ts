import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "@/firebase/firestore";

type Item = {
  name: string;
  category: string;
  ownerId: string;
};

export default async function handleItems(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const itemId = req.query.id as string;
    const updatedItem: Item = req.body;
    const itemRef = firestore.collection("items").doc(itemId);
    await itemRef.update(updatedItem);
    const updatedItemData = (await itemRef.get()).data();
    res.status(200).json(updatedItemData);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}