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
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
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
import { eventsList } from "../../state/redux/authSlice";
import CloseIcon from "@mui/icons-material/Close";

const AttendanceForm = ({ open, onClose, editDatas }) => {
  const [loading, setLoading] = useState(false);
  const eventTitleOptions = [
    { label: "சித்திரை கொடை விழா", value: "சித்திரை கொடை விழா" },
    { label: "கார்த்திகை சிறப்பு கொடை விழா", value: "கார்த்திகை சிறப்பு கொடை விழா" },
    { label: "ஆடி கொடை விழா", value: "ஆடி கொடை விழா" },
    { label: "Other", value: "other" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const dispatch = useDispatch();
  const fetchEventList = async () => {
    try {
      const response = await getAllEvents({ page: 1, limit: 12 });
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
      setValue("eventName", editDatas?.eventName || "");
      setValue("startDate", editDatas?.startDate?.slice(0, 10) || "");
      setValue("endDate", editDatas?.endDate?.slice(0, 10) || "");
      setValue("amount", editDatas?.amount || "");
      setValue("lateFee", editDatas?.lateFee || "");
    }
  }, [editDatas, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        status: "active",
      };
  
      // Corrected date formatting
      if (/^\d{4}-\d{2}-\d{2}$/.test(payload.startDate)) {
        const [year, month, day] = payload.startDate.split("-");
        payload.startDate = `${day}-${month}-${year}`;
      }
      if (/^\d{4}-\d{2}-\d{2}$/.test(payload.endDate)) {
        const [year, month, day] = payload.endDate.split("-");
        payload.endDate = `${day}-${month}-${year}`;
      }
  
      let response;
      if (editDatas?._id) {
        response = await editEvents(editDatas._id, payload);
      } else {
        response = await createEvents(payload);
      }
  
      if (response?.status) {
        handleCancel();
        await fetchEventList();
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (error) {
      console.error("Error in add/edit committee meeting:", error.message || error);
    } finally {
      setLoading(false);
    }
  };  

  const handleCancel = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

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
                onClick={handleCancel}
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth error={!!errors.eventName}>
                <InputLabel>Event Name</InputLabel>
                <Select
                  {...register("eventName", { required: "Event Name is required" })}
                  defaultValue=""
                >
                  {eventTitleOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.eventName && (
                  <FormHelperText>{errors.eventName.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {watch("eventName") === "other" && (
              <Grid item xs={6}>
                <TextField
                  label="Other"
                  fullWidth
                  {...register("other", { required: "Please specify other event" })}
                  error={!!errors.other}
                  helperText={errors.other?.message}
                />
              </Grid>
            )}

            <Grid item xs={3}>
              <TextField
                label="Amount"
                type="number"
                fullWidth
                {...register("amount", { required: "Amount is required" })}
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="Late Fee"
                type="number"
                fullWidth
                {...register("lateFee", { required: "Late Fee is required" })}
                error={!!errors.lateFee}
                helperText={errors.lateFee?.message}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                {...register("startDate", { required: "Start Date is required" })}
                InputLabelProps={{ shrink: true }}
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="End Date"
                type="date"
                fullWidth
                {...register("endDate", {
                  required: "End Date is required",
                  validate: (value) => {
                    const startDate = new Date(watch("startDate"));
                    const endDate = new Date(value);
                    if (endDate < startDate) {
                      return "End Date cannot be before Start Date";
                    }
                  },
                })}
                InputLabelProps={{ shrink: true }}
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
              />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "right" }}>
              <Button variant="contained" type="submit" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default AttendanceForm;
