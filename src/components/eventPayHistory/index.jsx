import React, { useState } from "react";
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
  Tabs,
  Tab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EventsPayHistoryPopup = ({ open, onClose, eventpayhistory }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Filter data based on the selected tab
  const filteredData = eventpayhistory?.filter((payhistory) =>
    activeTab === 0 ? payhistory.status === "paid" : payhistory.status === "unpaid"
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          maxHeight: "90vh",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          overflowY: "auto",
        }}
      >
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Events Pay History</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Tabs for Paid and Unpaid */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{ mb: 2 }}
        >
          <Tab label="Paid" />
          <Tab label="Unpaid" />
        </Tabs>

        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 500,
            overflowY: "auto",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Member</TableCell>
                {activeTab === 0 && <TableCell>payed Date</TableCell>}
                {activeTab === 0 && <TableCell>payee</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData?.length > 0 ? (
                filteredData.map((payhistory, index) => (
                  <TableRow key={payhistory._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {payhistory.membername + " (" + payhistory.memberId + ")"}
                    </TableCell>
                    {activeTab === 0 && (
                      <TableCell>
                        {payhistory?.payDetail?.payedDate
                          ? new Date(payhistory.payDetail.payedDate).toLocaleString()
                          : "-"}
                      </TableCell>
                    )}
                    {activeTab === 0 && (
                      <TableCell>
                        {payhistory?.payDetail?.payeeId
                          ? `${payhistory.payeename} (${payhistory.payDetail.payeeId})`
                          : "-"}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={activeTab === 0 ? 4 : 2} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default EventsPayHistoryPopup;
