import React, { useEffect, useState } from "react";
import ActionCard from "../../components/cardList/card";
import {
  Grid,
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
  Divider,
} from "@mui/material";
import EventsPopup from "../eventsForm/index";
import { useDispatch, useSelector } from "react-redux";
import CustomizedTables from "../../components/tableView/table";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { set } from "react-hook-form";
import {
  getAllEvents,
  deleteCommiteeDetails,
  getEventById,
  deleteEvents,
  publishEvents,
} from "../../state/redux/userApi";
import {
  committeebyId,
  eventById,
  eventsList,
} from "../../state/redux/authSlice";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import PublicIcon from "@mui/icons-material/Public";

const Events = () => {
  const [editingCard, setEditingCard] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false); // Modal open state
  const [tableData, setTableData] = React.useState([]);
  const [isEditData, setEditData] = React.useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [userData, setUserData] = useState([]);

  const eventListData = useSelector((state) => state.auth?.eventsData || []);
  const committeeByIdData = useSelector(
    (state) => state.auth?.committeId || []
  );
  const dispatch = useDispatch();

  console.log(eventListData, "committeeData");

  const headers = [
    { key: "id", label: "Event Id" },
    { key: "name", label: "Event Name" },
    { key: "date", label: "start Date" }, // Changed from 'payment' to 'date'
    { key: "endDate", label: "End Date" },
    { key: "amount", label: "Amount" },
    { key: "fee", label: "late Fee" },
    { key: "status", label: "Status" }, // Added actions column
    { key: "actions", label: "Actions" }, // Added actions column
  ];

  const viewTableHeader = [
    // { key: "id", label: "Meeting Id" },
    { key: "memberId", label: "Member Id" },
    { key: "name", label: "Member Name" },
    { key: "attendance", label: "Attendance" },
  ];

  const handleView = (data) => {
    getCommiteeMemberById(data?._id, "View");
  };

  const handleViewClose = () => {
    setUserData([]);
    setIsViewModalOpen(false);
  };

  useEffect(() => {
    console.log(eventListData, "eventListData");
    if (eventListData && eventListData.length > 0) {
      const formattedData = eventListData.map((item) => ({
        id: item?.eventId,
        name: item.eventName,
        date: item.startDate,
        endDate: item.endDate,
        amount: item.amount,
        fee: item.lateFee,
        status: item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : '',
        actions: (
          <div style={{ display: "flex", gap: "8px" }}>
            <IconButton
              color="primary"
              size="small"
              onClick={() => handleEdit(item)}
              disabled={item.isalreadyAdded || new Date(item.meetingDate) < new Date() || item.status == 'deleted'}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="error"
              size="small"
              disabled={item.isalreadyAdded || item.status == 'deleted'}
              onClick={() => handleDelete(item?._id)}
              
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="success"
              size="small"
              disabled={item.isalreadyAdded || item.status == 'deleted'}
              onClick={() => handlePublicity(item)}
            >
              <PublicIcon fontSize="small" />
            </IconButton>
          </div>
        ),
      }));
      setTableData(formattedData);
    }
  }, [eventListData]);

  const fetchEventsList = async () => {
    // setLoading(true);
    let payload = { page: 1, limit: 12 };
    try {
      const response = await getAllEvents(payload, {
        status: "active",
      });

      if (response.status) {
        dispatch(eventsList(response.userDetails));
        // setTotalPages(response.totalPages);
      }
    } catch (error) {
      setError("Failed to fetch user data");
    } finally {
      // setLoading(false);
    }
  };

  const handleEdit = (data) => {
    getEventByIds(data?._id);
  };

  const getEventByIds = async (value) => {
    try {
      const response = await getEventById(value);
      console.log(response);
      if (response?.status) {
        dispatch(eventById(response));
        setEditData(response);
        handleModalOpen();
      }
    } catch (error) {
      throw error;
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleAddOpen = () => {
    handleModalOpen();
    setEditData([]);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    console.log(id, "wghgdwhgd");
    try {
      const response = await deleteEvents(id);
      if (response?.status) {
        fetchEventsList();
      }
    } catch (error) {}
    setEditingCard(null);
  };

  const handlePublicity = async (item) => {
    try {
      let payload = {
        eventId: item.eventId,
      }
      const response = await publishEvents(payload);
      if (response?.status) {
        fetchEventsList();
      }
    } catch (error) {}
    setEditingCard(null);
  };

  console.log(userData, "userDatauserData");

  return (
    <>
      {isModalOpen && (
        <EventsPopup
          open={isModalOpen}
          editDatas={isEditData}
          onClose={handleModalClose}
        />
      )}

      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: 2,
          }}
        >
          <Button
            style={{ backgroundColor: "#4C79F8" }}
            variant="contained"
            color="primary"
            onClick={handleAddOpen}
          >
            Add Event
          </Button>
        </Box>
        <Grid container spacing={1}>
          <CustomizedTables
            data={tableData}
            search={false}
            headers={headers}
            height={"300px"}
          />
        </Grid>
      </div>
    </>
  );
};

export default Events;
