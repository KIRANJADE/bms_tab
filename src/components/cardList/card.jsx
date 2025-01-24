import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUserApi } from "../../state/redux/userApi";
import {
  Card,
  Typography,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import classNames from "classnames";
import "../../components/cardList/cards.less";
import { deleteUser } from "../../state/redux/authSlice";
import { useForm } from "react-hook-form";

const ActionCard = ({ users, profile, onEdit }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { setValue } = useForm({});
  
  const dispatch = useDispatch();
  
  const handleClick = (event) => {
	  setAnchorEl(event.currentTarget);
	};
	
	const handleClose = () => {
		setAnchorEl(null);
	};
	
	const handleEdit = (dataId, user) => {
    console.log(dataId, user,"jhjhjhj",user.profile.firstname);

   

    onEdit(); // Assuming onEdit handles the UI updates
  };

  const handleDelete = async (usersId) => {
    console.log(usersId, "usersId");
    try {
      const response = await deleteUserApi(usersId);
      console.log(response);
      dispatch(deleteUser(response));
    } catch (error) {
      throw error;
    }
  };

  return (
    <Card className={classNames("action-card")}>
      {/* Header Section */}
      <Box className="action-card-header">
        <Box className="d-flex align-items-center">
          <Avatar
            src={users?.image}
            alt={users?.title}
            className="action-card-avatar"
          />
          <Box className="action-card-details">
            <Typography title={profile?.firstname}variant="subtitle1" className="action-card-name">
              {profile?.firstname}
            </Typography>
            <Typography variant="body2" className="action-card-id">
              {users?.memberdetails?.memberId}
            </Typography>
          </Box>
        </Box>
        <Box>
          <IconButton onClick={handleClick} className="action-card-options">
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>
      {/* <Divider sx={{borderColor:"2px solid red"}}/> */}
      {/* Details Section */}
      <Box className="action-card-details-item">
        <AdminPanelSettingsOutlinedIcon fontSize="small" color="success" />
        <Typography variant="body2" className="action-card-role">
          {users?.position.charAt(0).toUpperCase() + users?.position.slice(1)}
        </Typography>
      </Box>

      <Box className="action-card-details-item">
        <LocalPhoneOutlinedIcon fontSize="small" color="action" />
        <Typography variant="body2" className="action-card-memberId">
          {profile?.phoneno}
        </Typography>
      </Box>

      <Box className="action-card-details-item">
        <CurrencyRupeeIcon fontSize="small" color="action" />
        <Typography variant="body2" className="action-card-balance">
          {users?.balance}
        </Typography>
      </Box>

      {/* Context Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleEdit(users?._id, users)}>Edit</MenuItem>
        <MenuItem onClick={() => handleDelete(users?._id)}>Delete</MenuItem>
      </Menu>
    </Card>
  );
};

export default ActionCard;
