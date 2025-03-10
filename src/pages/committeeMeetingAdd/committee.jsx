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
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import axios from "axios";
import {
  createCommitteMeeting,
  getAttendanceMembersList,
  editCommiteeMeeting,
} from "../../state/redux/userApi";
import { useDispatch, useSelector } from "react-redux";
import {
  committeCommonData,
  committeeListData,
} from "../../state/redux/authSlice";
import CloseIcon from "@mui/icons-material/Close";

const AttendanceForm = ({ open, onClose, editDatas }) => {
  const { handleSubmit, control, reset, setValue, formState: { errors }, watch } = useForm({
    defaultValues: {
      isAddAttendance: true, // Set default to true
      meetingtitle: "",
      meetingDate: "",
      fineAmount: "",
      userDetails: [],
    },
  });

  const [loading, setLoading] = useState(false);
  const committeData = useSelector((state) => state.auth.committeData);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAttendanceCommonmembers();
  }, []);

  useEffect(() => {
    if (editDatas?.length > 0) {
      setValue("meetingtitle", editDatas?.meetingtitle || "");
      let formattedmeetingDate = "";
      if (/^\d{2}-\d{2}-\d{4}$/.test(editDatas.meetingDate)) {
        const [day, month, year] = editDatas.meetingDate.split("-");
        formattedmeetingDate = `${year}-${month}-${day}`;
      }
      setValue("meetingDate", formattedmeetingDate);
      setValue("fineAmount", editDatas?.fineAmount || "");
      setValue("isAddAttendance", editDatas.isAddAttendance ?? true);
      setValue("userDetails", (editDatas?.userDetails || []).filter(user => user?.attendance === true));
    }
  }, [editDatas, setValue]);

  const fetchAttendanceCommonmembers = async () => {
    try {
      const response = await getAttendanceMembersList();
      if (response?.status) {
        dispatch(committeCommonData(response));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const onSubmit = async (data) => {
    setLoading(true);
    const updatedUserDetails = committeData?.userDetails.map((user) => {
      const isSelected = data.userDetails?.some(
        (selectedUser) => selectedUser._id === user._id
      );
      return {
        _id: user._id,
        profile: user.profile,
        status: user.status,
        memberdetails: user.memberdetails,
        attendance: isSelected,
      };
    });

    const payload = {
      ...data,
      userDetails: updatedUserDetails,
      status: "active",
    };

    if (/^\d{4}-\d{2}-\d{2}$/.test(payload.meetingDate)) {
      const [year, month, day] = payload.meetingDate.split("-");
      payload.meetingDate = `${day}-${month}-${year}`;
    }

    console.log(payload,'payload')

    try {
      let response;
      if (editDatas && editDatas._id) {
        response = await editCommiteeMeeting(editDatas._id, payload);
      } else {
        response = await createCommitteMeeting(payload);
      }
      if (response?.status || response?.ok) {
        handleCancel();
      }
    } catch (error) {
      console.error("Error in add/edit committee meeting:", error);
    } finally {
      setLoading(false);
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
              <IconButton
                onClick={handleCancel}
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="meetingDate"
                control={control}
                rules={{ required: "Meeting Date is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="Meeting Date"
                    fullWidth
                    inputProps={{
                      min: new Date().toISOString().split("T")[0],
                    }}
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.meetingDate}
                    helperText={errors.meetingDate?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={3}>
              <Controller
                name="isAddAttendance"
                control={control}
                render={({ field }) => (
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Is Attendance Required</FormLabel>
                    <RadioGroup
                      row
                      {...field}
                      value={field.value ?? true}
                      onChange={(e) => field.onChange(e.target.value === "true")}
                    >
                      <FormControlLabel value={true} control={<Radio />} label="Yes" />
                      <FormControlLabel value={false} control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>

            {watch("isAddAttendance") === true && (
              <Grid item xs={3}>
                <Controller
                  name="fineAmount"
                  control={control}
                  rules={{ required: "Fine Amount is required" }}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      {...field}
                      label="Fine Amount"
                      fullWidth
                      error={!!errors.fineAmount}
                      helperText={errors.fineAmount?.message}
                    />
                  )}
                />
              </Grid> 
            )}

            {control._formValues.isAddAttendance && (
              <Grid item xs={12}>
                <Controller
                  name="userDetails"
                  control={control}
                  rules={{ required: "Please select at least one user" }}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      multiple
                      options={committeData?.userDetails || []}
                      disableCloseOnSelect
                      getOptionLabel={(option) =>
                        `${option?.profile?.firstname || ""} ${option?.profile?.lastname || ""}`
                      }
                      onChange={(_, value) => field.onChange(value)}
                      renderOption={(props, option) => (
                        <li {...props}>
                          <Checkbox
                            icon={<CheckBoxOutlineBlankIcon />}
                            checkedIcon={<CheckBoxIcon />}
                            checked={field.value?.some((val) => val._id === option._id) || false}
                          />
                          {`${option?.profile?.firstname || ""} ${option?.profile?.lastname || ""}`}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Users"
                          fullWidth
                          error={!!errors.userDetails}
                          helperText={errors.userDetails?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>
            )}

            <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" color="primary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
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
