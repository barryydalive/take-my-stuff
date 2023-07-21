import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
type AddFriendProps = {
  userId: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
};

const AddFriend = ({ userId }: AddFriendProps) => {
  const [user] = useAuthState(auth);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleAddFriend = async () => {
    try {
      const response = await fetch("/api/add-friend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentUserId: user!.uid, email }),
      });
      const data: ApiResponse = await response.json();

      if (data.success) {
        setEmail("");
        setError("");
        alert(data.message);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred while adding friend. Please try again.");
    }
  };

  return (
    <div>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained" onClick={handleAddFriend}>
        Add Friend
      </Button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddFriend;
