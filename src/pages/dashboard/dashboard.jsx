import React from "react";
import ActionCard from "../../components/cardList/card";
import {  Box, Button, Grid } from "@mui/material";
import AddNewModal from "../userAdd/addUser";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [editingCard, setEditingCard] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const users = useSelector((state) => state.auth);
  console.log(users, "users");

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (card) => {
    setEditingCard(card);
	setIsModalOpen(true)
  };

  const handleDelete = () => {
    setEditingCard(null); 
  };

  return (
    <>
      {<AddNewModal open={isModalOpen} onClose={handleModalClose} />}
      <div className="p-3">
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end", 
            marginBottom: 2, 
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleModalOpen} // Open modal on click
          >
            + Add New
          </Button>
        </Box>

        {/* Grid Section */}
       { console.log(users?.users?.userDetails,"users?.users?.usersDetails")}
        
        <Grid container spacing={1}>
          {users?.users?.userDetails.map((users, index) => {
            return (
              <>
              {console.log(users, "fhsdjhfjhsdfkj",index)}
              
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <ActionCard
                    users={users}
                    profile={users?.profile}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isEdit={editingCard}
                  />
                </Grid>
              </>
            );
          })}
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
