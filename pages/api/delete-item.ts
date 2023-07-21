import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "@/firebase/firestore";


export default async function handleItems(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const {id} = req.body

    console.log('id', id, req.body)
    const itemId = req.body.id as string;
    const itemRef = firestore.collection("items").doc(itemId);
    const itemData = (await itemRef.get()).data();
    if (!itemData) {
      res.status(404).json({ message: "Item not found" });
    } else {
      await itemRef.delete();
      res.status(204).end()
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

