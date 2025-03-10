import { useForm, Controller } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { 
  Modal, Box, Typography, Grid, IconButton, Divider, Button, 
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, 
  FormHelperText, TextField, InputLabel, Select, MenuItem ,Autocomplete,Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  getallmembersList,
  familyList,
  createFamilyApi
} from "../../state/redux/userApi";
import { familyCreate } from "../../state/redux/authSlice";

// Custom TextField Component
const CustomTextField = ({ control, name, label, required = false }) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        fullWidth
        label={label}
        variant="outlined"
        size="small"
        error={!!error}
        helperText={error ? error.message : ""}
      />
    )}
  />
);

// Custom Radio Button Group
const RadioButtonGroup = ({ control, name, label, options }) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <FormControl component="fieldset" error={!!error} style={{ marginTop: "0px" }}>
        <FormLabel>{label}</FormLabel>
        <RadioGroup row value={field.value} onChange={field.onChange}>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio size="small" />}
              label={<Typography variant="body2">{option.label}</Typography>}
            />
          ))}
        </RadioGroup>
        {error && <FormHelperText>{error.message}</FormHelperText>}
      </FormControl>
    )}
  />
);

// Custom Select Field
const SelectField = ({ label, name, options, control, errors }) => (
  <FormControl fullWidth size="small" style={{marginTop:"0px"}} error={!!errors[name]}>
    <InputLabel>{label}</InputLabel>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select {...field} label={label}>
          {options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      )}
    />
    {errors[name] && <FormHelperText>{errors[name]?.message}</FormHelperText>}
  </FormControl>
);

