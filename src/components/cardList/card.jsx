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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import classNames from "classnames";
import "../../components/cardList/cards.less";
import { deleteUser } from "../../state/redux/authSlice";
import CardDetailPopUp from "../../components/cardDetailsModal/index";
import BalanceDetailPopup from "../../components/balanceDetailPopup/index";

const ActionCard = ({ users, profile, onEdit,memberTypeHistory = [] }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [openBalancePopup, setBalancePopup] = useState(false);
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

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <CardDetailPopUp
          open={open}
          onClose={onClose}
          userDetails={users}
          onEdit={onEdit}
        />
      )}
        {openBalancePopup && (
        <BalanceDetailPopup
          open={openBalancePopup}
          onClose={onBalanceClose}
          userDetails={users}
        />
      )}
      <Card
        className={classNames("action-card")}
        
      >
        <Box className={users?.isEdit ? "editcard" : "disabledCard"} onClick={ users?.isEdit ?() => handlePopUpClick() : ""}>
          <Box className="action-card-header">
            <Box className="d-flex align-items-center">
              <Avatar
                src={users?.image}
                alt={users?.title}
                className="action-card-avatar"
              />
              <Box className="action-card-details">
                <Typography variant="subtitle1" className="action-card-name">
                  {profile?.lastname} {profile?.firstname}
                </Typography>
                <Typography variant="body2" className="action-card-id">
                  {users?.memberdetails?.memberId
                    ? users?.memberdetails?.memberId
                    : "No Member ID"}
                </Typography>
              </Box>
            </Box>
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
        </Box>
        <Box onClick={ users?.isEdit ?() => handleBalancePopUpClick() : ""}  className={users?.isEdit ? "editcard" : "disabledCard"}>
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
        </Box>
      </Card>
    </>
  );
};

export default ActionCard;
