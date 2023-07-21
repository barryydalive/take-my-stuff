import { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "@/firebase";
import { styled } from "@mui/system";
import { TextField, Button } from "@mui/material";

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& .MuiTextField-root": {
    margin: "8px",
    width: "25ch",
    color: "#fff",
    "& .MuiInputBase-input": {
      color: "#fff",
    },
    "& .MuiFormLabel-root": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
  },
  "& .MuiButton-root": {
    margin: "16px",
    color: "#fff",
    borderColor: "#fff",
    "&:hover": {
      color: "#000",
      backgroundColor: "#fff",
    },
  },
});

export default () => {
  const [user] = useAuthState(auth);
  const [imageUrl, setImageUrl] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const imageRef = image ? ref(storage, `images/${image.name}`) : null;

    async function uploadImage() {
      const snapshot = await uploadBytes(imageRef!, image!);
      const newImageUrl = await getDownloadURL(imageRef!);
      setImageUrl(newImageUrl);
    }
    if (imageRef && image) {
      uploadImage();
    }
  }, [image]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Upload image to Firebase Storage

    // Add item to database
    fetch("/api/add-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: itemName,
        category: itemCategory,
        imageUrl: imageUrl,
        uId: user?.uid,
      }),
    }).then(() => {
      setItemName("");
      setItemCategory("");
      setImage(null);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        required
        id="item-name"
        label="Item Name"
        value={itemName}
        onChange={(event) => setItemName(event.target.value)}
      />
      <TextField
        required
        id="item-category"
        label="Item Category"
        value={itemCategory}
        onChange={(event) => setItemCategory(event.target.value)}
      />
      <input
        type="file"
        onChange={(event) => setImage(event.target.files?.[0] || null)}
      />
      {imageUrl && <img src={imageUrl} alt="Uploaded image" />}
      <Button variant="contained" color="primary" type="submit">
        Add Item
      </Button>
    </Form>
  );
};
