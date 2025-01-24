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

const AddNewModal = ({ open, onClose, cardsUserId, isEditUsers }) => {
  const [userById, setUserById] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm();

  const { addUser, editUser } = useSelector((state) => state.auth);
  console.log(editUser, "editUser");

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUsersById();
  }, [cardsUserId]);

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
    const response = await getUserById(cardsUserId);
    console.log(response, "myresss");
    setUserById(response?.data);
  };

  const fetchUserList = async () => {
    try {
      const response = await userList(1, 8, {
        status: "active",
        "memberdetails.memberType": "a-class",
        "memberdetails.userType": "full",
      });
      if (response.status) {
        dispatch(userListData(response.userDetails));
      }
    } catch (error) {
      console.log("Failed to fetch user data");
    } finally {
    }
  };

  const onCloseReset = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
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
        console.log(response, "responseresponse");
        fetchUserList();
        onClose();
      }
    } else {
      const response = await createUserApi(payload);
      console.log("Payload:", response);
      if (response.status) {
        dispatch(userCreate(response.data));
        fetchUserList();
        onClose();
      }
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-new-modal-title">
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "background.paper",
          borderRadius: 0,
          boxShadow: 24,
          p: 3,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography id="add-new-modal-title" variant="h6" component="h2" mb={3}>
          Add / Edit User
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ flex: 1, overflow: "auto" }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="First Name"
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
                label="Last Name"
                margin="normal"
                {...register("lastName", { required: "Last name is required" })}
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Father's Name"
                margin="normal"
                slotProps={{ inputLabel: { shrink: true } }}
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
              <FormControl margin="normal">
                <FormLabel>Gender</FormLabel>
                <RadioGroup row {...register("gender", { required: true })}>
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
                {errors.gender && (
                  <FormHelperText>{errors.gender.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl margin="normal">
                <FormLabel>Marital Status</FormLabel>
                <RadioGroup
                  row
                  {...register("maritalStatus", { required: true })}
                >
                  <FormControlLabel
                    value="sinle"
                    control={<Radio />}
                    label="Single"
                  />
                  <FormControlLabel
                    value="married"
                    control={<Radio />}
                    label="Married"
                  />
                  <FormControlLabel
                    value="widowed"
                    control={<Radio />}
                    label="Widowed"
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
                {...register("address", { required: "Address is required" })}
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl margin="normal" className="mb-0">
                <FormLabel>Is Administrator</FormLabel>
                <RadioGroup
                  row
                  defaultValue="no"
                  {...register("isAdministrator", { required: true })}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
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
                {...register("position", { required: "Position is required" })}
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors.position}
                helperText={errors.position?.message}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl margin="normal" className="mb-0">
                <FormLabel>Is Chit Committee Member</FormLabel>
                <RadioGroup
                  row
                  defaultValue="no"
                  {...register("isChitCommitteeMember", {
                    required: "Please select an option.",
                  })}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
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
                {...register("position")}
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors.position}
                helperText={errors.position?.message}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControl margin="normal">
                <FormLabel>Member Type</FormLabel>
                <RadioGroup row {...register("memberType", { required: true })}>
                  <FormControlLabel
                    value="a-class"
                    control={<Radio />}
                    label="A-Class"
                  />
                  <FormControlLabel
                    value="b-class"
                    control={<Radio />}
                    label="B-Class"
                  />
                  <FormControlLabel
                    value="c-class"
                    control={<Radio />}
                    label="C-Class"
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
              <FormControl margin="normal">
                <FormLabel>User Type</FormLabel>
                <RadioGroup row {...register("userType", { required: true })}>
                  <FormControlLabel
                    value="full"
                    control={<Radio />}
                    label="Full"
                  />
                  <FormControlLabel
                    value="Half"
                    control={<Radio />}
                    label="half"
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
                slotProps={{ inputLabel: { shrink: true } }}
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
                {...register("status", { required: "Status is required" })}
                error={!!errors.status}
                helperText={errors.status?.message}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Identity Proof"
                margin="normal"
                {...register("identityProof")}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Identity Proof No"
                margin="normal"
                {...register("identityProofNo")}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Qualification"
                margin="normal"
                {...register("qualification")}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Job Type"
                margin="normal"
                {...register("jobType")}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Job Portal"
                margin="normal"
                {...register("jobPortal")}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Job Details"
                margin="normal"
                {...register("jobDetails")}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Job Professional"
                margin="normal"
                {...register("jobProfessional")}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Remarks"
                margin="normal"
                {...register("remarks")}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
          </Grid>

          <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => onCloseReset()} sx={{ marginRight: 1 }}>
              Cancel
            </Button>
            {cardsUserId ? (
              <Button type="submit" variant="contained">
                Update
              </Button>
            ) : (
              <Button type="submit" variant="contained">
                Add
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddNewModal;
