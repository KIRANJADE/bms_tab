import React, { useEffect } from "react";
import ActionCard from "../../components/cardList/card";
import { Grid, Box, Button } from "@mui/material";
import CommitteePopup from "../committeeMeetingAdd/committee";
import { useSelector } from "react-redux";
import CustomizedTables from "../../components/tableView/table"; 



const User = () => {
  const [editingCard, setEditingCard] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false); // Modal open state
  const [tableData, setTableData] = React.useState([]);
  const committeeData = useSelector((state) => state.auth?.committeeData || []);

  const headers = [
    { key: 'id', label: 'Meeting Id' },
    { key: 'attandance', label: 'Attendance' },  // Fixed key
    { key: 'name', label: 'Meeting Title' },
    { key: 'date', label: 'Meeting Date' },  // Changed from 'payment' to 'date'
    { key: 'amount', label: 'Fine Amount' },
    { key: 'status', label: 'Status' },
  ];

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
        date: item.meetingDate ? new Date(item.meetingDate).toLocaleDateString() : "Date Not Available",  // Updated fallback value
        amount: item.fineAmount,
        status: item.status,
      }));
      
  
      console.log("Formatted Table Data:", formattedData);
      setTableData(formattedData);
    }
  }, [committeeData]);
  
console.log(tableData, "tableData")

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (card) => {
    setEditingCard(card);
  };

  const handleDelete = () => {
    setEditingCard(null); 
  };
  return (
    <>
      {<CommitteePopup open={isModalOpen} onClose={handleModalClose} />}
      <div >
      <h4>Committee Meeting List</h4>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start", 
            marginBottom: 2, 
          }}
        >
          <Button style={{backgroundColor:"#4c79f8"}}
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
                <CustomizedTables data={tableData} search={false} headers={headers}/>
        </Grid>
      </div>
    </>
  );
};

export default User;
