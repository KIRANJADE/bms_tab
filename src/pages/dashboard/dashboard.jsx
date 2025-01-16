import React from "react";
import ActionCard from "../../components/cardList/card";
import Grid from "@mui/material/Grid";

const cards = [
  {
    id: 1,
    title: "Neema",
    description: "9865656565",
    image: "https://via.placeholder.com/300x200?text=Plants",
  },
  {
    id: 2,
    title: "Nishika",
    description: "9865656565",
    image: "https://via.placeholder.com/300x200?text=Animals",
  },
  {
    id: 3,
    title: "vimala",
    description: "9865656565",
    image: "https://via.placeholder.com/300x200?text=Humans",
  },
  {
    id: 1,
    title: "kala",
    description: "9865656565",
    image: "https://via.placeholder.com/300x200?text=Plants",
  },
  {
    id: 2,
    title: "karthik",
    description: "9865656565",
    image: "https://via.placeholder.com/300x200?text=Animals",
  },
  {
    id: 3,
    title: "abisha",
    description: "9865656565",
    image: "https://via.placeholder.com/300x200?text=Humans",
  },
  {
    id: 1,
    title: "Abi",
    description: "9865656565",
    image: "https://via.placeholder.com/300x200?text=Plants",
  },
  {
    id: 2,
    title: "Ananth",
    description: "9865656565",
    image: "https://via.placeholder.com/300x200?text=Animals",
  },
  {
    id: 3,
    title: "Kamala",
    description: "9865656565",
    image: "https://via.placeholder.com/300x200?text=Humans",
  },
];

const Dashboard = () => {
  const [editingCard, setEditingCard] = React.useState(null);

  const handleEdit = (card) => {
    // Open a modal or toggle an edit form for the specific card
    setEditingCard(card);
  };



  const handleDelete = () => {
    setEditingCard(null); // Close the edit form without saving
  };
  return (
    <>
      <div className="p-3">
        <Grid container spacing={1}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
           
              <ActionCard
                card={card}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isEdit={editingCard}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
