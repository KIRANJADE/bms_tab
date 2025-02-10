import React, { useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Grid,
  Typography,
  Modal,
  Box,
  Autocomplete,
  FormControl,
  FormLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import axios from "axios";
import {
  createEvents,
  getAttendanceMembersList,
  CommitteeList,
  editCommiteeMeeting,
  getAllEvents,
  editEvents,
} from "../../state/redux/userApi";
import { useDispatch, useSelector } from "react-redux";
import {
 eventsList,
} from "../../state/redux/authSlice";

const AttendanceForm = ({ open, onClose, editDatas }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control, reset, setValue } = useForm();

  const committeData = useSelector((state) => state.auth.committeData);
  console.log(committeData?.userDetails, "committeData");

  const dispatch = useDispatch();



  const fetchEventList = async () => {
    let payload = { page: 1, limit: 12 };
    try {
      console.log("Fetching events with payload:", payload);
      const response = await getAllEvents(payload);
      console.log("API Response:", response);
  
      if (response.status) {
        dispatch(eventsList(response.eventDetails));
      }
    } catch (error) {
      console.error("Error in fetchEventList:", error);
      alert("API call failed");
    }
  };
  

  useEffect(() => {
    if (editDatas) {
      setValue("meetingtitle", editDatas?.eventName || "");
      const parsedDate = new Date(editDatas.startDate);
      const endData = new Date(editDatas.endDate);

      // Check if it's a valid date
      if (!isNaN(parsedDate)) {
        const formattedDate = parsedDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        setValue("meetingDate", formattedDate); // Populate the meetingDate
      } else {
        console.error("Invalid date:", editDatas.meetingDate);
      }

      if (!isNaN(endData)) {
        const formattedDate = endData.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        setValue("meetingEndDate", formattedDate); // Populate the meetingDate
      } else {
        console.error("Invalid date:", editDatas.meetingDate);
      }
     

      setValue("amount", editDatas?.amount || "");
      setValue("lateFee", editDatas?.lateFee || "");

   
   
    }
  }, [editDatas, setValue]);

  console.log(editDatas, "editDatas");

  const onSubmit = async (data) => {
    setLoading(true); // Start loader

    const payload = {
      eventName: data.meetingtitle,
      startDate: data.meetingDate,
      endDate: data.meetingEndDate,
      amount: data.amount,
      lateFee: data.lateFee,
      status: "active",
    };

    try {
      let response;
      if (editDatas && editDatas._id) {
        response = await editEvents(editDatas._id, payload);
      } else {
        response = await createEvents(payload);
      }

      console.log(response, "responseresponse");

      if (response?.status || response?.ok) {
        await fetchEventList();
        handleCancel();
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (error) {
      console.error("Error in add/edit committee meeting:", error);
    } finally {
      setLoading(false); // Stop loader after API call
    }
  };

  const handleCancel = useCallback(() => {
    reset(); // Reset form values
    onClose(); // Close the modal or form
  }, [reset, onClose]); // Dependencies ensure this function is stable

  console.log(editDatas.length, "editDatas");

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Event Details</Typography>
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="meetingtitle"
                control={control}
                slotProps={{ inputLabel: { shrink: true } }}
                render={({ field }) => (
                  <TextField {...field} label="Event Name" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="meetingDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="Start Date"
                    fullWidth
                    inputProps={{ min: new Date().toISOString().split("T")[0] }}
                    InputLabelProps={{ shrink: true }} // Fixes label overlap
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="meetingEndDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="End Date"
                    fullWidth
                    inputProps={{ min: new Date().toISOString().split("T")[0] }}
                    InputLabelProps={{ shrink: true }} // Fixes label overlap
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Amount" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="lateFee"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Late Fee" fullWidth />
                )}
              />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
              <Button
                variant="outlined"
                color="primary"
                style={{ color: "#4C79F8", borderColor: "#4C79F8" }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ minWidth: 100, position: "relative" }} // Ensures consistent button size
              >
                {loading ? (
                  <>
                    <span style={{ color: "black" }}>Processing...</span>
                    <CircularProgress size={20} sx={{ color: "black" }} />
                  </>
                ) : editDatas?._id ? (
                  "Update"
                ) : (
                  "Add"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default AttendanceForm;
