import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "@/firebase/firestore";

type Item = {
  name: string;
  category: string;
  ownerId: string;
  friendsId: string[];
};

type User = {
  name: string;
  friends: string[];
};

export default async function getItem(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const itemId = req.query.id as string;
  const userId = req.body.uId;

  const itemRef = firestore.collection("items").doc(itemId);
  const itemDoc = await itemRef.get();

  if (!itemDoc.exists) {
    res.status(404).json({ message: "Item not found" });
  } else {
    const itemData = itemDoc.data() as Item;
    if (itemData.ownerId === userId) {
      res.status(200).json(itemData);
    } else {
      const userRef = firestore.collection("users").doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        res.status(404).json({ message: "User not found" });
      } else {
        const userData = userDoc.data() as User;
        if (userData.friends.includes(itemData.ownerId)) {
          res.status(200).json(itemData);
        } else {
          res.status(403).json({ message: "Unauthorized" });
        }
      }
    }
  }
}
