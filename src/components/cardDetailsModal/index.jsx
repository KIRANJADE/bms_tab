import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Avatar,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";

const CardDetailPopUp = ({ open, onClose, userDetails, handleDelete,onEdit}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isresetCancelEditFlag, setIsResetCancelEditFlag] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditUsers = () => {
    console.log("heloooo");
    setIsResetCancelEditFlag(true)
    onEdit()
  }

  const genderIcon =
    userDetails?.profile?.gender === "male" ? (
      <MaleIcon color="primary" />
    ) : (
      <FemaleIcon color="secondary" />
    );

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="user-details-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 500,
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
          overflow: "hidden",
        }}
      >
        {/* Modal Header */}
        <Box
          sx={{
            textAlign: "center",
            // mb: 4,
            position: "relative",
            bgcolor: "linear-gradient(to right, #4facfe, #00f2fe)",
            // p: 3,
            borderRadius: 3,
            // boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* <IconButton
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={handleMenuClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleEditUsers()}>
              Edit
            </MenuItem>
            <MenuItem onClick={() => handleDelete(userDetails?._id)}>Delete</MenuItem>
          </Menu> */}

          <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
            {userDetails?.profile?.firstname} {userDetails?.profile?.lastname}
          </Typography>
          <Typography variant="subtitle1">
            Member ID: {userDetails?.memberdetails?.memberId}
          </Typography>
        </Box>

        {/* Modal Content */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={1}>
              <PhoneIcon color="action" />
              <Typography variant="body1">
                <strong>Phone:</strong> {userDetails?.profile?.phoneno ? userDetails?.profile?.phoneno : "Nil"}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={1}>
              <CakeIcon color="action" />
              <Typography variant="body1">
                <strong>DOB:</strong> {userDetails?.profile?.dob ? userDetails?.profile?.dob : "Nil"}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={1}>
              {genderIcon}
              <Typography variant="body1">
                <strong>Gender:</strong> {userDetails?.profile?.gender}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={1}>
              <AccountBalanceWalletIcon color="success" />
              <Typography variant="body1">
                <strong>Balance:</strong> ₹{userDetails?.balance ? userDetails?.balance : "Nil"}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={1}>
              <FamilyRestroomIcon color="secondary" />
              <Typography variant="body1">
                <strong>Father's Name:</strong> {userDetails?.profile?.fathername ? userDetails?.profile?.fathername : "Nil"}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={1}>
              <FamilyRestroomIcon color="secondary" />
              <Typography variant="body1">
                <strong>Mother's Name:</strong> {userDetails?.profile?.mothername ? userDetails?.profile?.mothername : "Nil"}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={() => handleEditUsers()} fullWidth>Edit User</Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CardDetailPopUp;
