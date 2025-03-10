import React from "react";
import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const NotificationPopup = ({ open, onClose, notifications }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 750,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Notifications</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>isRead</TableCell>
                <TableCell>Member</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Approved Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notifications?.map((notification, index) => (
                <TableRow key={notification._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{notification.isRead === true ? "Yes" : "No"}</TableCell>
                  <TableCell>{notification.membername +' ('+notification.memberId+')'}</TableCell>
                  <TableCell>{notification.status ? notification.status : "pending" }</TableCell>
                  <TableCell>
                    {new Date(notification.updatedAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default NotificationPopup;
