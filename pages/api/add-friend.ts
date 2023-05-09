import type { NextApiRequest, NextApiResponse } from "next";
import {
  getUserByEmail,
  getUserById,
  updateUserFriends,
} from "@/firebase/firestore";

type Data = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, currentUserId } = req.body;

  try {
    // Get the user ID for the specified email address
    const user = await getUserByEmail(email);
    const currentUser = await getUserById(currentUserId);
    if (!user || !currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update the current user's friends list with the new friend's ID
    const friends = currentUser.friends ?? [];
    if (!friends.includes(user.uid)) {
      friends.push(user.uid);
      await updateUserFriends(currentUser.uid, friends);
    }

    return res
      .status(200)
      .json({ success: true, message: "Friend added successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
}
