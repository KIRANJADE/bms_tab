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

  const dispatch = useDispatch()

  const onSubmit = async(data) => {
    console.log("Form Data:", data);
    try {
      const response = await createUserApi(data);
      if(response.data.status){
        dispatch(userCreate(response.data))
      }
    } catch (error) {
      throw error
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
          width: 400,
          maxHeight: "80vh", // Limit height to 80% of the viewport
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          overflow: "auto", // Enable scrolling for overflowing content
        }}
      >
        <Typography id="add-new-modal-title" variant="h6" component="h2" mb={2}>
          Add New Entry
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="First Name"
            margin="normal"
            {...register("firstName", { required: "First name is required" })}
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
            label="Father's Name"
            margin="normal"
            {...register("fatherName", { required: "Father's name is required" })}
            error={!!errors.fatherName}
            helperText={errors.fatherName?.message}
          />
          <TextField
            fullWidth
            label="Mother's Name"
            margin="normal"
            {...register("motherName", { required: "Mother's name is required" })}
            error={!!errors.motherName}
            helperText={errors.motherName?.message}
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
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("dob", { required: "Date of birth is required" })}
            error={!!errors.dob}
            helperText={errors.dob?.message}
          />

          {/* Member Type */}
          <FormControl margin="normal">
            <FormLabel>Member Type</FormLabel>
            <RadioGroup row {...register("memberType", { required: true })}>
              <FormControlLabel value="A-type" control={<Radio />} label="A-type" />
              <FormControlLabel value="B-type" control={<Radio />} label="B-type" />
            </RadioGroup>
            {errors.memberType && (
              <Typography variant="caption" color="error">
                Please select a member type.
              </Typography>
            )}
          </FormControl>

          {/* Gender */}
          <FormControl margin="normal">
            <FormLabel>Gender</FormLabel>
            <RadioGroup row {...register("gender", { required: true })}>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
            {errors.gender && (
              <Typography variant="caption" color="error">
                Please select a gender.
              </Typography>
            )}
          </FormControl>

          {/* Marital Status */}
          <FormControl margin="normal">
            <FormLabel>Marital Status</FormLabel>
            <RadioGroup row {...register("maritalStatus", { required: true })}>
              <FormControlLabel value="single" control={<Radio />} label="Single" />
              <FormControlLabel value="married" control={<Radio />} label="Married" />
              <FormControlLabel value="widowed" control={<Radio />} label="Widowed" />

            </RadioGroup>
            {errors.maritalStatus && (
              <Typography variant="caption" color="error">
                Please select marital status.
              </Typography>
            )}
          </FormControl>

          {/* Type */}
          <FormControl margin="normal">
            <FormLabel>Type</FormLabel>
            <RadioGroup row {...register("type", { required: true })}>
              <FormControlLabel value="full" control={<Radio />} label="Full" />
              <FormControlLabel value="half" control={<Radio />} label="Half" />
            </RadioGroup>
            {errors.type && (
              <Typography variant="caption" color="error">
                Please select a type.
              </Typography>
            )}
          </FormControl>

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
