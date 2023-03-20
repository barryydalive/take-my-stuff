import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "@/firebase/firestore";

export default async function addItem(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = {
    category: req.body.category,
    name: req.body.name,
    ownerId: req.body.uId,
  };
  const newItem = await firestore.collection("items").add(data);

  res.status(200).json(newItem);
}
