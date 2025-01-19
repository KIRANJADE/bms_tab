import React, { useState } from "react";
import ActionCard from "../../components/cardList/card";
import { Box, Button, Grid } from "@mui/material";
import AddNewModal from "../userAdd/addUser";
import { useSelector } from "react-redux";

const ITEMS_PER_PAGE = 10;

const Dashboard = () => {
  const [editingCard, setEditingCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const users = useSelector((state) => state.auth);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleEdit = (card) => {
    setEditingCard(card);
    setIsModalOpen(true);
  };

  const handleDelete = () => setEditingCard(null);

  const paginatedUsers = users?.users?.userDetails.slice(0, currentPage * ITEMS_PER_PAGE);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <AddNewModal open={isModalOpen} onClose={handleModalClose} />
      <div className="p-3">
        <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 2 }}>
          <Button style={{backgroundColor:"#4C79F8"}} variant="contained" color="primary" onClick={handleModalOpen}>
            + Add New
          </Button>
        </Box>

        <Grid container spacing={1}>
          {paginatedUsers.map((user, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ActionCard
                users={user}
                profile={user?.profile}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isEdit={editingCard}
              />
            </Grid>
          ))}
        </Grid>

        {paginatedUsers.length < users?.users?.userDetails.length && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Button variant="outlined" onClick={handleLoadMore}>
              Load More
            </Button>
          </Box>
        )}
      </div>
    </>
  );
};

export default Dashboard;
