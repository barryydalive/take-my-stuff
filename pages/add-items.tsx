import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";

export default () => {
  const [user] = useAuthState(auth);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        category,
        uId: user?.uid,
      }),
    });
  };

  return (
    <div>
      <label>Item Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <label>Item Category:</label>
      <input
        type="text"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      <button type="submit" onClick={onSubmit}>
        Add Item
      </button>
    </div>
  );
};