const FamilyDetailPopup = ({ open, onClose, userDetails }) => {
  const { control, handleSubmit, setValue, watch, formState: { errors },reset, } = useForm({
    defaultValues: {
      isnewFamily: "no",isalreadymember: "no",familyId: "",familyname:"",memberId:"",firstname:"",lastname: "",
      phoneno: "",gender: "",address: "",dob: "",fathername: "",mothername: "",status: "",
      memberType: "", userType: "",identityproof: "",identityproofno: "",jobType: "",jobPortal: "",
      jobDetails: "",jobProfessional: "",maritalStatus:"",qualification: "",remark: "",parentLevel:[],levelNo:[],isSameParent:"no",ismarriedSamePlace:"no"
    }
  });
  const [memberDropdownDetails, setMemberDropdownDetails] = useState([]);
  const [membersData, setMembersData] = useState([]);
  const [familyFiter, setFamilyFiter] = useState({})
  const [familyDropdownFiter, setFamilyDropdownFiter]= useState([]);
  const [familyData, setFamilyData] = useState([]);
  const [parentLevel,SetParentLevel]= useState([]);
  const isAlreadyMember = watch("isalreadymember");
  const isnewFamily = watch("isnewFamily");
  const jobType = watch("jobType");
  const familyId = watch("familyId");
  const statusOptions = [{ value: "active", label: "Active" }, { value: "death", label: "Death" },{ value: "dismiss", label: "Dismiss" }, { value: "suspend", label: "Suspend" }, { value: "VRS", label: "VRS" }];
  const identityProofOptions = [{ value: "Driving License", label: "Driving License" }, { value: "PAN Card", label: "PAN Card" },{ value: "Aadhaar", label: "Aadhaar" }, { value: "Passport", label: "Passport" }, { value: "Voter Id", label: "Voter Id" }];
  const jobTypeOptions =  [{ value: "Govt", label: "Govt" }, { value: "Private", label: "Private" },{ value: "Self", label: "Self" }, { value: "Un Employee", label: "Un Employee" }];
  const jobPortalOptions =  [{ value: "Central Govt", label: "Central Govt" }, { value: "State Govt", label: "State Govt" }];
  const jobProfessionalOptions = [{ value: "Working", label: "Working" }, { value: "Retired", label: "Retired" }];

  useEffect(() => {
    setValue("memberId", "");
    setValue("familyId", "");
    setValue("firstname", "");
    setValue("lastname", "");
    setValue("phoneno", "");
    setValue("gender", "");
    setValue("address", "");
    setValue("dob", "");
    setValue("fathername", "");
    setValue("mothername", "");
    setValue("status", "");
    setValue("memberType", "");
    setValue("userType", "");
    setValue("identityproof", "");
    setValue("identityproofno", "");
    setValue("jobType", "");
    setValue("jobPortal", "");
    setValue("jobDetails", "");
    setValue("jobProfessional", "");
    setValue("maritalStatus","")
    setValue("qualification", "");
    setValue("remark", "");
    setValue("parentLevel",[]);
    setValue("levelNo",[])
  }, [isAlreadyMember, setValue]);

  useEffect(() => {
    if (open) {
      setValue("memberId", userDetails?.memberId || "");
      setValue("familyId", userDetails?.familyId || "");
      setValue("firstname", userDetails?.profile?.firstname || "");
      setValue("lastname", userDetails?.profile?.lastname || "");
      setValue("phoneno", userDetails?.profile?.phoneno || "");
      setValue("gender", userDetails?.profile?.gender || "");
      setValue("address", userDetails?.profile?.address || "");
      setValue("dob", userDetails?.profile?.dob || "");
      setValue("fathername", userDetails?.profile?.fathername || "");
      setValue("mothername", userDetails?.profile?.mothername || "");
      setValue("maritalStatus", userDetails?.profile?.maritalStatus || "");
      const parsedDate = new Date(userDetails?.profile?.dob);
      if (!isNaN(parsedDate)) {
        const formattedDate = parsedDate.toISOString().split("T")[0]; 
        setValue("dob", formattedDate);
      } else {
        console.error("Invalid date:", userDetails?.profile?.dob);
      }
      setValue("status", userDetails?.status || "");
      setValue("identityproof", userDetails?.otherdetails?.identityproof || "");
      setValue("identityproofno", userDetails?.otherdetails?.identityproofno || "");
      setValue("jobType", userDetails?.otherdetails?.jobType || "");
      setValue("jobPortal", userDetails?.otherdetails?.jobPortal || "");
      setValue("jobDetails", userDetails?.otherdetails?.jobDetails || "");
      setValue("jobProfessional", userDetails?.otherdetails?.jobProfessional || "");
      setValue("qualification", userDetails?.otherdetails?.qualification ||"");
      setValue("remark", userDetails?.remark ||"");
    }
  }, [open, userDetails, reset, setValue]);

  const onSubmit = async (data) => {
    console.log(data.parentLevel,'data.parentLevel')
    let payload = {
      isnewFamily: data.isnewFamily=== "yes" ? true : false,
      isalreadymember: data.isalreadymember=== "yes" ? true : false,
      memberId: data.memberId,
      familyId: data.familyId,
      familyname: data.familyname,
      parentLevel: data.parentLevel || "root",
      isSameParent: data.isSameParent=== "yes" ? true : false,
      ismarriedSamePlace: data.ismarriedSamePlace=== "yes" ? true : false,
      levelNo: data.levelNo,
      profile: {
        firstname: data.firstname,
        lastname: data.lastname,
        phoneno: data.phoneno,
        fathername: data.fathername,
        mothername: data.mothername,
        gender: data.gender,
        address: data.address,
        dob: data.dob,
        maritalStatus: data.maritalStatus,
      },
      status: data?.status,
      otherdetails: {
        identityproof: data?.identityproof,
        identityproofno: data?.identityproofno,
        qualification: data?.qualification,
        jobType: data?.jobType,
        jobPortal: data?.jobPortal,
        jobDetails: data?.jobDetails,
        jobProfessional: data?.jobProfessional,
      },
      remark: data?.remarks,
    };
    setAddPopupOpen(false);
    try {
      const response = await createFamilyApi(payload);
      if (response?.status) {
        dispatch(familyCreate(response.data));
        reset();
        onClose(); // Ensure parent modal closes
        fetchUserDetails();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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
        const uniqueFamilyDetails = [
          ...new Map(response.familydetails.map(user => [user.familyId, user])).values()
        ];
  
        const formattedMembers = uniqueFamilyDetails.map(user => ({
          label: `${user.familyname} (${user.familyId})`.trim(),
          value: user.familyId
        }));
  
        setFamilyDropdownFiter(formattedMembers);
        setFamilyData(response.familydetails);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };    
  
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={{
          position: "absolute", top: "50%", left: "50%", 
          transform: "translate(-50%, -50%)", width: "80%", bgcolor: "background.paper", 
          borderRadius: 2, boxShadow: 24, p: 3
        }}>
          <IconButton sx={{ position: "absolute", top: 8, right: 8 }} onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ mb: 2 }}>Add Family Member</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <RadioButtonGroup
                  control={control}
                  name="isnewFamily"
                  label="Is New Family"
                  options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <RadioButtonGroup
                  control={control}
                  name="isalreadymember"
                  label="Is Already Member"
                  options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]}
                />
              </Grid>
                {isAlreadyMember === "yes" && (
                  <Grid item xs={12} sm={3}>
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
                              setValue("firstname", selectedmember.profile.firstname || "");
                              setValue("lastname", selectedmember.profile.lastname || "");
                              setValue("phoneno", selectedmember.profile.phoneno || "");
                              setValue("gender", selectedmember.profile.gender || "");
                              setValue("address", selectedmember.profile.address || "");
                              setValue("dob", selectedmember.profile.dob || "");
                              setValue("fathername", selectedmember.profile.fathername || "");
                              setValue("mothername", selectedmember.profile.mothername || "");
                              setValue("maritalStatus", selectedmember.profile.maritalStatus || "");
                              const parsedDate = new Date(selectedmember.profile.dob);
                              if (!isNaN(parsedDate)) {
                                const formattedDate = parsedDate.toISOString().split("T")[0]; 
                                setValue("dob", formattedDate);
                              } else {
                                console.error("Invalid date:", selectedmember.profile.dob);
                              }
                              setValue("status", selectedmember.status || "");
                              setValue("identityproof", selectedmember.otherdetails?.identityproof || "");
                              setValue("identityproofno", selectedmember.otherdetails?.identityproofno || "");
                              setValue("jobType", selectedmember.otherdetails?.jobType || "");
                              setValue("jobPortal", selectedmember.otherdetails?.jobPortal || "");
                              setValue("jobDetails", selectedmember.otherdetails?.jobDetails || "");
                              setValue("jobProfessional", selectedmember.otherdetails?.jobProfessional || "");
                              setValue("qualification", selectedmember.otherdetails?.qualification ||"");
                              setValue("remark", selectedmember.remark ||"");
                            } else {
                              setValue("memberId", "");
                              setValue("firstname", "");
                              setValue("lastname", "");
                              setValue("phoneno", "");
                              setValue("gender", "");
                              setValue("address", "");
                              setValue("dob", "");
                              setValue("fathername", "");
                              setValue("mothername", "");
                              setValue("maritalStatus","")
                              setValue("status", "");
                              setValue("memberType", "");
                              setValue("userType", "");
                              setValue("identityproof", "");
                              setValue("identityproofno", "");
                              setValue("jobType", "");
                              setValue("jobPortal", "");
                              setValue("jobDetails", "");
                              setValue("jobProfessional", "");
                              setValue("qualification", "");
                              setValue("remark", "");
                            }
                          }}
                          isOptionEqualToValue={(option, value) => option.value === value}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Member Id"
                              variant="outlined"
                              size="small"
                              error={!!errors.memberId}
                              helperText={errors.memberId?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid> 
                )}

                {isnewFamily === "no" && (
                  <Grid item xs={12} sm={3}>
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
                              size="small"
                              error={!!errors.familyId}
                              helperText={errors.familyId?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                )}

                <Grid item xs={12} sm={3}>
                  <SelectField 
                    control={control} 
                    errors={errors} 
                    label="Parent Level" 
                    name="parentLevel" 
                    options={parentLevel} 
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <SelectField 
                    control={control} 
                    errors={errors} 
                    label="Level No" 
                    name="levelNo" 
                    options={[{ value: "1", label: "1" }, { value: "2", label: "2" },{ value: "3", label: "3" }, { value: "4", label: "4" }, { value: "5", label: "5" },{ value: "6", label: "6" }, { value: "7", label: "7" }, { value: "8", label: "8" },{ value: "9", label: "9" }, { value: "10", label: "10" }]} 
                  />
                </Grid>

              <Grid item xs={12} sm={3}>
                <CustomTextField control={control} name="firstname" label="First Name" required />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTextField control={control} name="lastname" label="Last Name" required />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTextField control={control} name="fathername" label="Father Name" required />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTextField control={control} name="mothername" label="Mother Name" required />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTextField control={control} name="phoneno" label="Phone No" required />
              </Grid>
              <Grid item xs={12} sm={3}>
                <RadioButtonGroup
                  control={control}
                  name="gender"
                  label="Gender"
                  options={[{ value: "male", label: "Male" }, { value: "female", label: "Female" }]}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="date"
                      label="Date of Birth"
                      fullWidth
                      inputProps={{ min: new Date() }}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <RadioButtonGroup
                  control={control}
                  name="maritalStatus"
                  label="MaritalStatus"
                  options={[{ value: "single", label: "Single" }, { value: "married", label: "Married" }, { value: "widowed", label: "widowed" }]}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTextField control={control} name="address" label="Address" required />
              </Grid>
              <Grid item xs={12} sm={3}>
                <SelectField 
                  control={control} 
                  errors={errors} 
                  label="Status" 
                  name="status" 
                  options={statusOptions} 
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <SelectField 
                  control={control} 
                  errors={errors} 
                  label="Identity Proof" 
                  name="identityproof" 
                  options={identityProofOptions} 
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTextField control={control} name="identityproofno" label="Identity proof no" required />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTextField control={control} name="qualification" label="Qualification" required />
              </Grid>
              <Grid item xs={12} sm={3}>
                <SelectField 
                  control={control} 
                  errors={errors} 
                  label="Job Type" 
                  name="jobType" 
                  options={jobTypeOptions} 
                />
              </Grid>
              {jobType === "Govt" && (
                <Grid item xs={12} sm={3}>
                  <SelectField
                    label="Job Portal"
                    name="jobPortal"
                    options={jobPortalOptions}
                    control={control}
                    errors={errors}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={3}>
                <CustomTextField control={control} name="jobDetails" label="Job Details" required />
              </Grid>
              <Grid item xs={12} sm={3}>
                <SelectField 
                  control={control} 
                  errors={errors} 
                  label="Job Professional" 
                  name="jobProfessional" 
                  options={jobProfessionalOptions} 
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTextField control={control} name="remark" label="Remark" required />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default FamilyDetailPopup;
