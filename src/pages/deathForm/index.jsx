import React, { useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField, Radio, RadioGroup, FormControlLabel, Button, Grid, Typography, Modal, Box, IconButton, Autocomplete,FormControl,
  FormLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  createDeath, getAllDeath, editDeath, familyList, getallmembersList
} from "../../state/redux/userApi";
import { useDispatch, useSelector } from "react-redux";
import {familyListData, death } from "../../state/redux/authSlice";
import CloseIcon from "@mui/icons-material/Close";

const AttendanceForm = ({ open, onClose, editDatas }) => {
  const [loading, setLoading] = useState(false);
  const [memberDropdownDetails, setMemberDropdownDetails] = useState([]);
  const [membersData, setMembersData] = useState([]);
  const [familyFiter, setFamilyFiter] = useState({})
  const [familyDropdownFiter, setFamilyDropdownFiter]= useState([]);
  const [familyData, setFamilyData] = useState([]);

  const dispatch = useDispatch();

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

  const isMember = watch("isMember");
  const isAddAttendance = watch("isAddAttendance");

  const memberList = useSelector((state) => state.auth.memberListData);
  const famList = useSelector((state) => state.auth.familyData);

  const fetchDeathList = async () => {
    let payload = { page: 1, limit: 12 };
    try {
      const response = await getAllDeath(payload);
      if (response.status) {
        dispatch(death(response.deathdetails));
      }
    } catch (error) {
      console.error("Error in fetchDeathList:", error);
      alert("API call failed");
    }
  };

  const fetchFamilyData = async (payload) => {
    try {
      const response = await familyList(payload);
      if (response.status) {
        dispatch(familyListData(response?.familydetails));
      }
    } catch (error) {
      console.error("Error in fetchFamilyData:", error);
    }
  };

  // useEffect(() => {
  //   if (isMember === "yes" && watch("memberId")) {
  //     let payload = { memberId: "100/000/0094" };
  //     fetchFamilyData(payload);
  //   }
  // }, [isMember, watch("memberId")]);

  useEffect(() => {
    if (editDatas) {
      setValue("isMember", editDatas.ismember ? "yes" : "no");
      setValue("memberId", editDatas.memberId || "");
      setValue("familyId", editDatas.familyId || "");
      setValue("isAddAttendance", editDatas.isAddAttendance ? "yes" : "no");
      setValue("fineAmount", editDatas.fineAmount || "");
      setValue("description", editDatas.description || "");
      setValue("deathDate", editDatas.deathDate || "");
      setValue("funeralDate", editDatas.funeralDate || "");
      setValue("userDetails", editDatas.userDetails || []);
    }
  }, [editDatas, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        ismember: data.isMember === "yes",
        memberId: data.memberId || "",
        familyId: data.familyId || "",
        isAddAttendance: data.isAddAttendance === "yes",
        deathDate: data.deathDate,
        funeralDate: data.funeralDate,
        fineAmount: String(data.fineAmount),
        description: data.description,
        userDetails: data.userDetails,
        status: "active",
      };

      let response;
      if (editDatas?._id) {
        response = await editDeath(editDatas._id, payload);
      } else {
        response = await createDeath(payload);
      }

      if (response?.status === true) {
        handleCancel();
        await fetchDeathList();
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (error) {
      console.error("Error in add/edit:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  useEffect(() => {
    fetchMembersList();
    fetchFamilyMembersList();
  }, []);

  useEffect(() => {
    fetchFamilyMembersList();
  }, [familyFiter]);

  const fetchMembersList = async () => {
    try {
      const response = await getallmembersList();
      if (response?.status && Array.isArray(response.userDetails)) {
        const formattedMembers = response.userDetails.map(user => ({
          label: `${user.profile.firstname} ${user.profile.lastname} - (${user.memberdetails.memberId})`.trim(),
          value: user.memberdetails.memberId
        }));
  
        setMemberDropdownDetails(formattedMembers);
        setMembersData(response.userDetails)
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const fetchFamilyMembersList = async () => {
    try {
      const response = await familyList(familyFiter);    
      if (response?.status && Array.isArray(response.familydetails)) {
        const formattedMembers = response.familydetails.map(user => ({
          label: `${user.profile.firstname} ${user.profile.lastname} (${user.subLevelNo})`.trim(),
          value: user.subLevelNo
        }));
  
        setFamilyDropdownFiter(formattedMembers);
        setFamilyData(response.familydetails);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
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
            <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Add Death</Typography>
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12}  display="flex">
              <Grid item xs={4}>
                <Typography>Is Member</Typography>
                <Controller
                  name="isMember"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  )}
                />
                {errors.isMember && <Typography color="error">{errors.isMember.message}</Typography>}
              </Grid>

              <Grid item xs={4}>
                <Typography>Is Add Attendance</Typography>
                <Controller
                  name="isAddAttendance"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />
              </Grid>

              {isAddAttendance === "yes" && (
                <Grid item xs={4}>
                  <TextField
                  type="number"
                    label="Fine Amount"
                    fullWidth
                    {...register("fineAmount", {
                      required: "Fine Amount is required",
                      validate: (value) => value >= 0 || "Fine Amount cannot be negative",
                    })}
                    error={!!errors.fineAmount}
                    helperText={errors.fineAmount?.message}
                  />
                </Grid>
              )}
            </Grid>

            {isMember === "yes" && (
              <Grid item xs={6}>
                <Controller
                  name="memberId"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      options={memberDropdownDetails}
                      getOptionLabel={(option) => option.label || ""}
                      value={memberDropdownDetails.find((option) => option.value === field.value) || null}
                      onChange={(_, newValue) => {
                        if (newValue) {
                          setValue("memberId", newValue ? newValue.value : "");
                          const selectedmember = membersData.reduce((acc, member) => {
                            return member.memberdetails.memberId === newValue?.value ? member : acc;
                          }, "");
                          setFamilyFiter({ familyId: newValue ? selectedmember.familyId : "" });
                        } else {
                          setValue("memberId", "");
                          setFamilyFiter({ });
                        }
                      }}
                      isOptionEqualToValue={(option, value) => option.value === value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Member Id"
                          variant="outlined"
                          error={!!errors.memberId}
                          helperText={errors.memberId?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>
            )}

            <Grid item xs={6}>
              <Controller
                name="familyId"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    options={familyDropdownFiter}
                    getOptionLabel={(option) => option.label || ""}
                    value={familyDropdownFiter.find((option) => option.value === field.value) || null}
                    onChange={(_, newValue) => {
                      setValue("familyId", newValue ? newValue.value : "");
                      if (newValue) {
                        const cleanedLabel = newValue.label.replace(/\s*\(.*?\)\s*/g, "").trim();
                        setValue("familyname", cleanedLabel);
                      } else {
                        setValue("familyname", "");
                      }
                      const selectedfamilymember = familyData.filter(
                        (family) => family.familyId === newValue?.value
                      );
                      const formattedfamilyMembers = selectedfamilymember.map((user) => ({
                        label: `${user.profile.firstname} (${user.subLevelNo})`.trim(),
                        value: user.subLevelNo,
                      }));
                      SetParentLevel(formattedfamilyMembers);
                    }}
                    isOptionEqualToValue={(option, value) => option.value === value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Family Id"
                        variant="outlined"
                        error={!!errors.familyId}
                        helperText={errors.familyId?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="Death Date"
                type="date"
                fullWidth
                {...register("deathDate", { required: "Death Date is required" })}
                InputLabelProps={{ shrink: true }}
                error={!!errors.deathDate}
                helperText={errors.deathDate?.message}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="Funeral Date"
                type="date"
                fullWidth
                {...register("funeralDate", {
                  required: "Funeral Date is required",
                  validate: (value) => {
                    const deathDate = watch("deathDate");
                    if (deathDate && value < deathDate) {
                      return "Funeral Date cannot be before Death Date";
                    }
                    return true;
                  },
                })}
                InputLabelProps={{ shrink: true }}
                error={!!errors.funeralDate}
                helperText={errors.funeralDate?.message}
              />
            </Grid>

            
            {isAddAttendance === "yes" && (
              <Grid item xs={12}>
                <Controller
                  name="userDetails"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      multiple
                      options={Array.isArray(memberList) ? memberList : []}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option?.profile?.firstname || ""}
                      value={field.value || []}
                      onChange={(_, value) => field.onChange(value)}
                      isOptionEqualToValue={(option, value) => option._id === value._id}
                      renderOption={(props, option) => {
                        const isSelected = (field.value || []).some((val) => val._id === option._id);
                        return (
                          <li {...props}>
                            <Checkbox
                              icon={<CheckBoxOutlineBlankIcon />}
                              checkedIcon={<CheckBoxIcon />}
                              checked={isSelected}
                            />
                            {option?.profile?.firstname || ""}
                          </li>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Users" fullWidth />
                      )}
                    />
                  )}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                {...register("description", { required: "Description is required" })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>

            <Grid item xs={12} textAlign="right">
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default AttendanceForm;
