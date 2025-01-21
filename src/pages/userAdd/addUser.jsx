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

const AddNewModal = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();

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
      remark:   data?.remarks,
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
                {...register("firstName", { required: "First name is required", })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
              <TextField
                fullWidth
                label="Last Name"
                margin="normal"
                {...register("lastName", { required: "Last name is required" })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
              <TextField
                fullWidth
                label="Phone Number"
                margin="normal"
                {...register("phoneNumber", {  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit phone number",   },  })}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
              <TextField
                fullWidth
                label="Father's Name"
                margin="normal"
                {...register("fatherName", {  required: "Father's name is required", })}
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
                error={!!errors.motherName}
                helperText={errors.motherName?.message}
              />
              <TextField
                fullWidth
                label="Address"
                margin="normal"
                {...register("address", { required: "Address is required" })}
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
                  <Typography variant="caption" color="error">
                    Please select a gender.
                  </Typography>
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
                error={!!errors.position}
                helperText={errors.position?.message}
              />

<FormControl margin="normal" className="mb-0">
  <FormLabel>Is Chit Committee Member</FormLabel>
  <RadioGroup
    row
    defaultValue="no" // Set default value (can be 'yes' or 'no')
    {...register("isChitCommitteeMember", { required: "Please select an option." })}
  >
    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
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
                error={!!errors.role}
                helperText={errors.role?.message}
              />

              <TextField
                fullWidth
                label="Status"
                margin="normal"
                {...register("status", { required: "Status is required" })}
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
                error={!!errors.identityProofNo}
                helperText={errors.identityProofNo?.message}
              />
              <TextField
                fullWidth
                label="Qualification"
                margin="normal"
                {...register("qualification")}
              />
            </Grid>
            {/* Column 4 */}
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Job Type"
                margin="normal"
                {...register("jobType")}
              />
              <TextField
                fullWidth
                label="Job Portal"
                margin="normal"
                {...register("jobPortal")}
              />
              <TextField
                fullWidth
                label="Job Details"
                margin="normal"
                {...register("jobDetails")}
              />
              <TextField
                fullWidth
                label="Job Professional"
                margin="normal"
                {...register("jobProfessional")}
              />
              <TextField
                fullWidth
                label="Remarks"
                margin="normal"
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
