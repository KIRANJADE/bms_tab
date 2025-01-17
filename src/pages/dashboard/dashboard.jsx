import React, { useState } from "react";
import ActionCard from "../../components/cardList/card";
import { Box, Button, Grid } from "@mui/material";
import AddNewModal from "../userAdd/addUser";
import { useSelector } from "react-redux";

const ITEMS_PER_PAGE = 12; // Number of items to load per page

const Dashboard = () => {
  const [editingCard, setEditingCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page for lazy loading

  const users = useSelector((state) => state.auth);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleEdit = (card) => {
    setEditingCard(card);
    setIsModalOpen(true);
  };

  const handleDelete = () => setEditingCard(null);

  // Calculate the data to display based on current page
  const paginatedUsers = users?.users?.userDetails.slice(0, currentPage * ITEMS_PER_PAGE);

  // Handle "Load More" button click
  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment the page
  };

  return (
    <>
      <AddNewModal open={isModalOpen} onClose={handleModalClose} />
      <div className="p-3">
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 2,
          }}
        >
          <Button variant="contained" color="primary" onClick={handleModalOpen}>
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

        {/* Load More Button */}
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
