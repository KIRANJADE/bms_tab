import React, { useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField,Radio,RadioGroup,FormControlLabel,Button,Grid,Typography,Modal,Box,Autocomplete,FormControl,FormLabel,Checkbox,CircularProgress,IconButton,Select, MenuItem,} from "@mui/material";
import axios from "axios";
import {
  createDeath,
  getAllDeath,
  editDeath,
  familyList,
} from "../../state/redux/userApi";
import { useDispatch, useSelector } from "react-redux";
import { eventsList, familyListData, death } from "../../state/redux/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const AttendanceForm = ({ open, onClose, editDatas }) => {
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object().shape({
    isMember: yup.string().required("Please select if the person was a member"),
    
    memberId: yup.string().nullable().when("isMember", (isMember, schema) => 
      isMember === "yes" ? schema.required("Member ID is required") : schema
    ),
  
    familyId: yup.string().nullable().when("isMember", (isMember, schema) => 
      isMember === "yes" ? schema.required("Family ID is required") : schema
    ),
  
    isAttendance: yup.string().required("Please select attendance status"),
  
    deathDate: yup.date().required("Death Date is required"),
  
    funeralDate: yup.date()
      .required("Funeral Date is required")
      .min(yup.ref("deathDate"), "Funeral Date cannot be before Death Date"),
  
    fineAmount: yup.number()
      .typeError("Fine Amount must be a number")
      .min(0, "Fine Amount cannot be negative")
      .required("Fine Amount is required"),
  
    description: yup.string().required("Description is required"),
  
    userDetails: yup.array().when("isAttendance", (isAttendance, schema) => 
      isAttendance === "yes" 
        ? schema.min(1, "Select at least one user").required()
        : schema
    ),
  });
  
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema), // ✅ Add Yup validation
    mode: "onChange", // Triggers validation on change
  });

  const isMember = watch("isMember");
  const isAddAttendance = watch("isAttendance");

  const memberList = useSelector((state) => state.auth.memberListData);
  const famList = useSelector((state) => state.auth.familyData);
  console.log(editDatas, "committeData");

  const dispatch = useDispatch();


  const fetchDeathList = async () => {
    let payload = { page: 1, limit: 12 };
    try {
      console.log("Fetching events with payload:", payload);
      const response = await getAllDeath(payload);
      console.log("API Response:", response);

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
      console.log("Fetching events with payload:", payload);
      const response = await familyList(payload);
      console.log("API Response:", response);

      if (response.status) {
        dispatch(familyListData(response?.familydetails));
      }
    } catch (error) {
      console.error("Error in fetchDeathList:", error);
    }
  };

  useEffect(() => {
    if (isMember === "yes" && watch("memberId")) {
      let payload = { memberId: "100/000/0094" };
      fetchFamilyData(payload);
    }
  }, [isMember, watch("memberId")]);

  useEffect(() => {
    if (editDatas) {

      const formatDate = (dateStr) => {
        if (!dateStr) return "";
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
          // Convert DD/MM/YYYY -> YYYY-MM-DD
          const [day, month, year] = dateStr.split("/");
          return `${year}-${month}-${day}`;
        } else if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
          // Convert DD-MM-YYYY -> YYYY-MM-DD
          const [day, month, year] = dateStr.split("-");
          return `${year}-${month}-${day}`;
        }
        return dateStr; // Already in correct format
      };
    
    
      setValue("isMember", editDatas.ismember ? "yes" : "no");
      setValue("memberId", editDatas.memberId || "");
      setValue("familyId", editDatas.familyId || "");
      setValue("isAttendance", editDatas.isAddAttendance ? "yes" : "no");
      setValue("fineAmount", editDatas.fineAmount || "");
      setValue("description", editDatas.description || "");

      // Format Death Date (Ensure it's YYYY-MM-DD)
      if (editDatas.deathDate) {
        const formattedDeathDate = formatDate(editDatas.deathDate);
        setValue("deathDate", formattedDeathDate);
      }

      // Format Funeral Date
      if (editDatas.funeralDate) {
        const formattedFuneralDate = formatDate(editDatas.funeralDate);
        setValue("funeralDate", formattedFuneralDate);
      }

      // Prepopulate userDetails in Autocomplete
      if (editDatas.userDetails) {
        setValue("userDetails", editDatas.userDetails);
      }
    }
  }, [editDatas, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const formatDate = (dateStr) => {
        if (!dateStr) return ""; // Ensure it's not undefined/null
      
        if (dateStr instanceof Date) {
          // Convert Date to local DD-MM-YYYY format
          return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }).format(dateStr);
        }
      
        if (typeof dateStr === "string") {
          const parts = dateStr.split("-");
          return parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : dateStr;
        }
      
        return ""; // Default return for unexpected formats
      };
      

      const deathDate = formatDate(data.deathDate);
      const funeralDate = formatDate(data?.funeralDate);

      const payload = {
        ismember: data.isMember === "yes" ? true : false,
        memberId: data.memberId || "",
        familyId: data.familyId || "",
        isAddAttendance: data.isAttendance === "yes" ? true : false,
        deathDate: deathDate,
        funeralDate: funeralDate,
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

      console.log(response, "Response received");

      // Handle success based on API response
      if (response?.status === true) {
        handleCancel();

        await fetchDeathList();
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

  console.log(Array.isArray(memberList?.userDetails) ? memberList?.userDetails : ["jejk"], "editDatas");

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
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Add Death</Typography>
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            </Grid>

            <Grid item xs={12}>
              <Typography>Is Member</Typography>
              <Controller
                name="isMember"
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

            <Grid item xs={6}>
              <Controller
                name="memberId"
                control={control}
                render={({ field }) => (
                  <TextField {...field} select label="Member ID" fullWidth>
                    {memberList.map((member) => (
                      <MenuItem
                        key={member._id}
                        value={member?.memberdetails?.memberId}
                      >
                        {member?.memberdetails?.memberId}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            {isMember === "yes" && (
              <Grid item xs={6}>
                <Controller
                  name="familyId"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select label="Family ID" fullWidth>
                     
                      {famList && famList?.map((family) => (
                        <MenuItem key={family._id} value={family.familyId}>
                          {family.familyId}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
            )}

            <Grid item xs={6}>
              <Typography>Is Add Attendance</Typography>
              <Controller
                name="isAttendance"
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

            <Grid item xs={6}>
              <Controller
                name="deathDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="Death Date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="funeralDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="Funeral Date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="fineAmount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Fine Amount"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    multiline
                    rows={3}
                    fullWidth
                  />
                )}
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


            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Button variant="outlined" color="primary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default AttendanceForm;
