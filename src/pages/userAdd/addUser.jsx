/* eslint-disable react/prop-types */
import { useForm, Controller } from "react-hook-form";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  Grid,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserApi,
  editUserApi,
  getUserById,
  userList,
} from "../../state/redux/userApi";
import { userCreate, userListData } from "../../state/redux/authSlice";
import { useEffect, useState } from "react";
import { use } from "react";
import FamilyDetailsTables from "../../components/tableView/familydetailsTable";
import CloseIcon from "@mui/icons-material/Close";

const AddNewModal = ({ open, onClose, cardsUserId, isEditUsers }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
    watch,
  } = useForm({});

  const [userById, setUserById] = useState([]);
  const [familydetail, setFamilydetails] = useState([]);

  const { addUser, editUser } = useSelector((state) => state.auth);
  console.log(editUser, "editUser");

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isEditUsers,'isEditUsers')
    if (cardsUserId && isEditUsers) {
      fetchUsersById();
    } else {
      reset(); // Reset the form for adding a new user
    }
  }, [cardsUserId, isEditUsers, reset]);

  const positionOptions = [
    "தலைவர்",
    "துணைத்தலைவர்",
    "பொருளாளர்",
    "கணக்கர்",
    "செயலாளர்",
    "இணை செயலாளர் (நிர்வாகம்)",
    "இணை செயலாளர் (குழுக்கள்)"
  ];

  const chitCommitteePositionOptions = ["இணை செயலாளர்", "நிதி குழு உறுப்பினர் I", "நிதி குழு உறுப்பினர் II","நிதி குழு உறுப்பினர் III"];
  const titleOptions = ["திரு", "திருமதி", "செல்வி", "செல்வன்"]
  const statusOptions = [{ label: "Driving License", value: "Driving License" },
    { label: "Active", value: "active" },
    { label: "Death", value: "death" },
    { label: "Suspend", value: "suspend" },
    { label: "VRS", value: "VRS" }];
  const identityProofOptions = [
    { label: "Driving License", value: "Driving License" },
    { label: "PAN Card", value: "PAN Card" },
    { label: "Aadhaar", value: "Aadhaar" },
    { label: "Passport", value: "Passport" }
  ];
  const jobTypeOptions = [
    { label: "Govt", value: "Govt" },
    { label: "Private", value: "Private" },
    { label: "Self", value: "Self" },
    { label: "Un Employee", value: "Un Employee" },
    { label: "Student", value: "Student" },
  ];
  const jobPortalOptions = ["Central Govt", "State Govt"];
  const jobProfessionalOptions = ["Working", "Retired"];

  // Set values on form load
  useEffect(() => {
    if ((isEditUsers && userById) || cardsUserId) {
      setValue("firstName", userById?.profile?.firstname);
      setValue("lastName", userById?.profile?.lastname);
      setValue("phoneNumber", userById?.profile?.phoneno);
      setValue("fatherName", userById?.profile?.fathername);
      setValue("motherName", userById?.profile?.mothername);

      setValue("avatar", userById?.profile?.avatar);
      setValue("address", userById?.profile?.address);
      setValue("dob", userById?.profile?.dob);

      setValue("balance", userById?.balance);
      setValue(
        "isAdministrator",
        userById?.isAdministrator === false ? "no" : "yes"
      );
      setValue("position", userById?.position);
      setValue("isChitCommitteeMember", userById?.isChitCommitteeMember === false ? "no" : "yes");
      setValue("chitCommitteePosition", userById?.chitCommitteePosition);
      setValue("title",userById?.title)
      setValue("role", userById?.role);
      setValue("status", userById?.status);
      setValue("statusChangedDate", userById?.statusChangedDate);

      // setValue(
      //   "memberType",
      //   userById?.memberdetails?.memberType === "b-class" ? "B-type" : "A-type"
      // );
      setValue("userType", userById?.memberdetails?.userType);
      setValue("joiningDate", userById?.memberdetails?.joiningDate);
      setValue("rejoiningDate", userById?.memberdetails?.rejoiningDate);
      setValue(
        "userTypeChangedDate",
        userById?.memberdetails?.userTypeChangedDate
      );
      setValue(
        "bClassToAClassChangeDate",
        userById?.memberdetails?.bClassToAClassChangeDate
      );

      setValue("identityProof", userById?.otherdetails?.identityproof);
      setValue("identityProofNo", userById?.otherdetails?.identityproofno);
      setValue("qualification", userById?.otherdetails?.qualification);
      setValue("jobType", userById?.otherdetails?.jobType);
      setValue("jobPortal", userById?.otherdetails?.jobPortal);
      setValue("jobDetails", userById?.otherdetails?.jobDetails);
      setValue("jobProfessional", userById?.otherdetails?.jobProfessional);

      setValue("remarks", userById?.remark);
    }

    console.log("userById", userById);
  }, [userById, setValue, isEditUsers, cardsUserId]);

  useEffect(() => {
    if (userById?.memberdetails?.joiningDate) {
      const formattedDate = new Date(userById?.memberdetails?.joiningDate)
        .toISOString()
        .split("T")[0]; // Ensure the date is in YYYY-MM-DD format
      setValue("joiningDate", formattedDate);
    }
    if (userById?.memberdetails?.rejoiningDate) {
      const formattedDate = new Date(userById?.memberdetails?.rejoiningDate)
        .toISOString()
        .split("T")[0]; // Ensure the date is in YYYY-MM-DD format
      setValue("rejoiningDate", formattedDate);
    }
    if (userById?.memberdetails?.userTypeChangedDate !== "Invalid date") {
      const rawDate = userById?.memberdetails?.userTypeChangedDate;

      if (rawDate) {
        const parsedDate = new Date(rawDate);
        if (!isNaN(parsedDate)) {
          const formattedDate = parsedDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD
          setValue("userTypeChangedDate", formattedDate);
        } else {
          console.error("Invalid date value:", rawDate);
        }
      } else {
        console.warn("userTypeChangedDate is undefined or null.");
      }
    }
    if (userById?.memberdetails?.bClassToAClassChangeDate) {
      const formattedDate = new Date(
        userById?.memberdetails?.bClassToAClassChangeDate
      )
        .toISOString()
        .split("T")[0]; // Ensure the date is in YYYY-MM-DD format
      setValue("bClassToAClassChangeDate", formattedDate);
    }
    if (userById?.profile?.dob) {
      const dob = new Date(userById?.profile?.dob);
      if (!isNaN(dob.getTime())) {
        // Check if the date is valid
        const formattedDob = dob.toISOString().split("T")[0]; // Ensure the date is in YYYY-MM-DD format
        setValue("dob", formattedDob);
      } else {
        console.error("Invalid date value:", userById?.profile?.dob);
      }
    }

    if (userById?.statusChangedDate) {
      const formattedDate = new Date(userById?.statusChangedDate)
        .toISOString()
        .split("T")[0]; // Ensure the date is in YYYY-MM-DD format
      setValue("statusChangedDate", formattedDate);
    }
  }, [userById, setValue]);

  useEffect(() => {
    if (isEditUsers === false) {
      reset();
    }
  }, []);
  console.log(isEditUsers, "isEditUsers");
  const fetchUsersById = async () => {
    const response = await getUserById(cardsUserId);
    console.log(response, "myresss");
    setUserById(response?.data?.user);
    setFamilydetails(response?.data?.familymembersdetails);
  };

  const cancelUserForm = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    let payload = {
      profile: {
        title:data.title,
        firstname: data.firstName,
        lastname: data.lastName,
        phoneno: data.phoneNumber,
        fathername: data.fatherName,
        mothername: data.motherName,
        gender: data.gender,
        avatar: "avatar_url_here",
        address: data.address,
        dob: data.dob,
        maritalStatus: data.maritalStatus,
      },
      isChanthaRequired: true,
      balance: data?.balance,
      isAdministrator: data?.isAdministrator === "yes" ? true : false,
      position: data?.position,
      isChitCommitteeMember:
        data?.isChitCommitteeMember === "yes" ? true : false,
      chitCommitteePosition: data?.chitCommitteePosition,
      role: data?.role,
      status: data?.status,
      statusChangedDate: data?.statusChangedDate,
      memberdetails: {
        memberType: data?.memberType,
        userType: data?.userType,
        joiningDate: data?.joiningDate,
        rejoiningDate: data?.rejoiningDate,
        userTypeChangedDate: data?.userTypeChangedDate,
        bClassToAClassChangeDate: data?.bClassToAClassChangeDate,
      },
      otherdetails: {
        identityproof: data?.identityProof,
        identityproofno: data?.identityProofNo,
        qualification: data?.qualification,
        jobType: data?.jobType,
        jobPortal: data?.jobPortal,
        jobDetails: data?.jobDetails,
        jobProfessional: data?.jobProfessional,
      },
      remark: data?.remarks,
    };
    if (userById && isEditUsers) {
      const response = await editUserApi(cardsUserId, payload);
      console.log("Payload:", response);
      if (response?.status) {
        fetchUserList(1);
        onClose();
        reset();
      }
    } else {
      const response = await createUserApi(payload);
      console.log("Payload:", response);

      if (response?.status) {
        dispatch(userCreate(response.data));
        fetchUserList(1);
        onClose();
        reset();
      }
    }
  };

  const ITEMS_PER_PAGE = 12;

  const fetchUserList = async () => {
    try {
      const response = await userList({
        page: 1,
        limit: 12,
      });
    } catch (error) {
      setError("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  console.log(isEditUsers, "isEditUsers");

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-new-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          height: "auto",
          maxHeight: "90vh",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          overflowY: "auto",
        }}
      >
        <Typography id="add-new-modal-title" variant="h6" component="h2" mb={3}>
          Add / Edit User
        </Typography>
        <IconButton
          onClick={cancelUserForm} // Define a function to close the modal or form
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ flex: 1, overflow: "auto" }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
              <FormControl
                fullWidth
                margin="normal"
                size="small"
                error={!!errors.title}
              >
                <InputLabel>Title</InputLabel>
                <Controller
                  name="title"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select {...field} label="title">
                      {titleOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.title && (
                  <FormHelperText>
                    {errors.title?.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={1}>
              <TextField
                fullWidth
                label="Last Name"
                margin="normal"
                size="small"
                {...register("lastName", { required: "Last name is required" })}
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="First Name"
                size="small"
                margin="normal"
                {...register("firstName", {
                  required: "First name is required",
                })}
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Father's Name"
                margin="normal"
                size="small"
                {...register("fatherName", {
                  required: "Father's name is required",
                })}
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors.fatherName}
                helperText={errors.fatherName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Mother's Name"
                margin="normal"
                size="small"
                {...register("motherName", {
                  required: "Mother's name is required",
                })}
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors.motherName}
                helperText={errors.motherName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Phone Number"
                margin="normal"
                size="small"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit phone number",
                  },
                })}
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl margin="dense" component="fieldset">
                <FormLabel style={{ fontSize: "0.9rem" }}>Gender</FormLabel>{" "}
                <RadioGroup
                  row
                  {...register("gender", { required: true })}
                  style={{ gap: "2px" }}
                  value={userById?.profile?.gender || "male"}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio size="small" />}
                    label={<Typography variant="body2">Male</Typography>}
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio size="small" />}
                    label={<Typography variant="body2">Female</Typography>}
                  />
                </RadioGroup>
                {errors.gender && (
                  <FormHelperText>{errors.gender.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControl margin="dense" component="fieldset">
                <FormLabel style={{ fontSize: "0.9rem" }}>
                  Marital Status
                </FormLabel>
                <Controller
                  name="maritalStatus"
                  control={control}
                  defaultValue={
                    userById && userById?.profile?.maritalStatus
                      ? userById?.profile?.maritalStatus
                      : "single"
                  }
                  rules={{ required: "Please select a marital status." }}
                  render={({ field }) => (
                    <RadioGroup row {...field} style={{ gap: "2px" }}>
                      <FormControlLabel
                        value="single"
                        control={<Radio size="small" />}
                        label={<Typography variant="body2">Single</Typography>}
                      />
                      <FormControlLabel
                        value="married"
                        control={<Radio size="small" />}
                        label={<Typography variant="body2">Married</Typography>}
                      />
                      <FormControlLabel
                        value="widowed"
                        control={<Radio size="small" />}
                        label={<Typography variant="body2">Widowed</Typography>}
                      />
                    </RadioGroup>
                  )}
                />
                {errors.maritalStatus && (
                  <Typography variant="caption" color="error">
                    {errors.maritalStatus.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Address"
                margin="normal"
                size="small"
                {...register("address", { required: "Address is required" })}
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl margin="dense" component="fieldset">
                <FormLabel style={{ fontSize: "0.9rem" }}>
                  Is Administrator
                </FormLabel>{" "}
                <Controller
                  name="isAdministrator"
                  control={control}
                  defaultValue="no"
                  rules={{ required: "Please select an option." }}
                  render={({ field }) => (
                    <RadioGroup row {...field} style={{ gap: "2px" }}>
                      <FormControlLabel
                        value="yes"
                        control={<Radio size="small" />}
                        label={<Typography variant="body2">Yes</Typography>}
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio size="small" />}
                        label={<Typography variant="body2">No</Typography>}
                      />
                    </RadioGroup>
                  )}
                />
                {errors.isAdministrator && (
                  <Typography variant="caption" color="error">
                    {errors.isAdministrator.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            {watch("isAdministrator") === "yes" && (
              <Grid item xs={12} sm={3}>
                <FormControl
                  fullWidth
                  margin="normal"
                  size="small"
                  error={!!errors.position}
                >
                  <InputLabel>Position</InputLabel>
                  <Controller
                    name="position"
                    control={control}
                    rules={{ required: "Position is required" }}
                    defaultValue=""
                    render={({ field }) => (
                      <Select {...field} label="Position">
                        {positionOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.position && (
                    <FormHelperText>{errors.position?.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} sm={3}>
              <FormControl margin="dense" component="fieldset">
                <FormLabel style={{ fontSize: "0.9rem" }}>
                  Is Chit Committee Member
                </FormLabel>{" "}
                <Controller
                  name="isChitCommitteeMember"
                  control={control}
                  defaultValue="no"
                  rules={{ required: "Please select an option." }}
                  render={({ field }) => (
                    <RadioGroup row {...field} style={{ gap: "2px" }}>
                      <FormControlLabel
                        value="yes"
                        control={<Radio size="small" />}
                        label={<Typography variant="body2">Yes</Typography>}
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio size="small" />}
                        label={<Typography variant="body2">No</Typography>}
                      />
                    </RadioGroup>
                  )}
                />
                {errors.isChitCommitteeMember && (
                  <Typography variant="caption" color="error">
                    {errors.isChitCommitteeMember.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {watch("isChitCommitteeMember") === "yes" && (
              <Grid item xs={12} sm={3}>
                <FormControl
                  fullWidth
                  margin="normal"
                  size="small"
                  error={!!errors.chitCommitteePosition}
                >
                  <InputLabel>Chit Committee Position</InputLabel>
                  <Controller
                    name="chitCommitteePosition"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select {...field} label="Chit Committee Position">
                        {chitCommitteePositionOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.chitCommitteePosition && (
                    <FormHelperText>
                      {errors.chitCommitteePosition?.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            )}

            <Grid item xs={12} sm={3}>
              <FormControl margin="dense" component="fieldset">
                <FormLabel style={{ fontSize: "0.9rem" }}>
                  Member Type
                </FormLabel>
                <Controller
                  name="memberType"
                  control={control}
                  defaultValue={
                    userById?.memberdetails?.memberType
                      ? userById?.memberdetails?.memberType
                      : "a-class"
                  }
                  rules={{ required: "Please select a member type." }}
                  render={({ field }) => (
                    <RadioGroup row {...field} style={{ gap: "2px" }}>
                      <FormControlLabel
                        value="a-class"
                        control={<Radio size="small" />}
                        label={<Typography variant="body2">A-Class</Typography>}
                      />
                      <FormControlLabel
                        value="b-class"
                        control={<Radio size="small" />}
                        label={<Typography variant="body2">B-Class</Typography>}
                      />
                      <FormControlLabel
                        value="c-class"
                        control={<Radio size="small" />}
                        label={<Typography variant="body2">C-Class</Typography>}
                      />
                    </RadioGroup>
                  )}
                />
                {errors.memberType && (
                  <Typography variant="caption" color="error">
                    {errors.memberType.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControl margin="dense" component="fieldset">
                <FormLabel style={{ fontSize: "0.9rem" }}>User Type</FormLabel>
                <Controller
                  name="userType"
                  control={control}
                  defaultValue={
                    userById?.memberdetails?.userType
                      ? userById?.memberdetails?.userType
                      : "full"
                  }
                  rules={{ required: "Please select a user type." }}
                  render={({ field }) => (
                    <RadioGroup row {...field} style={{ gap: "2px" }}>
                      <FormControlLabel
                        value="full"
                        control={<Radio size="small" />}
                        label={<Typography variant="body2">Full</Typography>}
                      />
                      <FormControlLabel
                        value="half"
                        control={<Radio size="small" />}
                        label={<Typography variant="body2">Half</Typography>}
                      />
                    </RadioGroup>
                  )}
                />
                {errors.userType && (
                  <Typography variant="caption" color="error">
                    {errors.userType.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                margin="normal"
                size="small"
                slotProps={{ inputLabel: { shrink: true } }}
                {...register("dob", { required: "Date of Birth is required" })}
                error={!!errors.dob}
                helperText={errors.dob?.message}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl
                fullWidth
                margin="normal"
                size="small"
                error={!!errors.status}
              >
                <InputLabel>Status</InputLabel>
                <Controller
                  name="status"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select {...field} label="Status">
                      {statusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.status && (
                  <FormHelperText>{errors.status?.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl
                fullWidth
                margin="normal"
                size="small"
                error={!!errors.identityProof}
              >
                <InputLabel>Identity Proof</InputLabel>
                <Controller
                  name="identityProof"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select {...field} label="Identity Proof">
                      {identityProofOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.identityProof && (
                  <FormHelperText>
                    {errors.identityProof?.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Identity Proof No"
                margin="normal"
                size="small"
                {...register("identityProofNo")}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Qualification"
                margin="normal"
                size="small"
                {...register("qualification")}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl
                fullWidth
                margin="normal"
                size="small"
                error={!!errors.jobType}
              >
                <InputLabel>Job Type</InputLabel>
                <Controller
                  name="jobType"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select {...field} label="Job Type">
                      {jobTypeOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.jobType && (
                  <FormHelperText>{errors.jobType?.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {watch("jobType") === "Govt" && (
              <Grid item xs={12} sm={3}>
                <FormControl
                  fullWidth
                  margin="normal"
                  size="small"
                  error={!!errors.jobPortal}
                >
                  <InputLabel>Job Portal</InputLabel>
                  <Controller
                    name="jobPortal"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select {...field} label="Job Portal">
                        {jobPortalOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.jobPortal && (
                    <FormHelperText>{errors.jobPortal?.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            )}
            {watch("jobType") != "Un Employee" && watch("jobType") != "Student" && (
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Job Details"
                  margin="normal"
                  size="small"
                  {...register("jobDetails")}
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
            )}
            {watch("jobType") === "Govt" && (
              <Grid item xs={12} sm={3}>
                <FormControl
                  fullWidth
                  margin="normal"
                  size="small"
                  error={!!errors.jobProfessional}
                >
                  <InputLabel>Job Professional</InputLabel>
                  <Controller
                    name="jobProfessional"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select {...field} label="Job Professional">
                        {jobProfessionalOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.jobProfessional && (
                    <FormHelperText>
                      {errors.jobProfessional?.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Remarks"
                margin="normal"
                size="small"
                {...register("remarks")}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12}>
              <Typography id="add-new-modal-title" component="h6">
                Family Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FamilyDetailsTables data={familydetail} search={false} />
            </Grid> */}
          </Grid>

          {/* Buttons */}
          <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => cancelUserForm()}
              sx={{ marginRight: 1 }}
              style={{ color: "#4C79F8", borderColor: "#4C79F8" }}
            >
              Cancel
            </Button>

            <Button
              style={{ backgroundColor: "#4C79F8" }}
              variant="contained"
              color="primary"
              type="submit"
            >
              {isEditUsers ? "Update" : "Add"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddNewModal;
