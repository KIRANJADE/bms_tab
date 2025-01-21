import React from "react";
import ActionCard from "../../components/cardList/card";
import { Grid, Box, Button } from "@mui/material";
import AddNewModal from "../userAdd/addUser";

const cards = [
  {
    id: 1,
    title: "user1",
    description: "9865656565",
    image: "https://via.placeholder.com/300x200?text=Plants",
  },
  {
    id: 2,
    title: "user2",
    description: "9865656565",
    image: "https://via.placeholder.com/300x200?text=Animals",
  },
  {
    id: 3,
    title: "user3",
    description: "9865656565",
    image: "https://via.placeholder.com/300x200?text=Humans",
  },
  {
    id: 1,
    title: "user4",
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

const User = () => {
  const [editingCard, setEditingCard] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false); // Modal open state

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (card) => {
    setEditingCard(card);
  };

  const handleDelete = () => {
    setEditingCard(null); 
  };
  return (
    <>
      {<AddNewModal open={isModalOpen} onClose={handleModalClose} />}
      <div >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start", 
            marginBottom: 2, 
          }}
        >
          <Button style={{backgroundColor:"#4c79f8"}}
            variant="contained"
            color="primary"
            onClick={handleModalOpen} 
          >
            + Add New
          </Button>
        </Box>

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

export default User;
