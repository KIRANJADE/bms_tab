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
  TablePagination,
} from "@mui/material";
import CommitteePopup from "../committeeMeetingAdd/committee";
import { useDispatch, useSelector } from "react-redux";
import CustomizedTables from "../../components/tableView/table";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { set } from "react-hook-form";
import {
  CommitteeList,
  deleteCommiteeDetails,
  getCommiteemeetingDetailsById,
} from "../../state/redux/userApi";
import { committeebyId, committeeListData } from "../../state/redux/authSlice";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer } from "react-toastify";

const User = () => {
  const [editingCard, setEditingCard] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false); // Modal open state
  const [tableData, setTableData] = React.useState([]);
  const [isEditData, setEditData] = React.useState([]);
  const [page, setPage] = useState(0); // Changed to 0 (MUI pagination starts from 0)
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [totalRecords, setTotalRecords] = useState(0);
  const [limit, setLimit] = useState(12);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [userData, setUserData] = useState([]);

  const committeeData = useSelector((state) => state.auth?.committeeData || []);
  const committeeByIdData = useSelector(
    (state) => state.auth?.committeId || []
  );
  const dispatch = useDispatch();

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
    if (committeeData && committeeData.length > 0) {
      const formattedData = committeeData.map((item) => ({
        id: item?.committeemeetingId,
        attendance: item?.isAddAttendance === true ? "Yes" : "No",
        name: item.meetingtitle,
        date: item.meetingDate,
        amount: item.fineAmount || "-",
        status: item.status,
        actions: (
          <div style={{ display: "flex", gap: "8px" }}>
            <IconButton
              color="primary"
              size="small"
              onClick={() => handleEdit(item)}
              disabled={item.isComplete}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="info"
              size="small"
              onClick={() => handleView(item)}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </div>
        ),
      }));
      setTableData(formattedData);
    }
  }, [committeeData]);

  useEffect(() => {
    fetchCommitteeList();
    }, [page, rowsPerPage]);

  const fetchCommitteeList = async () => {
    console.log('CommitteeList')
    // setLoading(true);
    let payload = { page: page + 1, limit: rowsPerPage };
    console.log(payload)
    try {
      const response = await CommitteeList(payload, {
        status: "active",
      });

      if (response.status) {
        dispatch(committeeListData(response.userDetails));
        setTotalRecords(response.totalRecords || 0);
        // setTotalPages(response.totalPages);
      }
    } catch (error) {
      setError("Failed to fetch user data");
    } finally {
      // setLoading(false);
    }
  };

  const handleEdit = (data) => {
    getCommiteeMemberById(data?._id, "Edit");
  };

  const getCommiteeMemberById = async (value, data) => {
    try {
      const response = await getCommiteemeetingDetailsById(value);
      console.log(response);
      if (response?.status) {
        dispatch(committeebyId(response));
        if (data === "Edit") {
          setEditData(response);
          handleModalOpen();
        }
        if (data === "View") {
          setViewData(response);
          console.log("response",response);
          
          const formattedViewData = response?.userDetails?.map((item) => ({
            id: item?.committeemeetingId,
            memberId: item?.memberId,
            name: item?.membername,
            attendance: item?.attendance === true ? "True" : "False",
          }));
          setUserData(formattedViewData);
          setIsViewModalOpen(true);
        }
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
      const response = await deleteCommiteeDetails(id);
      if (response?.status) {
        fetchCommitteeList();
      }
    } catch (error) {}
    setEditingCard(null);
  };

  console.log(userData, "userDatauserData");


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
        <CommitteePopup
          open={isModalOpen}
          editDatas={isEditData}
          onClose={handleModalClose}
        />
      )}
       <ToastContainer position="top-right" autoClose={3000} />

      {/* View Modal */}
      <Modal open={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            height: "90vh",
            bgcolor: "background.paper",
            borderRadius: 4,
            boxShadow: 24,
            overflow: "scroll",
            textAlign: "center", // Center the text
          }}
        >
          {/* Modal Header */}
          <Box
            sx={{
              position: "sticky",
              top: 0,
              bgcolor: "linear-gradient(to right, #4facfe, #00f2fe)",
              borderRadius: "4px 4px 0 0",
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Meeting Details
              </Typography>
              <Typography variant="body1">
                {viewData?.committeemeetingId}
              </Typography>
            </Box>

            <IconButton onClick={() => setIsViewModalOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>


          {/* Modal Content */}
          <Box  sx={{ flex: 1, overflowY: "auto", p: 3 ,}}>
            <Grid container spacing={2}>
              {viewData && (
                <>
                  <Grid container spacing={3} alignItems="center" style={{marginBottom:"20px"}}>
                    <Grid item xs>
                      <Typography variant="caption" fontWeight="bold">
                        Meeting Title
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {viewData.meetingtitle}
                      </Typography>
                    </Grid>

                    <Grid item xs>
                      <Typography variant="caption" fontWeight="bold">
                        Attendance
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 1,
                            backgroundColor: viewData.isAddAttendance ? "#27ae6054" : "#FDEDCB",
                            color: viewData.isAddAttendance ? "#27AE60" : "#D6940B",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            fontWeight: "bold",
                            fontSize: "14px",
                          }}
                        >
                          {viewData.isAddAttendance ? "Yes" : "No"}
                        </Box>
                      </Typography>
                    </Grid>

                    <Grid item xs>
                      <Typography variant="caption" fontWeight="bold">
                        Meeting Date
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {viewData.meetingDate}
                      </Typography>
                    </Grid>

                    <Grid item xs>
                      <Typography variant="caption" fontWeight="bold">
                        Fine Amount
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        ₹{viewData.fineAmount}
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="caption" fontWeight="bold">
                        True Count
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 1,
                            backgroundColor: viewData.isAddAttendance ? "#27ae6054" : "#FDEDCB",
                            color: viewData.isAddAttendance ? "#27AE60" : "#D6940B",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            fontWeight: "bold",
                            fontSize: "14px",
                          }}
                        >
                          {viewData.attendanceSummary.trueCount}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="caption" fontWeight="bold">
                        False Count
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 1,
                            backgroundColor: viewData.isAddAttendance ? "#f9b2a0" : "#f9b2a0",
                            color: viewData.isAddAttendance ? "#e74645" : "#e74645",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            fontWeight: "bold",
                            fontSize: "14px",
                          }}
                        >
                          {viewData.attendanceSummary.falseCount}
                        </Box>
                      </Typography>
                    </Grid>
                  </Grid>

                  <CustomizedTables data={userData} search={false} headers={viewTableHeader} />

                </>
              )}
            </Grid>
          </Box>
        </Box>
      </Modal>
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
            Add Committee meeting
          </Button>
        </Box>
        <Grid container spacing={1}>
          <CustomizedTables data={tableData} search={false} headers={headers} height={"300px"} />
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
      </div>
    </>
  );
};

export default User;
