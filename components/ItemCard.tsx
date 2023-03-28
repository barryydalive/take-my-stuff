import { Card, CardContent, Typography, CardMedia } from "@mui/material";
// import { Item } from "../types";
type Item = {
  name: string;
  category: string;
  ownerId: string;
  imageUrl?: string;
};
type ItemCardProps = {
  item: Item;
};

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="auto"
        width="auto"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        image={item.imageUrl}
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {item.name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {item.category}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
