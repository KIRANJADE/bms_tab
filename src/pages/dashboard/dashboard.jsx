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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const users = useSelector((state) => state.auth?.users || []);
  const dispatch = useDispatch();

  const fetchUserList = async (currentPage) => {
    setLoading(true);
    setError(""); 
    try {
      const response = await userList(currentPage, ITEMS_PER_PAGE, {
        status: "active",
        "memberdetails.memberType": "a-class",
        "memberdetails.userType": "full",
      });

      if (response.status) {
        dispatch(userListData([...users, ...response.userDetails]));

        if (currentPage >= response.totalPages) {
          setHasMore(false);
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
    const nextPage = page + 1;
    setPage(nextPage);
    fetchUserList(nextPage);
  };

  return (
    <>
      <AddNewModal 
        open={isModalOpen} 
        onClose={handleModalClose} 
        users={editingCard} 
        isEditMode={!!editingCard}
      />
      <div className="">
        <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 3, marginTop: 0 }}>
          <Button style={{ backgroundColor: "#4C79F8", width: "180px" }} variant="contained" color="primary" onClick={handleModalOpen}>
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

        {error && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <p style={{ color: "red" }}>{error}</p>
          </Box>
        )}

        {hasMore && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Button style={{backgroundColor:"#4c79f8",color:"white"}}
              variant="outlined"
              onClick={handleLoadMore}
              disabled={loading} 
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

