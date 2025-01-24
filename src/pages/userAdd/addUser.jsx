/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
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
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createUserApi } from "../../state/redux/userApi";
import { userCreate } from "../../state/redux/authSlice";
import { useEffect } from "react";

const AddNewModal = ({ open, onClose, cardsUserId, userById, isEditUsers }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    if (userById) {
      fetchUsersById();
    }
    console.log(userById, "userById");
  }, [cardsUserId]);

  console.log(cardsUserId, "cardsUserId");

  // Set values on form load
  useEffect(() => {
    if (isEditUsers && userById) {
      setValue("firstName", userById?.profile?.firstname);
      setValue("lastName", userById?.profile?.lastname);
      setValue("phoneNumber", userById?.profile?.phoneno);
      setValue("fatherName", userById?.profile?.fathername);
      setValue("motherName", userById?.profile?.mothername);
      setValue(
        "gender",
        userById?.profile?.gender === "male" ? "male" : "female"
      );
      setValue("avatar", userById?.profile?.avatar);
      setValue("address", userById?.profile?.address);
      setValue("dob", userById?.profile?.dob);

      setValue("balance", userById?.balance);
      setValue(
        "isAdministrator",
        userById?.isAdministrator === false ? "no" : "yes"
      );
      setValue("position", userById?.position);
      setValue("isChitCommitteeMember", userById?.isChitCommitteeMember);
      setValue("chitCommitteePosition", userById?.chitCommitteePosition);
      setValue("role", userById?.role);
      setValue("status", userById?.status);
      setValue("statusChangedDate", userById?.statusChangedDate);

      setValue(
        "memberType",
        userById?.memberdetails?.memberType === "b-class" ? "B-type" : "A-type"
      );
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
  }, [userById, setValue, isEditUsers]);

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
      const formattedDob = new Date(userById?.profile?.dob)
        .toISOString()
        .split("T")[0]; // Ensure the date is in YYYY-MM-DD format
      setValue("dob", formattedDob);
    }
    if (userById?.profile?.gender) {
      setValue("gender", userById?.profile?.gender);
    }
    if (userById?.statusChangedDate) {
      const formattedDate = new Date(userById?.statusChangedDate)
        .toISOString()
        .split("T")[0]; // Ensure the date is in YYYY-MM-DD format
      setValue("statusChangedDate", formattedDate);
    }
  }, [userById, setValue]);

  const fetchUsersById = async () => {
    if (cardsUserId) {
      const response = await getUserById(cardsUserId);
      console.log(response, "myresss");
      setUserById(response?.data);
    }
  };

  const getTenderTypes = async () => {
    try {
      const response = await userList();
      if (response) {
        console.log(response, "response");
      }
    } catch (error) {
      throw error;
    }
  };

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    // let payload = {
    //   isAdministrator: false,
    //   isChitCommitteeMember: false,
    //   profile: {
    //     firstname: data.firstName,
    //     lastname: data.lastName,
    //     phoneno: data.phoneNumber,
    //     fathername: data.fatherName,
    //     mothername: data.motherName,
    //     gender: data.gender,
    //     address: data.address,
    //     dob: data.dob,
    //   },
    //   memberdetails: {
    //     memberType: data?.memberType,
    //     joiningDate: data.joiningDate,
    //     rejoiningDate: data.rejoiningDate,
    //     userType: data?.type,
    //     userTypeChangedDate: data.userTypeChangedDate,
    //   },
    //   otherdetails: {
    //     identityProof: data.identityProof,
    //     identityProofNo: data.identityProofNo,
    //   },
    //   role: data.role,
    //   status: data.status,
    //   statusChangedDate: data.statusChangedDate,
    //   position: data.position,
    // };

    let payload = {
      profile: {
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
      isAdministrator: data?.isAdministrator,
      position: data?.position,
      isChitCommitteeMember: data?.isChitCommitteeMember,
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

    const response = await createUserApi(payload);
    console.log("Payload:", response);

    if (response.status === 201) {
      dispatch(userCreate(response.data));
    }
    reset(); // Reset form fields after submission
    onClose(); // Close the modal
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-new-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%", // Adjust width as needed

          height: "auto", // Let the height adjust based on content
          maxHeight: "90vh", // Optional: to limit the height and make it scrollable if content overflows
          bgcolor: "background.paper",
          borderRadius: 2, // Adds rounded corners
          boxShadow: 24,
          p: 3,
          overflowY: "auto", //
        }}
      >
        <Typography
          id="add-new-modal-title"
          variant="h6"
          component="h2"
          mb={3} // Increased margin-bottom to ensure heading doesn't overlap
        >
          Add / Edit User
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ flex: 1, overflow: "auto" }}
        >
          <Grid container spacing={3}>
            {/* Added spacing to ensure consistent gaps between fields */}
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="First Name"
                margin="normal"
                size="small"
                {...register("firstName", {
                  required: "First name is required",
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Last Name"
                margin="normal"
                size="small"
                {...register("lastName", { required: "Last name is required" })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
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
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl margin="dense" component="fieldset">
                <FormLabel style={{ fontSize: "0.9rem" }}>Gender</FormLabel>{" "}
                {/* Smaller font size */}
                <RadioGroup
                  row
                  {...register("gender", { required: true })}
                  style={{ gap: "10px" }} // Reduce spacing between radio buttons
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio size="small" />} // Smaller radio button
                    label={<Typography variant="body2">Male</Typography>} // Smaller label
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio size="small" />} // Smaller radio button
                    label={<Typography variant="body2">Female</Typography>} // Smaller label
                  />
                </RadioGroup>
                {errors.gender && (
                  <Typography variant="caption" color="error">
                    Please select a gender.
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControl margin="dense" component="fieldset">
                <FormLabel style={{ fontSize: "0.9rem" }}>
                  Marital Status
                </FormLabel>{" "}
                {/* Smaller font size */}
                <RadioGroup
                  row
                  {...register("maritalStatus", { required: true })}
                  style={{ gap: "10px" }} // Reduce spacing between radio buttons
                >
                  <FormControlLabel
                    value="single"
                    control={<Radio size="small" />} // Smaller radio button
                    label={<Typography variant="body2">Single</Typography>} // Smaller label
                  />
                  <FormControlLabel
                    value="married"
                    control={<Radio size="small" />} // Smaller radio button
                    label={<Typography variant="body2">Married</Typography>} // Smaller label
                  />
                  <FormControlLabel
                    value="widowed"
                    control={<Radio size="small" />} // Smaller radio button
                    label={<Typography variant="body2">Widowed</Typography>} // Smaller label
                  />
                </RadioGroup>
                {errors.maritalStatus && (
                  <Typography variant="caption" color="error">
                    Please select a marital status.
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
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
  <FormControl margin="dense" component="fieldset">
    <FormLabel style={{ fontSize: "0.9rem" }}>Is Administrator</FormLabel> {/* Smaller font size */}
    <RadioGroup
      row
      defaultValue="no"
      {...register("isAdministrator", { required: true })}
      style={{ gap: "10px" }} // Reduce spacing between radio buttons
    >
      <FormControlLabel
        value="yes"
        control={<Radio size="small" />} // Smaller radio button
        label={<Typography variant="body2">Yes</Typography>} // Smaller label
      />
      <FormControlLabel
        value="no"
        control={<Radio size="small" />} // Smaller radio button
        label={<Typography variant="body2">No</Typography>} // Smaller label
      />
    </RadioGroup>
    {errors.isAdministrator && (
      <Typography variant="caption" color="error">
        Please select an option.
      </Typography>
    )}
  </FormControl>
</Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Position"
                margin="normal"
                size="small"
                {...register("position", { required: "Position is required" })}
                error={!!errors.position}
                helperText={errors.position?.message}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
  <FormControl margin="dense" component="fieldset">
    <FormLabel style={{ fontSize: "0.9rem" }}>Is Chit Committee Member</FormLabel> {/* Smaller font size */}
    <RadioGroup
      row
      defaultValue="no" // Set default value (can be 'yes' or 'no')
      {...register("isChitCommitteeMember", {
        required: "Please select an option.",
      })}
      style={{ gap: "10px" }} // Reduce spacing between radio buttons
    >
      <FormControlLabel
        value="yes"
        control={<Radio size="small" />} // Smaller radio button
        label={<Typography variant="body2">Yes</Typography>} // Smaller label
      />
      <FormControlLabel
        value="no"
        control={<Radio size="small" />} // Smaller radio button
        label={<Typography variant="body2">No</Typography>} // Smaller label
      />
    </RadioGroup>
    {errors.isChitCommitteeMember && (
      <Typography variant="caption" color="error">
        {errors.isChitCommitteeMember.message}
      </Typography>
    )}
  </FormControl>
</Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Chit Committee Position"
                margin="normal"
                size="small"
                {...register("position")}
                error={!!errors.position}
                helperText={errors.position?.message}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
  <FormControl margin="dense" component="fieldset">
    <FormLabel style={{ fontSize: "0.9rem" }}>Member Type</FormLabel> {/* Smaller font size */}
    <RadioGroup
      row
      {...register("memberType", { required: true })}
      style={{ gap: "10px" }} // Reduce spacing between radio buttons
    >
      <FormControlLabel
        value="a-class"
        control={<Radio size="small" />} // Smaller radio button
        label={<Typography variant="body2">A-Class</Typography>} // Smaller label
      />
      <FormControlLabel
        value="b-class"
        control={<Radio size="small" />} // Smaller radio button
        label={<Typography variant="body2">B-Class</Typography>} // Smaller label
      />
      <FormControlLabel
        value="c-class"
        control={<Radio size="small" />} // Smaller radio button
        label={<Typography variant="body2">C-Class</Typography>} // Smaller label
      />
    </RadioGroup>
    {errors.memberType && (
      <Typography variant="caption" color="error">
        Please select a member type.
      </Typography>
    )}
  </FormControl>
</Grid>


<Grid item xs={12} sm={3}>
  <FormControl margin="dense" component="fieldset">
    <FormLabel style={{ fontSize: "0.9rem" }}>User Type</FormLabel> {/* Smaller font size */}
    <RadioGroup
      row
      {...register("userType", { required: true })}
      style={{ gap: "10px" }} // Reduce spacing between radio buttons
    >
      <FormControlLabel
        value="full"
        control={<Radio size="small" />} // Smaller radio button
        label={<Typography variant="body2">Full</Typography>} // Smaller label
      />
      <FormControlLabel
        value="half"
        control={<Radio size="small" />} // Smaller radio button
        label={<Typography variant="body2">Half</Typography>} // Smaller label
      />
    </RadioGroup>
    {errors.userType && (
      <Typography variant="caption" color="error">
        Please select a user type.
      </Typography>
    )}
  </FormControl>
</Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Joining Date"
                type="date"
                margin="normal"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("dob", { required: "Joining date is required" })}
                error={!!errors.dob}
                helperText={errors.dob?.message}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Status"
                margin="normal"
                size="small"
                {...register("status", { required: "Status is required" })}
                error={!!errors.status}
                helperText={errors.status?.message}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Identity Proof"
                margin="normal"
                size="small"
                {...register("identityProof")}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Identity Proof No"
                margin="normal"
                size="small"
                {...register("identityProofNo")}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Qualification"
                margin="normal"
                size="small"
                {...register("qualification")}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Job Type"
                margin="normal"
                size="small"
                {...register("jobType")}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Job Portal"
                margin="normal"
                size="small"
                {...register("jobPortal")}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Job Details"
                margin="normal"
                size="small"
                {...register("jobDetails")}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Job Professional"
                margin="normal"
                size="small"
                {...register("jobProfessional")}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Remarks"
                margin="normal"
                size="small"
                {...register("remarks")}
              />
            </Grid>
          </Grid>

          {/* Buttons */}
          <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={onClose} sx={{ marginRight: 1 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddNewModal;
