import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Grid } from "@mui/material";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ItemCard from "@/components/ItemCard";

type Item = {
  name: string;
  category: string;
  ownerId: string;
};

const UserItemsPage = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserItems = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/get-user-items?uId=${user?.uid}`);
        const items = await response.json();
        setItems(items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserItems();
  }, [router, user]);

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        {loading && <p>Loading...</p>}
        {!loading && items.length === 0 && <p>No items found.</p>}
        {!loading &&
          items.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <ItemCard item={item} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default UserItemsPage;
