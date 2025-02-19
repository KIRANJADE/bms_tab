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
import CustomizedTables from "../../components/tableView/table";
import CloseIcon from "@mui/icons-material/Close";

const CardDetailPopUp = ({
  open,
  onClose,
  userDetails,
  handleDelete,
  onEdit,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isresetCancelEditFlag, setIsResetCancelEditFlag] = useState(false);

  const ordersData = [
    {
      id: "#1002",
      date: "11 Feb, 2024",
      customer: "Wade Warren",
      payment: "Pending",
      total: "$20.00",
      delivery: "N/A",
      items: "2 items",
      fulfillment: "Unfulfilled",
    },
    {
      id: "#1004",
      date: "13 Feb, 2024",
      customer: "Esther Howard",
      payment: "Success",
      total: "$22.00",
      delivery: "N/A",
      items: "3 items",
      fulfillment: "Fulfilled",
    },
    {
      id: "#1007",
      date: "15 Feb, 2024",
      customer: "Jenny Wilson",
      payment: "Pending",
      total: "$25.00",
      delivery: "N/A",
      items: "2 items",
      fulfillment: "Unfulfilled",
    },
  ];

  const handleEditUsers = () => {
    onClose();
  };

  const genderIcon =
    userDetails?.profile?.gender === "male" ? (
      <MaleIcon color="primary" />
    ) : (
      <FemaleIcon color="secondary" />
    );
  console.log(userDetails, "userDetails");

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="user-details-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          // maxWidth: 800,
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
          overflow: "hidden",
        }}
      >
           <IconButton
            sx={{ position: "absolute", top: 8, right: 8, color: "black" }}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
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

          <Grid item xs={12} sm={12}>
            <Box
              display="flex"
              className="mb-1"
              alignItems="center"
              style={{ justifyContent: "center" }}
              gap={1}
            >
              <AccountBalanceWalletIcon color="success" />
              <Typography variant="body1">
                <strong>Balance:</strong> ₹
                {userDetails?.balance ? userDetails?.balance : "0"}
              </Typography>
            </Box>
            {/* <CustomizedTables data={ordersData} search={false}/> */}
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#4c79f8", color: "white" }}
              onClick={() => handleEditUsers()}
              fullWidth
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CardDetailPopUp;
