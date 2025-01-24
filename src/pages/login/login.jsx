import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserLogin } from "../../state/redux/userApi"; // Adjust the import path as needed
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Container,
  Paper,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PasswordIcon from '@mui/icons-material/Password';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("Form Submitted:", data);
      const response = await createUserLogin(data); // Call the API
      if (response) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container
      maxWidth="false"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: 400,
          height: 450,
          padding: 4,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          LOGIN
        </Typography>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <div>
            <div style={{ marginBottom: "5px" }}>
              <TextField
                fullWidth
                id="username"
                label="User Name"
                variant="outlined"
                placeholder="Enter your username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon />
                    </InputAdornment>
                  ),
                }}
                {...register("username", { required: "Username is required" })}
                error={!!errors.username}
              />
              <FormHelperText
                error={!!errors.username}
                sx={{ minHeight: "24px" }} // Reserve space for helper text
              >
                {errors.username?.message}
              </FormHelperText>
            </div>
            <div style={{ marginBottom: "5px" }}>
              <TextField
                fullWidth
                id="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="outlined"
                placeholder="Enter your password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={!!errors.password}
              />
              <FormHelperText
                error={!!errors.password}
                sx={{ minHeight: "24px" }} // Reserve space for helper text
              >
                {errors.password?.message}
              </FormHelperText>
            </div>
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#4C79F8",
              color: "white",
              padding: "10px",
              borderRadius: "4px",
              fontWeight: "bold",
              height: 40,
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            LOGIN
          </Button>
        </form>
        <div className="d-flex justify-content-end w-100 m-0">
          <Typography
            variant="body2"
            sx={{ color: "#7C58FF", cursor: "pointer", fontWeight: "400", mt: 2 }}
            onClick={() => alert("Forgot Password clicked")}
          >
            FORGET PASSWORD ?
          </Typography>
        </div>
      </Paper>
    </Container>
  );
};

export default LoginPage;
