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
import EventsPopup from "../eventsForm/index";
import ConfirmationPopup from "../../components/confirmationPopup";
import { ToastContainer } from "react-toastify";
import {
  getAllEvents,
  getEventById,
  deleteEvents,
  publishEvents,
} from "../../state/redux/userApi";
import { eventById, eventsList } from "../../state/redux/authSlice";

const Events = () => {
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
    { key: "id", label: "Event Id" },
    { key: "name", label: "Event Name" },
    { key: "date", label: "Start Date" },
    { key: "endDate", label: "End Date" },
    { key: "amount", label: "Amount" },
    { key: "fee", label: "Late Fee" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const handleConfirmAction = async () => {
    if (!selectedId) return;

    try {
      if (actionType === "delete") {
        const response = await deleteEvents(selectedId);
        if (response?.status) fetchEventsList();
      } else if (actionType === "public") {
        let payload = {
          eventId: selectedId.eventId,
        };
        const response = await publishEvents(payload);
        if (response?.status) fetchEventsList();
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

  const handleConfirmationPublic = (item) => {
    setSelectedId(item);
    setActionType("public");
    setPopupOpen(true);
  };

  const fetchEventsList = async () => {
    let payload = { page: page + 1, limit: rowsPerPage }; // Backend page starts from 1
    try {
      const response = await getAllEvents(payload, { status: "active" });
      if (response.status) {
        dispatch(eventsList(response.eventDetails)); // Update Redux store
        setTotalRecords(response.totalRecords || 0);
        
        // Update table data immediately
        const formattedData = response?.eventDetails.map((item) => ({
          id: item?.eventId,
          name: item.eventName,
          date: item.startDate,
          endDate: item.endDate,
          amount: item.amount,
          fee: item.lateFee,
          status: item.status
            ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
            : "",
          actions: (
            <div style={{ display: "flex", gap: "8px" }}>
              <IconButton
                color="primary"
                size="small"
                onClick={() => handleEdit(item)}
                disabled={
                  item.isalreadyAdded ||
                  new Date(item.meetingDate) < new Date() ||
                  item.status === "deleted"
                }
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                color="error"
                size="small"
                disabled={item.isalreadyAdded || item.status === "deleted"}
                onClick={() => handleConfirmationDelete(item?._id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton
                color="success"
                size="small"
                disabled={item.isalreadyAdded || item.status === "deleted"}
                onClick={() => handleConfirmationPublic(item)}
              >
                <PublicIcon fontSize="small" />
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
    fetchEventsList();
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
        <EventsPopup open={isModalOpen} editDatas={isEditData} onClose={() => setIsModalOpen(false)} />
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
          Add Event
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

export default Events;
