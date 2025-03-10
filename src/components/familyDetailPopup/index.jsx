import React, { useState, useEffect } from "react";
import { 
  Modal, Box, Typography, Grid, IconButton, Divider, Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FamilyDetailsTables from "../../components/tableView/familydetailsTable";
import FamilyAddForm from "../familyDetailPopup/addForm";
import { getUserById } from "../../state/redux/userApi";

const FamilyDetailPopup = ({ open, onClose, userDetails }) => {
  const [familyDetails, setFamilyDetails] = useState([]);
  const [addPopupOpen, setAddPopupOpen] = useState(false);

  const fetchUserDetails = async () => {
    if (open && userDetails?.memberdetails?.memberId) {
      try {
        const response = await getUserById(userDetails?._id);
        setFamilyDetails(response?.data?.familymembersdetails || []);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [open, userDetails?.memberdetails?.memberId,addPopupOpen]);

  return (
    <>
      {open && (
        <Modal open={open} onClose={onClose}>
          <Box sx={{
            position: "absolute", top: "50%", left: "50%", 
            transform: "translate(-50%, -50%)", width: "80%", maxHeight: "90vh", 
            bgcolor: "background.paper", borderRadius: 2, boxShadow: 24, p: 3, overflowY: "auto"
          }}>
            <IconButton sx={{ position: "absolute", top: 8, right: 8 }} onClick={onClose}>
              <CloseIcon />
            </IconButton>

            <Box sx={{ textAlign: "center", bgcolor: "#4facfe", borderRadius: 3, p: 2, color: "white" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {userDetails?.profile?.lastname} {userDetails?.profile?.firstname}
              </Typography>
              <Typography variant="subtitle1">Member ID: {userDetails?.memberdetails?.memberId}</Typography>
            </Box>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}><Divider /></Grid>
              <Grid item xs={12} sm={12} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body1"><strong>Family Details:</strong></Typography>
                <Button variant="contained" color="primary" onClick={() => setAddPopupOpen(true)}>
                  + Add Family Details
                </Button>
              </Grid>
              <Grid item xs={12}><Divider /></Grid>
              <FamilyDetailsTables data={familyDetails} search={false} />
              <Grid item xs={12} display="flex" justifyContent="center">
                <Button variant="contained" sx={{ backgroundColor: "#4c79f8", color: "white" }} onClick={onClose}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      )}

      {addPopupOpen && (
        <FamilyAddForm open={addPopupOpen} onClose={() => setAddPopupOpen(false)} userDetails />
      )}

    </>
  );
};

export default FamilyDetailPopup;
