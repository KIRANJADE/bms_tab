import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Grid,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CustomizedTables from "../../components/tableView/balanceDetailsTable";
import { getMemberBalance } from "../../state/redux/userApi";

const BalanceDetailPopup = ({ open, onClose, userDetails }) => {
  const [balanceDetails, setBalanceDetails] = useState(null);

  useEffect(() => {
    if (open && userDetails?.memberdetails?.memberId) {
      setBalanceDetails(null); // Reset when opening
      const fetchBalance = async () => {
        try {
          const response = await getMemberBalance({
            memberid: [userDetails.memberdetails.memberId],
          });

          if (response?.status) {
            console.log("API Response:", response.balanceDetails);
            setBalanceDetails(response.balanceDetails);
          }
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      };

      fetchBalance();
    }
  }, [open, userDetails]);

  useEffect(() => {
    console.log("Updated balanceDetails:", balanceDetails);
  }, [balanceDetails]);

  return (
    <>
      {open && (
        <Modal open={open} onClose={onClose} aria-labelledby="user-details-modal">
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              maxWidth: 500,
              bgcolor: "background.paper",
              borderRadius: 4,
              boxShadow: 24,
              p: 4,
              overflow: "hidden",
            }}
          >
            <IconButton sx={{ position: "absolute", top: 8, right: 8, color: "black" }} onClick={onClose}>
              <CloseIcon />
            </IconButton>

            <Box sx={{ textAlign: "center", bgcolor: "linear-gradient(to right, #4facfe, #00f2fe)", borderRadius: 3, p: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {userDetails?.profile?.lastname} {userDetails?.profile?.firstname}
              </Typography>
              <Typography variant="subtitle1">Member ID: {userDetails?.memberdetails?.memberId}</Typography>
            </Box>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                  <AccountBalanceWalletIcon color="success" />
                  <Typography variant="body1">
                    <strong>Balance:</strong> ₹{balanceDetails?.total || "0"}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <CustomizedTables data={balanceDetails || {}} search={false} />

              <Grid item xs={12} display="flex" justifyContent="center">
                <Button variant="contained" sx={{ backgroundColor: "#4c79f8", color: "white" }} onClick={onClose}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default BalanceDetailPopup;
