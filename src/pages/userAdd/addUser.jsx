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
import { userCreate } from "../../state/redux/authSlice";
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

  const addUser = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUsersById();
    console.log(userById, "userById");
  }, [cardsUserId]);

  console.log(cardsUserId, "cardsUserId")

  // Set values on form load
  useEffect(() => {
    if (isEditUsers && userById) {
      setValue("firstName", userById?.profile?.firstname);
      setValue("lastName", userById?.profile?.lastname);
      setValue("phoneNumber", userById?.profile?.phoneno);
      setValue("fatherName", userById?.profile?.fathername);
      setValue("motherName", userById?.profile?.mothername);
      setValue("gender", userById?.profile?.gender === "male" ? "male" : "female");
      setValue("avatar", userById?.profile?.avatar);
      setValue("address", userById?.profile?.address);
      setValue("dob", userById?.profile?.dob);

      setValue("balance", userById?.balance);
      setValue("isAdministrator", userById?.isAdministrator === false ? "no" : "yes");
      setValue("position", userById?.position);
      setValue("isChitCommitteeMember", userById?.isChitCommitteeMember);
      setValue("chitCommitteePosition", userById?.chitCommitteePosition);
      setValue("role", userById?.role);
      setValue("status", userById?.status);
      setValue("statusChangedDate", userById?.statusChangedDate);

      setValue("memberType", userById?.memberdetails?.memberType === "b-class" ? "B-type" : "A-type");
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
    if (userById?.memberdetails?.bClassToAClassChangeDate ) {
      const formattedDate = new Date(userById?.memberdetails?.bClassToAClassChangeDate)
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

        isChanthaRequired: true,
      },
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
    if (userById && isEditUsers) {
      const response = await editUserApi(payload);
      console.log("Payload:", response);
    } else {
      const response = await createUserApi(payload);
      console.log("Payload:", response);
    }
    if (response.status) {
      dispatch(userCreate(response.data));
      getTenderTypes();
    }
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-new-modal-title">
      <Box
        sx={{
          position: "fixed", // Position it as fixed to cover the entire viewport
          top: 0,
          left: 0,
          width: "100%", // Full width
          height: "100%", // Full height
          bgcolor: "background.paper",
          borderRadius: 0,
          boxShadow: 24,
          p: 3,
          overflow: "auto", // Enable scrolling for overflowing content
          display: "flex",
          flexDirection: "column", // Ensure form content is in a column layout
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
            {" "}
            {/* Added spacing to ensure consistent gaps between fields */}
            {/* Column 1 */}
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="First Name"
                margin="normal"
                {...register("firstName", {
                  required: "First name is required",
                })}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
              <TextField
                fullWidth
                label="Last Name"
                margin="normal"
                {...register("lastName", { required: "Last name is required" })}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
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
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
              <TextField
                fullWidth
                label="Father's Name"
                margin="normal"
                {...register("fatherName", {
                  required: "Father's name is required",
                })}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.fatherName}
                helperText={errors.fatherName?.message}
              />
              <TextField
                fullWidth
                label="Mother's Name"
                margin="normal"
                {...register("motherName", {
                  required: "Mother's name is required",
                })}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.motherName}
                helperText={errors.motherName?.message}
              />
              <TextField
                fullWidth
                label="Address"
                margin="normal"
                {...register("address", { required: "Address is required" })}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
              <TextField
                fullWidth
                label="Joining Date"
                type="date"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("dob", { required: "Joining date is required" })}
                error={!!errors.dob}
                helperText={errors.dob?.message}
              />
              {/* Gender */}
              <FormControl
                component="fieldset"
                margin="normal"
                error={!!errors.gender}
              >
                <FormLabel component="legend">Gender</FormLabel>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Please select a gender." }}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
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
                  )}
                />
                {errors.gender && (
                  <FormHelperText>{errors.gender.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {/* Column 2 */}
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Balance"
                margin="normal"
                {...register("balance", { required: "Balance is required" })}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.balance}
                helperText={errors.balance?.message}
              />
              <FormControl margin="normal" className="mb-0">
                <FormLabel>Is Administrator</FormLabel>
                <RadioGroup
                  row
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

              <TextField
                fullWidth
                label="Position"
                margin="normal"
                {...register("position", { required: "Position is required" })}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.position}
                helperText={errors.position?.message}
              />

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

              <TextField
                fullWidth
                label="Role"
                margin="normal"
                {...register("role", { required: "Role is required" })}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.role}
                helperText={errors.role?.message}
              />

              <TextField
                fullWidth
                label="Status"
                margin="normal"
                {...register("status", { required: "Status is required" })}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.status}
                helperText={errors.status?.message}
              />

              <TextField
                fullWidth
                label="Status Changed Date"
                type="date"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("statusChangedDate", {
                  required: "Status changed date is required",
                })}
                error={!!errors.statusChangedDate}
                helperText={errors.statusChangedDate?.message}
              />
              <FormControl margin="normal">
                <FormLabel>Member Type</FormLabel>
                <RadioGroup row {...register("memberType", { required: true })}>
                  <FormControlLabel
                    value="A-type"
                    control={<Radio />}
                    label="A-type"
                  />
                  <FormControlLabel
                    value="B-type"
                    control={<Radio />}
                    label="B-type"
                  />
                </RadioGroup>
                {errors.memberType && (
                  <Typography variant="caption" color="error">
                    Please select a member type.
                  </Typography>
                )}
              </FormControl>
            </Grid>
            {/* Column 3 */}
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="User Type"
                margin="normal"
                {...register("userType", { required: "User type is required" })}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.userType}
                helperText={errors.userType?.message}
              />

              <TextField
                fullWidth
                label="Joining Date"
                type="date"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("joiningDate", {
                  required: "Joining date is required",
                })}
                error={!!errors.joiningDate}
                helperText={errors.joiningDate?.message}
              />

              <TextField
                fullWidth
                label="Rejoining Date"
                type="date"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("rejoiningDate")}
              />

              <TextField
                fullWidth
                label="User Type Changed Date"
                type="date"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("userTypeChangedDate")}
              />

              <TextField
                fullWidth
                label="B Class to A Class Change Date"
                type="date"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("bClassToAClassChangeDate")}
              />

              <TextField
                fullWidth
                label="Identity Proof"
                margin="normal"
                {...register("identityProof", {
                  required: "Identity proof is required",
                })}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.identityProof}
                helperText={errors.identityProof?.message}
              />

              <TextField
                fullWidth
                label="Identity Proof No"
                margin="normal"
                {...register("identityProofNo", {
                  required: "Identity proof number is required",
                })}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.identityProofNo}
                helperText={errors.identityProofNo?.message}
              />
              <TextField
                fullWidth
                label="Qualification"
                margin="normal"
                {...register("qualification")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {/* Column 4 */}
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Job Type"
                margin="normal"
                {...register("jobType")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                label="Job Portal"
                margin="normal"
                {...register("jobPortal")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                label="Job Details"
                margin="normal"
                {...register("jobDetails")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                label="Job Professional"
                margin="normal"
                {...register("jobProfessional")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                label="Remarks"
                margin="normal"
                {...register("remarks")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>

          {/* Buttons */}
          <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={onClose} sx={{ marginRight: 1 }}>
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
