import { NextApiHandler } from "next";
import { firestore } from "@/firebase/firestore";
import User from "@/types/User";

const createUser: NextApiHandler = async (req, res) => {
  const { uid, email, displayName, photoURL } = req.body as User;

  try {
    // Check if user already exists in Firestore
    const userDoc = await firestore.collection("users").doc(uid).get();
    if (userDoc.exists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create new user document in Firestore
    await firestore
      .collection("users")
      .doc(uid)
      .set({ email, displayName, photoURL, friends: [] });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user", error);
    return res.status(500).json({ message: "Error creating user" });
  }
};

export default createUser;
