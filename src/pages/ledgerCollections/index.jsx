import React, { useEffect, useState } from "react";
import ActionCard from "../../components/cardList/card";
import {
  Box,Button,IconButton,Grid,Collapse,TextField,Select,MenuItem,FormControl,InputLabel,
  OutlinedInput,InputAdornment,Checkbox,Autocomplete,
} from "@mui/material";
import AddNewModal from "../userAdd/addUser";
import { useSelector, useDispatch } from "react-redux";
import { userList, userSearch } from "../../state/redux/userApi";
import { userListData } from "../../state/redux/authSlice";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    watch,
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

  useEffect(() => {
    fetchUserList(page); // Fetch data when the component mounts
  }, [page]);

  const handleModalOpen = () => setIsModalOpen(true);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCard(null);
  };

  const handleEdit = (card) => {
    setcardsUserId(card?._id);
    setEditingCard(card);
    setIsModalOpen(true);
  };

  const handleDelete = () => setEditingCard(null);

  const handleLoadMore = () => {
    if (hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
    }
  };

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };
  const handleSearchClose = () => {
    setSearchValue("");
    fetchUserList(1);
    setSearchData("");
  };
  const handleSearch = async () => {
    try {
      console.log("Searching:", searchData);
      const result = await userSearch(searchData); // Pass searchValue to API
      dispatch(
        userListData({
          userDetails: result?.data?.userDetails,
          totalRecords: result?.data?.totalRecords,
        })
      );
      console.log("Search result:", result); // Handle the result (e.g., update state)
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  console.log(searchValue, "showSearch");

  const handleFilter = () => {
    setPage(1);
    dispatch(userListData({ userDetails: [], totalRecords: 0 })); // Clear previous data
    fetchUserList(1, {
      ...{ isEdit: true },
      ...(status && { status }),
      ...(memberType && { "memberdetails.memberType": memberType }),
      ...(gender && { "profile.gender": gender }),
      ...(userType && { "memberdetails.userType": userType }),
    });
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
    {showSearch && (
      <Box sx={{ width: { xs: "100%", sm: "46%" } }}> {/* Take full width on mobile */}
        <Controller
          name="userDetails"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={Array.isArray(memberList) ? memberList : []}
              getOptionLabel={(option) => option?.profile?.firstname || ""}
              value={field.value || null}
              onChange={(_, value) => field.onChange(value)}
              isOptionEqualToValue={(option, value) => option._id === value._id}
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
    )}

    <IconButton
      onClick={handleSearchToggle}
      aria-label="toggle search"
      sx={{
        marginRight: { xs: 0, sm: 1 },
        alignSelf: { xs: "flex-end", sm: "center" }, // Align button right on mobile
      }}
    >
      {showSearch ? (
        <CloseSharpIcon onClick={handleSearchClose} />
      ) : (
        <h6
          style={{
            margin: 0,
            fontWeight: 400,
            fontSize: "14px",
            whiteSpace: "nowrap", // Prevent wrapping
          }}
        >
          Please search and select members
        </h6>
      )}
    </IconButton>
  </Box>
</Box>


        <div className="mb-3 d-flex justify-content-end ">
          Total Count : {users?.totalRecords}
        </div>
        {users?.userDetails?.length > 0 ? (
          <Grid
            container
            spacing={1}
            style={{ height: 460, overflowY: "scroll" }}
          >
            ledgerCollection
          </Grid>
        ) : (
          <>
            <EmptyState />
          </>
        )}

        {hasMore &&
          !(status || memberType || gender || userType || searchData) && (
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
            >
              <Button
                style={{ backgroundColor: "#4c79f8", color: "white" }}
                variant="outlined"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </Button>
            </Box>
          )}
      </div>
    </>
  );
};

export default Dashboard;
