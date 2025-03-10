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
  Tooltip,
  CardContent,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import classNames from "classnames";
import "../../components/cardList/cards.less";
import { deleteUser } from "../../state/redux/authSlice";
import CardDetailPopUp from "../../components/cardDetailsModal/index";
import BalanceDetailPopup from "../../components/balanceDetailPopup/index";
import FamilyPopup from "../../components/familyDetailPopup/index";

const ActionCard = ({ users, profile, onEdit,memberTypeHistory = [] }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [openBalancePopup, setBalancePopup] = useState(false);
  const [openFamilyPopup, setFamilyPopup] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  const handlePopUpClick = () => {
    console.log("Hiiii", users);
    setOpen(true);
  };

  const handleBalancePopUpClick = () => {
    console.log("Hiiii", users);
    setBalancePopup(true);
  };

  const onBalanceClose = () => {
    setBalancePopup(false);
  };

  const onFamilyClose = () => {
    setFamilyPopup(false);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFamily = () =>{
    setFamilyPopup(true);
  }

  return (
    <>
      {open && (
        <CardDetailPopUp
          open={open}
          onClose={onClose}
          userDetails={users}
          onEdit={onEdit}
          onFamily={onFamily}
        />
      )}
        {openBalancePopup && (
        <BalanceDetailPopup
          open={openBalancePopup}
          onClose={onBalanceClose}
          userDetails={users}
        />
      )}
      {openFamilyPopup && (
        <FamilyPopup
          open={openFamilyPopup}
          onClose={onFamilyClose}
          userDetails={users}
        />
      )}
      <Card
        sx={{
          borderRadius: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          overflow: "visible",
          position: "relative",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#6ea8fe",
            padding: "20px",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            textAlign: "center",
          }}
          className={users?.isEdit ? "editcard" : "disabledCard"}  onClick={ users?.isEdit ?() => handlePopUpClick() : ""}
        >
          <Typography variant="subtitle1" className="action-card-name" >
            {profile?.lastname} {profile?.firstname}
          </Typography>
          <Typography variant="body2" className="action-card-id">
            {users?.memberdetails?.memberId
              ? users?.memberdetails?.memberId
              : "No Member ID"}
          </Typography>
        </Box>
        <Box>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              backgroundColor: "#4ecbff",
              position: "absolute",
              top: "60px",
              left: "calc(15% - 30px)",
            }}
          >
            <PersonIcon sx={{ color: "#fff" }} />
          </Avatar>
        </Box>
        <Box sx={{
              position: "absolute",
              top: "0px",
              right: "calc(15% - 30px)",
            }}>
            {!users?.isEdit && (
              <Tooltip
                open={tooltipOpen}
                onClose={() => setTooltipOpen(false)}
                onOpen={() => setTooltipOpen(true)}
                title={
                  <Card sx={{ maxWidth: 300 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Member Type History
                      </Typography>
                      {memberTypeHistory.length > 0 ? (
                        memberTypeHistory.map((history, index) => (
                          <Box key={index} sx={{ mb: 1 }}>
                            <Typography variant="body2">
                              <strong>Type:</strong> {history.memberType}
                            </Typography>
                            <Typography variant="body2">
                              <strong>ID:</strong> {history.memberId}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Joined:</strong> {history.joiningDate}
                            </Typography>
                          </Box>
                        ))
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          No history available.
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                }
                arrow
              >
                <IconButton>
                  <ErrorOutlineIcon style={{ color: "red" }} />
                </IconButton>
              </Tooltip>
            )}
        </Box>
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: "10px",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
            textAlign: "center",
            minHeight:"70px"
          }}
          onClick={ users?.isEdit ?() => handleBalancePopUpClick() : ""}  className={users?.isEdit ? "editcard" : "disabledCard"}
        >
          
          <Box className="action-card-details-item" sx={{paddingLeft:"75px",paddingBottom:"10px"}}>
           {profile?.phoneno && <LocalPhoneOutlinedIcon fontSize="small" color="action" />}
            <Typography variant="body2" className="action-card-memberId">
              {profile?.phoneno}
            </Typography>
          </Box>
          <Box className="action-card-details-item" sx={{paddingLeft:"75px"}}>
            <CurrencyRupeeIcon fontSize="small" color="action" />
            <Typography variant="body2" className="action-card-balance">
              {users?.balance}
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default ActionCard;
