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
  IconButton,
} from "@mui/material";
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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";


const AttendanceForm = ({ open, onClose, editDatas }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object().shape({
    meetingtitle: yup.string().required("Event Name is required"),
    meetingDate: yup.date().required("Start Date is required"),
    meetingEndDate: yup
      .date()
      .required("End Date is required")
      .min(yup.ref("meetingDate"), "End Date cannot be before Start Date"),
    amount: yup.string()
      .required("Amount is required")
    ,
    lateFee: yup.string()
      .required("lateFee is required")

  });


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema), // ✅ Add Yup validation
    mode: "onChange", // Triggers validation on change
  });


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
      const parsedEndDate = new Date(editDatas?.endDate);

      // Check if it's a valid date
      if (!isNaN(parsedDate)) {
        const formattedDate = parsedDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        setValue("meetingDate", formattedDate); // Populate the meetingDate
      } else {
        console.error("Invalid date:", editDatas.meetingDate);
      }


      if (editDatas?.endDate) {
        let formattedEndDate = editDatas.endDate;

        // If the date is in "DD-MM-YYYY", convert it
        if (/^\d{2}-\d{2}-\d{4}$/.test(editDatas.endDate)) {
          const [day, month, year] = editDatas.endDate.split("-");
          formattedEndDate = `${year}-${month}-${day}`; // Convert to "YYYY-MM-DD"
        }

        setValue("meetingEndDate", formattedEndDate);
      }



      setValue("amount", editDatas?.amount || "");
      setValue("lateFee", editDatas?.lateFee || "");



    }
  }, [editDatas, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const formatDate = (dateStr) => {
        if (!dateStr) return ""; // Ensure it's not undefined/null

        if (dateStr instanceof Date) {
          // Convert Date to local YYYY-MM-DD format
          return new Date(dateStr.getTime() - dateStr.getTimezoneOffset() * 60000)
            .toISOString()
            .split("T")[0];
        }

        if (typeof dateStr === "string") {
          const parts = dateStr.split("-");
          return parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : dateStr;
        }

        return ""; // Default return for unexpected formats
      };


      const meetingDate = formatDate(data?.meetingDate);
      const meetingEndDate = formatDate(data?.meetingEndDate);

      const payload = {
        eventName: data?.meetingtitle || "",
        startDate: meetingDate,
        endDate: meetingEndDate,
        amount: data?.amount || 0,
        lateFee: data?.lateFee || 0,
        status: "active",
      };

      let response;
      if (editDatas?._id) {
        response = await editEvents(editDatas._id, payload);
      } else {
        response = await createEvents(payload);
      }

      console.log(response, "Response received");

      // Handle success based on API response
      if (response?.status === true) {
        handleCancel();

        await fetchEventList();
      }
      else {
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
              <IconButton
                onClick={handleCancel} // Define a function to close the modal or form
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="meetingtitle"
                control={control}
                slotProps={{ inputLabel: { shrink: true } }}
                render={({ field }) => (
                  <TextField {...field} label="Event Name" fullWidth error={!!errors.meetingtitle}
                    helperText={errors.meetingtitle?.message} />
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
                    error={!!errors.meetingDate}
                    helperText={errors.meetingDate?.message}
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
                    error={!!errors.meetingEndDate}
                    helperText={errors.meetingEndDate?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <TextField {...field} type="number" label="Amount" fullWidth error={!!errors.amount}
                    helperText={errors.amount?.message} />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="lateFee"
                control={control}
                render={({ field }) => (
                  <TextField {...field} type="number" label="Late Fee" fullWidth error={!!errors.lateFee}
                    helperText={errors.lateFee?.message} />

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
