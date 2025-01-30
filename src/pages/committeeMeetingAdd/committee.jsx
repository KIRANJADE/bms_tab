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
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import axios from "axios";
import {
  createCommitteMeeting,
  getAttendanceMembersList,
  CommitteeList,
} from "../../state/redux/userApi";
import { useDispatch, useSelector } from "react-redux";
import {
  committeCommonData,
  committeeListData,
} from "../../state/redux/authSlice";

// const defaultValues = {
//   isAddAttendance: true,
//   meetingtitle: "pothu kulu kuttam",
//   meetingDate: "13-11-2024",
//   fineAmount: "10",
//   status: "active",
//   administrator: "", // Added administrator field
//   userDetails: [
//     {
//       _id: "676bc769f9eaeb1e39ce6006",
//       profile: { firstname: "நவாப்நாதன்", lastname: "செ", gender: "male" },
//       status: "active",
//       memberdetails: {
//         memberType: "a-class",
//         memberId: "A0001",
//         userType: "full",
//       },
//       attendance: false,
//     },
//     {
//       _id: "676bc769f9eaeb1e39ce6007",
//       profile: { firstname: "துரைபாண்டியன்", lastname: "கி", gender: "male" },
//       status: "active",
//       memberdetails: {
//         memberType: "a-class",
//         memberId: "A0002",
//         userType: "full",
//       },
//       attendance: true,
//     },
//   ],
// };

console.log()
const AttendanceForm = ({ open, onClose }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const { handleSubmit, control, reset } = useForm();

  const committeData = useSelector((state) => state.auth.committeData);
  console.log(committeData?.userDetails, "committeData");

  const dispatch = useDispatch();

  useEffect(() => {
    fetchAttendanceCommonmembers();
  }, []);

  const fetchAttendanceCommonmembers = async () => {
    try {
      const response = await getAttendanceMembersList();
      console.log(response);
      if (response?.status) {
        dispatch(committeCommonData(response));
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchCommitteeList = async () => {
    // setLoading(true);
    try {
      const response = await CommitteeList(page, limit, {
        status: "active",
      });

      if (response.status) {
        dispatch(committeeListData(response.userDetails));
        // setTotalPages(response.totalPages);
      }
    } catch (error) {
      setError("Failed to fetch user data");
    } finally {
      // setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const payload = {
      isAddAttendance: true,
      meetingtitle: data.meetingtitle,
      meetingDate: data.meetingDate,
      fineAmount: data.fineAmount,
      status: "active",
      userDetails: data.userDetails.map((user) => ({
        _id: user._id,
        profile: {
          firstname: user.profile.firstname,
          lastname: user.profile.lastname,
          gender: user.profile.gender,
        },
        status: user.status,
        memberdetails: {
          memberType: user.memberdetails.memberType,
          memberId: user.memberdetails.memberId,
          userType: user.memberdetails.userType,
        },
        attendance: Boolean(user.attendance),
      })),
    };

    try {
      const response = await createCommitteMeeting(payload);
      if (response?.status || response?.ok) {
        await fetchCommitteeList();
        onClose();
        reset();
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  const handleCancel = useCallback(() => {
    reset(); // Reset form values
    onClose(); // Close the modal or form
  }, [reset, onClose]); // Dependencies ensure this function is stable

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
                slotProps={{ inputLabel: { shrink: true } }}
                render={({ field }) => (
                  <TextField {...field} label="Meeting Title" fullWidth />
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
                    label="Meeting Date"
                    fullWidth
                    InputLabelProps={{ shrink: true }} // Fixes label overlap
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="fineAmount"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Fine Amount" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="administrator"
                control={control}
                render={({ field }) => (
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Administrator</FormLabel>
                    <RadioGroup
                      row
                      {...field}
                      value={field.value ?? ""} // Ensure default value
                      onChange={(e) =>
                        field.onChange(e.target.value === "true")
                      }
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="True"
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="False"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">User Details</Typography>
            </Grid>
            <Grid item xs={12}>
              {console.log(
                committeData?.userDetails,
                "committeData?.userDetails"
              )}
              {/* <Controller
                name="userDetails"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    options={
                      Array.isArray(committeData?.userDetails)
                        ? committeData?.userDetails // Pass the whole array, not just the profile
                        : [] // Ensure it's an array
                    }
                    getOptionLabel={
                      (option) =>
                        `${option?.profile?.firstname || ""} ${
                          option?.profile?.lastname || ""
                        }` // Access profile correctly
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Select Users" fullWidth />
                    )}
                    onChange={(_, value) => field.onChange(value)}
                  />
                )}
              /> */}
              <Controller
  name="userDetails"
  control={control}
  render={({ field }) => (
    <Autocomplete
      {...field}
      multiple
      options={
        Array.isArray(committeData?.userDetails)
          ? committeData?.userDetails
          : []
      }
      disableCloseOnSelect
      getOptionLabel={(option) =>
        `${option?.profile?.firstname || ""} ${option?.profile?.lastname || ""}`
      }
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon />}
            checkedIcon={<CheckBoxIcon />}
            checked={selected}
          />
          {`${option?.profile?.firstname || ""} ${
            option?.profile?.lastname || ""
          }`}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Select Users" fullWidth />
      )}
      onChange={(_, value) => field.onChange(value)}
    />
  )}
/>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleCancel}
              >
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
