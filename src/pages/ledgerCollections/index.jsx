import React, { useEffect, useState } from "react";
import ActionCard from "../../components/ledgerCard/card";
import {
  Box,
  Button,
  IconButton,
  Grid,
  Collapse,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import AddNewModal from "../userAdd/addUser";
import { useSelector, useDispatch } from "react-redux";
import { userList, searchMembersList } from "../../state/redux/userApi";
import { userListData, searchMembers } from "../../state/redux/authSlice";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import EmptyState from "../../pages/common/EmptyState";
import { ToastContainer } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const ITEMS_PER_PAGE = 12;

const Dashboard = () => {
  const [editingCard, setEditingCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true); // To track if more data is available
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [cardsUserId, setcardsUserId] = useState(null);
  const [isEditUsers, setIsEditMode] = useState(false);
  const [status, setStatus] = useState("");
  const [memberType, setMemberType] = useState("");
  const [gender, setGender] = useState("");
  const [userType, setUserType] = useState("");
  const [searchData, setSearchData] = useState("");

  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth?.users || []);
  const memberList = useSelector((state) => state.auth?.memberListData || []);
  const searchList = useSelector((state) => state.auth?.memberSearchData || []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    watch,
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const fetchUserList = async (currentPage, filterParams = {}) => {
    setLoading(true);
    try {
      const response = await userList({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        ...filterParams,
      });

      if (response.status) {
        dispatch(
          userListData({
            userDetails:
              currentPage === 1
                ? response.userDetails
                : [...users.userDetails, ...response.userDetails], // Append or replace
            totalRecords: response.totalRecords,
          })
        );

        setHasMore(currentPage * ITEMS_PER_PAGE < response.totalRecords); // Update hasMore
      }
    } catch (error) {
      setError("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchList = async (payload) => {
    console.log("Received Payload in fetchSearchList:", payload); // Confirm payload here

    try {
      const response = await searchMembersList(payload); // API call
      if (response.status) {
        dispatch(searchMembers(response?.data)); // Dispatch to Redux store
      } else {
        console.error("API response error:", response);
      }
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  useEffect(() => {
    fetchUserList(page); // Fetch data when the component mounts
  }, [page]);

  const handleModalOpen = () => setIsModalOpen(true);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCard(null);
  };

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };

  const handleReset = () => {
    setStatus("");
    setMemberType("");
    setGender("");
    setUserType("");
    setPage(1);
    dispatch(userListData({ userDetails: [], totalRecords: 0 })); // Clear previous data
    fetchUserList(1); // Fetch unfiltered data
  };

  const hanldeMembersSearch = () => {
    const selectedUser = getValues("userDetails"); // Get selected user
    console.log("Selected User:", selectedUser);

    if (selectedUser) {
      const memberId = selectedUser?.memberdetails?.memberId; // Check correct key

      console.log(memberId, "Selected memberId");

      // Check if memberId is available
      if (!memberId) {
        console.log("No valid member ID found");
        return;
      }

      const payload = {
        memberid: [memberId], // API expects array of member IDs
      };

      console.log(payload, "Payload being passed to fetchSearchList");

      fetchSearchList(payload); // API Call
    } else {
      console.log("No user selected");
    }
  };

  return (
    <>
      <AddNewModal
        open={isModalOpen}
        onClose={handleModalClose}
        cardsUserId={cardsUserId}
        isEditUsers={editingCard}
      />
      <ToastContainer position="top-right" autoClose={3000} />
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: 3,
          }}
        >
          <Button
            style={{ backgroundColor: "#4C79F8", width: "180px" }}
            variant="contained"
            color="primary"
            onClick={handleModalOpen}
          >
            Add User
          </Button>
          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            onClick={handleExpandClick}
            aria-expanded={isExpanded}
            aria-label="show more"
          >
            <FilterAltIcon />
          </IconButton>
        </Box>

        <Box sx={{ marginTop: 2, marginBottom: 2 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="memberType-label">Payee Name</InputLabel>
              <Select
                labelId="memberType-label"
                label="Member Type"
                value={memberType}
                onChange={(e) => setMemberType(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select Member Type</em>
                </MenuItem>
                <MenuItem value="a-class">A-Class</MenuItem>

                <MenuItem value="b-class">B-Class</MenuItem>
                <MenuItem value="c-class">C-Class</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="userType-label">Date</InputLabel>
              <Select
                labelId="userType-label"
                label="User Type"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select User Type</em>
                </MenuItem>
                <MenuItem value="full">Full</MenuItem>
                <MenuItem value="half">Half</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" onClick={handleReset} color="primary">
              Reset
            </Button>
          </Box>
        </Box>

        <Box sx={{ mt: 2, mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" }, // Stack on xs, row on sm and above
              justifyContent: { xs: "flex-start", sm: "space-between" }, // Alignments
              width: "100%",
            }}
          >
            <>
              <Box sx={{ width: { xs: "100%", sm: "46%" } }}>
                <Controller
                  name="userDetails"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      options={Array.isArray(memberList) ? memberList : []}
                      getOptionLabel={(option) =>
                        option?.profile?.firstname || ""
                      }
                      value={field.value || null}
                      onChange={(_, value) => field.onChange(value)}
                      isOptionEqualToValue={(option, value) =>
                        option._id === value._id
                      }
                      renderOption={(props, option) => {
                        const isSelected = field.value?._id === option._id;
                        return (
                          <li {...props}>
                            <Checkbox
                              icon={<CheckBoxOutlineBlankIcon />}
                              checkedIcon={<CheckBoxIcon />}
                              checked={isSelected}
                            />
                            {option?.profile?.firstname || ""}
                          </li>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select User" fullWidth />
                      )}
                    />
                  )}
                />
              </Box>

              <Button
                variant="contained"
                onClick={hanldeMembersSearch}
                color="primary"
              >
                Search
              </Button>
            </>

            <IconButton
              onClick={handleSearchToggle}
              aria-label="toggle search"
              sx={{
                marginRight: { xs: 0, sm: 1 },
                alignSelf: { xs: "flex-end", sm: "center" }, // Align button right on mobile
              }}
            ></IconButton>
          </Box>
        </Box>

        {searchList?.balanceDetails ? (
          <Grid
          container
          spacing={1}
          style={{
            height: 460,
            overflowY: "scroll",
            justifyContent: "center", // Horizontal center
          }}
        >
          <Grid item xs={12} sm={6} md={8} lg={8}>
            <ActionCard data={searchList?.balanceDetails?.ledgersData[0]} totalData= {searchList?.balanceDetails} memberDetails={getValues("userDetails")} />
          </Grid>
        </Grid>
        
        ) : (
          <>
            <EmptyState />
          </>
        )}

        
      </div>
    </>
  );
};

export default Dashboard;
