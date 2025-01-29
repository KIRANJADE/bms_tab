import React, { useEffect } from "react";
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
} from "@mui/material";
import axios from "axios";
import { getAttendanceMembersList } from "../../state/redux/userApi";
import { useDispatch, useSelector } from "react-redux";
import { committeCommonData } from "../../state/redux/authSlice";

const defaultValues = {
  isAddAttendance: true,
  meetingtitle: "pothu kulu kuttam",
  meetingDate: "13-11-2024",
  fineAmount: "10",
  status: "active",
  administrator: "", // Added administrator field
  userDetails: [
    {
      _id: "676bc769f9eaeb1e39ce6006",
      profile: { firstname: "நவாப்நாதன்", lastname: "செ", gender: "male" },
      status: "active",
      memberdetails: { memberType: "a-class", memberId: "A0001", userType: "full" },
      attendance: false,
    },
    {
      _id: "676bc769f9eaeb1e39ce6007",
      profile: { firstname: "துரைபாண்டியன்", lastname: "கி", gender: "male" },
      status: "active",
      memberdetails: { memberType: "a-class", memberId: "A0002", userType: "full" },
      attendance: true,
    },
  ],
};

const AttendanceForm = ({ open, onClose }) => {
  const { handleSubmit, control } = useForm({ defaultValues });

  const committeData = useSelector((state) => state.auth.committeData)
console.log(committeData?.userDetails,"committeData");

  const dispatch = useDispatch();

  useEffect(() => {
	fetchAttendanceCommonmembers()
  }, [])

  const fetchAttendanceCommonmembers = async () => {
	try {
		const response = await getAttendanceMembersList();
		console.log(response);
		if (response?.status) {
			dispatch(committeCommonData(response))
		}
	} catch (error) {
		throw error
	}
  }
  

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      userDetails: data.userDetails.map((user) => ({
        _id: user._id,
        attendance: user.attendance === "true",
      })),
    };
    try {
      const response = await axios.post("/api/attendance", payload);
      console.log("API Response:", response.data);
      onClose();
    } catch (error) {
      console.error("API Error:", error);
    }
  };

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
              <Typography variant="h6">Meeting Details</Typography>
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="meetingtitle"
                control={control}
                render={({ field }) => <TextField {...field} label="Meeting Title" fullWidth />}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="meetingDate"
                control={control}
                render={({ field }) => <TextField {...field} label="Meeting Date" fullWidth />}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="fineAmount"
                control={control}
                render={({ field }) => <TextField {...field} label="Fine Amount" fullWidth />}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="administrator"
                control={control}
                render={({ field }) => <TextField {...field} label="Administrator" fullWidth />}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">User Details</Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="userDetails"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    options={defaultValues?.userDetails}
                    getOptionLabel={(option) => `${option?.profile?.firstname} ${option?.profile?.lastname}`}
                    renderInput={(params) => <TextField {...params} label="Select Users" fullWidth />}
                    onChange={(_, value) => field.onChange(value)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Button variant="outlined" color="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default AttendanceForm;
