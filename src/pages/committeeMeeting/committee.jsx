import React, { useEffect } from "react";
import ActionCard from "../../components/cardList/card";
import { Grid, Box, Button, IconButton } from "@mui/material";
import CommitteePopup from "../committeeMeetingAdd/committee";
import { useSelector } from "react-redux";
import CustomizedTables from "../../components/tableView/table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { set } from "react-hook-form";

const User = () => {
  const [editingCard, setEditingCard] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false); // Modal open state
  const [tableData, setTableData] = React.useState([]);
  const [isEditData, setEditData] = React.useState([]);
  const committeeData = useSelector((state) => state.auth?.committeeData || []);

  console.log(committeeData, "committeeData");

  const headers = [
    { key: "id", label: "Meeting Id" },
    { key: "attendance", label: "Attendance" }, // Fixed key
    { key: "name", label: "Meeting Title" },
    { key: "date", label: "Meeting Date" }, // Changed from 'payment' to 'date'
    { key: "amount", label: "Fine Amount" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" }, // Added actions column
  ];

  const handleEdit = (data) => {
    setEditData(data);
    handleModalOpen();
  };

  // const handleDelete = (id) => {
  //   console.log("Delete clicked for ID:", id);
  //   // Add your delete logic here
  // };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    console.log("Committee Data:", committeeData);
    if (committeeData && committeeData.length > 0) {
      const formattedData = committeeData.map((item) => ({
        id: item?.committeemeetingId,
        attendance: item?.isAddAttendance,
        name: item.meetingtitle,
        date: item.meetingDate,
        amount: item.fineAmount,
        status: item.status,
        actions: (
          <div style={{ display: "flex", gap: "8px" }}>
            <IconButton
              color="primary"
              size="small"
              onClick={() => handleEdit(item)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="error"
              size="small"
              onClick={() => handleDelete(item.committeemeetingId)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        ),
      }));

      console.log("Formatted Table Data:", formattedData);
      setTableData(formattedData);
    }
  }, [committeeData]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    setEditingCard(null);
  };
  return (
    <>
      {<CommitteePopup open={isModalOpen} editDatas={isEditData} onClose={handleModalClose} />}
      <div>
        <h4>Committee Meeting List</h4>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: 2,
          }}
        >
          <Button
            style={{ backgroundColor: "#4c79f8" }}
            variant="contained"
            color="primary"
            onClick={handleModalOpen}
          >
            + Add New
          </Button>
        </Box>
        <Grid container spacing={1}>
          {/* {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ActionCard
                card={card}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isEdit={editingCard}
              />
            </Grid>
          ))} */}
          <CustomizedTables data={tableData} search={false} headers={headers} />
        </Grid>
      </div>
    </>
  );
};

export default User;
