import { Card,  Typography, Box, Divider, IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkIcon from "@mui/icons-material/Link";
import MoreVertIcon from "@mui/icons-material/MoreVert"; 
import React from "react";
import { useDispatch } from "react-redux";
import { deleteUserApi } from "../../state/redux/userApi";

const ActionCard = ({users,profile}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async(usersId) => {
	console.log(usersId,"usersId");
	
	try {
		const response = await deleteUserApi(usersId);
		console.log(response,"myraesponse");
		
		// if(response){
		// 	dispatch(deleteUser(response))
		// }
	} catch (error) {
		throw error
	}
  }

  console.log(users, "usersusersusers",profile)
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 300,
        padding: 2,
        borderRadius: 2,
        boxShadow: 6, 
        display: "flex",
        flexDirection: "column",
        gap: 1,
        position: "relative", 
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar
          src={users?.image}
          alt={users?.title}
          sx={{ width: 40, height: 40 }} 
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

      <IconButton
        onClick={handleClick}
        sx={{
          position: "absolute",
          top: 8,
          right: 8, 
        }}
      >
        <MoreVertIcon />
      </IconButton>

      <Divider sx={{ backgroundColor: "#0b080899" }} />

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

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleEdit(users?._id)}>Edit</MenuItem>

        <MenuItem onClick={() => handleDelete(users?._id)}>Delete</MenuItem>
      </Menu>
    </Card>
  );
};

export default ActionCard;
