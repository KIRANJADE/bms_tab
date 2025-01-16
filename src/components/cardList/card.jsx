/* eslint-disable react/prop-types */
import { Card,  Typography, Box, Divider, IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkIcon from "@mui/icons-material/Link";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Three dots icon
import React from "react";

// eslint-disable-next-line react/prop-types
const ActionCard = ({users,profile}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Handle the opening of the menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle the closing of the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // eslint-disable-next-line react/prop-types
  console.log(users, "usersusersusers",profile)
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 300,
        padding: 2,
        borderRadius: 2,
        boxShadow: 6, // Increased shadow
        display: "flex",
        flexDirection: "column",
        gap: 1,
        position: "relative", // Set relative positioning to place the icon correctly
      }}
    >
      {/* Header Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar
          src={users?.image}
          alt={users?.title}
          sx={{ width: 40, height: 40 }} // Reduced avatar size
        />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {profile?.firstname }
          </Typography>
          <Typography variant="caption" color="text.secondary">
           {users?.phoneno}
          </Typography>
        </Box>
      </Box>

      {/* Menu Icon (3 dots) at the top right corner */}
      <IconButton
        onClick={handleClick}
        sx={{
          position: "absolute",
          top: 8,
          right: 8, // Position at the top-right corner
        }}
      >
        <MoreVertIcon />
      </IconButton>

      {/* Divider above the email */}
      <Divider sx={{ backgroundColor: "#0b080899" }} />

      {/* Contact Details */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <MailOutlineIcon fontSize="small" color="action" />
        <Typography variant="body2" color="text.secondary">
          {users?.role }
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <PhoneIcon fontSize="small" color="action" />
        <Typography variant="body2" color="text.secondary">
          {users?.memberdetails?.memberId }
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <LinkIcon fontSize="small" color="action" />
        <Typography variant="body2" color="text.secondary">
          {users?.balance }
        </Typography>
      </Box>

      {/* Menu for actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>

        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </Card>
  );
};

export default ActionCard;
