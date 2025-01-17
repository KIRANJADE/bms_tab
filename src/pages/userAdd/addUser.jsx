import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
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
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { createUserApi } from "../../state/redux/userApi";
import { useDispatch } from "react-redux";
import { userCreate } from "../../state/redux/authSlice";

const AddUserForm = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch()
  
  const onSubmit = async (data) => {
    try {
      // Prepare payload
      const payload = {
        isAdministrator: false,
        isChitCommitteeMember: false,
        profile: data.profile,
        memberdetails: data.memberdetails,
        otherdetails: {},
        role: "member",
        status: "active",
        position: "member",
      };

      // Call API
      const response = await createUserApi(payload);
      console.log("User created successfully:", response.data);
      if(response.data.status){
        dispatch(userCreate())
      }
      // Reset form and close modal
      reset();
      onClose();
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error.message);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-user-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          overflow: "auto",
        }}
      >
        <Typography id="add-user-modal-title" variant="h6" component="h2" mb={2}>
          Add New User
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" mb={1}>
            Profile
          </Typography>
          <TextField
            fullWidth
            label="First Name"
            margin="normal"
            {...register("profile.firstname", { required: "First name is required" })}
            error={!!errors.profile?.firstname}
            helperText={errors.profile?.firstname?.message}
          />
          <TextField
            fullWidth
            label="Last Name"
            margin="normal"
            {...register("profile.lastname", { required: "Last name is required" })}
            error={!!errors.profile?.lastname}
            helperText={errors.profile?.lastname?.message}
          />
          <TextField
            fullWidth
            label="Phone Number"
            margin="normal"
            {...register("profile.phoneno", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit phone number",
              },
            })}
            error={!!errors.profile?.phoneno}
            helperText={errors.profile?.phoneno?.message}
          />
          <TextField
            fullWidth
            label="Father's Name"
            margin="normal"
            {...register("profile.fathername", { required: "Father's name is required" })}
            error={!!errors.profile?.fathername}
            helperText={errors.profile?.fathername?.message}
          />
          <FormControl margin="normal" fullWidth>
            <FormLabel>Gender</FormLabel>
            <RadioGroup row {...register("profile.gender", { required: true })}>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
            {errors.profile?.gender && (
              <Typography variant="caption" color="error">
                Gender is required.
              </Typography>
            )}
          </FormControl>

          <Typography variant="h6" mt={3} mb={1}>
            Member Details
          </Typography>
          <FormControl margin="normal" fullWidth>
            <InputLabel>Member Type</InputLabel>
            <Select
              defaultValue=""
              {...register("memberdetails.memberType", { required: "Member type is required" })}
              error={!!errors.memberdetails?.memberType}
            >
              <MenuItem value="a-class">A-class</MenuItem>
              <MenuItem value="b-class">B-class</MenuItem>
            </Select>
            {errors.memberdetails?.memberType && (
              <Typography variant="caption" color="error">
                {errors.memberdetails.memberType.message}
              </Typography>
            )}
          </FormControl>
          <TextField
            fullWidth
            label="Joining Date"
            type="date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            {...register("memberdetails.joiningDate", {
              required: "Joining date is required",
            })}
            error={!!errors.memberdetails?.joiningDate}
            helperText={errors.memberdetails?.joiningDate?.message}
          />
          <FormControl margin="normal" fullWidth>
            <FormLabel>User Type</FormLabel>
            <RadioGroup row {...register("memberdetails.userType", { required: true })}>
              <FormControlLabel value="full" control={<Radio />} label="Full" />
              <FormControlLabel value="half" control={<Radio />} label="Half" />
            </RadioGroup>
            {errors.memberdetails?.userType && (
              <Typography variant="caption" color="error">
                User type is required.
              </Typography>
            )}
          </FormControl>

          <Typography variant="h6" mt={3} mb={1}>
            Role and Status
          </Typography>
          <TextField
            fullWidth
            label="Role"
            margin="normal"
            defaultValue="member"
            disabled
          />
          <TextField
            fullWidth
            label="Status"
            margin="normal"
            defaultValue="active"
            disabled
          />
          <TextField
            fullWidth
            label="Position"
            margin="normal"
            defaultValue="member"
            disabled
          />

          <Box mt={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={onClose} sx={{ marginRight: 1 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Add User
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddUserForm;
