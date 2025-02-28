import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
  Divider,
  TablePagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CustomizedTables from "../../components/tableView/table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PublicIcon from "@mui/icons-material/Public";
import DeathPopup from "../deathForm/index";
import ConfirmationPopup from "../../components/confirmationPopup";
import { ToastContainer } from "react-toastify";
import {
  getAllDeath,
  getEventById,
  deleteDeath,
  publishEvents,
} from "../../state/redux/userApi";
import { eventById, death } from "../../state/redux/authSlice";

const Death = () => {
  const [editingCard, setEditingCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isEditData, setEditData] = useState([]);
  const [page, setPage] = useState(0); // Changed to 0 (MUI pagination starts from 0)
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [totalRecords, setTotalRecords] = useState(0); // Track total records for pagination
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [eventDatas, setEventDatas] = useState([]);

  const dispatch = useDispatch();
  const eventListData = useSelector((state) => state.auth?.eventsData || []);

  const headers = [
    { key: "familyid", label: "Family Id" },
    { key: "memberId", label: "Member Id" },
    { key: "deathDate", label: "Death Date" },
    { key: "funeral", label: "Funeral Date" },
    { key: "deathDetails", label: "Death Details Id" },
    { key: "amount", label: "Fine Amount" },
    { key: "description", label: "description" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const handleConfirmAction = async () => {
    if (!selectedId) return;

    try {
      if (actionType === "delete") {
        const response = await deleteDeath(selectedId);
        if (response?.status) fetchDeathList();
      } else if (actionType === "public") {
        let payload = {
          eventId: selectedId.eventId,
        };
        const response = await publishEvents(payload);
        if (response?.status) fetchDeathList();
      }
    } catch (error) {
      // console.error(Error performing ${actionType}:, error);
    }

    setPopupOpen(false);
    setSelectedId(null);
    setActionType(null);
  };

  const handleConfirmationDelete = (id) => {
    setSelectedId(id);
    setPopupOpen(true);
    setActionType("delete");
  };


  const handleEdit = (item) => {
    setEditData(item); // Set the selected data
    setIsModalOpen(true); // Open the modal
  };

  const fetchDeathList = async () => {
    let payload = { page: page + 1, limit: rowsPerPage, status: "active" }; // Backend page starts from 1
    try {
      const response = await getAllDeath(payload);
      if (response.status) {
        dispatch(death(response.deathdetails)); // Update Redux store
        setTotalRecords(response.totalRecords || 0);
        
        console.log(response.deathdetails, "response.deathdetails")
        // Update table data immediately
        const formattedData = response?.deathdetails.map((item) => ({
          familyid: item?.familyId,
          memberId: item.memberId,
          deathDate: item.deathDate,
          funeral: item.funeralDate,
          deathDetails: item.deathdetailsId,
          amount: item.fineAmount,
          description: item.description,
          status: item.status
            ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
            : "",
          actions: (
            <div style={{ display: "flex", gap: "8px" }}>
              {item.deathDate !== item.funeralDate &&  <IconButton
                color="primary"
                size="small"
                onClick={() => handleEdit(item)}
               
              >
                <EditIcon fontSize="small" />
              </IconButton>}
              <IconButton
                color="error"
                size="small"
                disabled={item.isalreadyAdded || item.status === "deleted"}
                onClick={() => handleConfirmationDelete(item?._id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              
            </div>
          ),
        }));
        
        setTableData(formattedData);
      }
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };
  

  useEffect(() => {
    fetchDeathList();
  }, [page, rowsPerPage]);
  

  // useEffect(() => {
  //   if (JSON.stringify(eventDatas) !== JSON.stringify(eventListData)) {
  //     setEventDatas(eventListData);
  //   }
  // }, [eventListData, ]);
  
console.log(eventListData, "eventDatas")

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  

  return (
    <>
      {isModalOpen && (
        <DeathPopup open={isModalOpen} editDatas={isEditData} onClose={() => setIsModalOpen(false)} />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
      <ConfirmationPopup
        show={popupOpen}
        title="Confirmation"
        message={actionType === "delete"
          ? "Are you sure you want to delete this item?"
          : "Are you sure you want to make this item public?"}
        onConfirm={handleConfirmAction}
        onCancel={() => setPopupOpen(false)}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 2 }}>
        <Button style={{ backgroundColor: "#4C79F8" }} variant="contained" onClick={() => setIsModalOpen(true)}>
          Add Death
        </Button>
      </Box>
      <Grid container spacing={1}>
        <CustomizedTables data={tableData} search={false} headers={headers} height="300px" />
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
          <TablePagination
            component="div"
            count={totalRecords} 
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Death;
