import React, { useState } from "react";
import ActionCard from "../../components/cardList/card";
import { Box, Button, Grid } from "@mui/material";
import AddNewModal from "../userAdd/addUser";
import { useSelector, useDispatch } from "react-redux";
import { userList } from "../../state/redux/userApi";
import { userListData } from "../../state/redux/authSlice";

const ITEMS_PER_PAGE = 8;

const Dashboard = () => {
  const [editingCard, setEditingCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1); // Tracks the current page for API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true); // To track if more data is available

  const users = useSelector((state) => state.auth?.users || []); // Get users from Redux state
  const dispatch = useDispatch();

  const fetchUserList = async (currentPage) => {
    setLoading(true);
    setError(""); // Reset error state before fetching
    try {
      const response = await userList(currentPage, ITEMS_PER_PAGE, {
        status: "active",
        "memberdetails.memberType": "a-class",
        "memberdetails.userType": "full",
      });

      if (response.status) {
        // Add fetched users to the Redux store
        dispatch(userListData([...users, ...response.userDetails]));

        // Check if more pages are available
        if (currentPage >= response.totalPages) {
          setHasMore(false); // No more data to load
        }
      } else {
        setError("Failed to fetch user data.");
      }
    } catch (error) {
      setError("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleEdit = (card) => {
    setEditingCard(card);
    setIsModalOpen(true);
  };

  const handleDelete = () => setEditingCard(null);

  const handleLoadMore = () => {
    const nextPage = page + 1; // Calculate the next page
    setPage(nextPage); // Update the state to track the current page
    fetchUserList(nextPage); // Fetch data for the next page
  };

  return (
    <>
      <AddNewModal open={isModalOpen} onClose={handleModalClose} />
      <div className="">
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: 3,
            marginTop: 0,
          }}
        >
          <Button
            style={{ backgroundColor: "#4C79F8", width: "180px" }}
            variant="contained"
            color="primary"
            onClick={handleModalOpen}
          >
            Add User
          </Button>
        </Box>

        <Grid container spacing={1} style={{height:460,overflowY:"scroll"}}>
          {users.map((user, index) => (
            <Grid className="mb-3" item xs={12} sm={6} md={3} key={index}>
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

        {/* Display error if fetch fails */}
        {error && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <p style={{ color: "red" }}>{error}</p>
          </Box>
        )}

        {/* Load More Button */}
        {hasMore && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Button
              variant="outlined"
              onClick={handleLoadMore}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Loading..." : "Load More"}
            </Button>
          </Box>
        )}
      </div>
    </>
  );
};

export default Dashboard;
