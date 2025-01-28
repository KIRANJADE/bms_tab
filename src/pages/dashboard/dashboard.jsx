import React, { useEffect, useState } from "react";
import ActionCard from "../../components/cardList/card";
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
} from "@mui/material";
import AddNewModal from "../userAdd/addUser";
import { useSelector, useDispatch } from "react-redux";
import { userList } from "../../state/redux/userApi";
import { userListData } from "../../state/redux/authSlice";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

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
  const users = useSelector((state) => state.auth?.users || []);
  const [status, setStatus] = useState("");
  const [memberType, setMemberType] = useState("");
  const [gender, setGender] = useState("");
  const [userType, setUserType] = useState("");

  const dispatch = useDispatch();

  const { reset } = useForm();

  const fetchUserList = async (currentPage, filterParams = {}) => {
    setLoading(true);
    setError("");
    try {
      // Combine default parameters with any additional filterParams
      const params = {
        ...filterParams,
      };

      const payload = {}

      const response = await userList(currentPage, ITEMS_PER_PAGE, params, payload);

      if (response.status) {
        dispatch(userListData([...users, ...response.userDetails]));

        if (currentPage >= response.totalPages) {
          setHasMore(false);
        }
      } else {
        setError("Failed to fetch user data.");
      }
    } catch (error) {
      setError("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(cardsUserId, "cardsUserId");
  }, [cardsUserId]);

  const handleModalOpen = () => setIsModalOpen(true);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    reset();
  };

  const handleEdit = (card) => {
    setcardsUserId(card?._id);
    setEditingCard(card);
    setIsModalOpen(true);
    setIsEditMode(true);
  };

  const handleDelete = () => setEditingCard(null);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchUserList(nextPage);
  };
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };
  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    setSearchValue("");
  };

  const handleFilter = () => {
    const filterParams = {
      ...(status && { status }),
      ...(memberType && { "memberdetails.memberType": memberType }),
      ...(gender && { "memberdetails.gender": gender }),
      ...(userType && { "memberdetails.userType": userType }),
    };

    setPage(1); // Reset to the first page

    // Call fetchUserList with filterParams
    fetchUserList(1, filterParams);
  };

  const handleReset = () => {
    setStatus("");
    setMemberType("");
    setGender("");
    setUserType("");
  
    // Clear the user list and fetch the initial unfiltered data
    setUsers([]); // Assuming `setUsers` is your state setter for the user list
    setCurrentPage(1); // Reset pagination
    fetchUserList(1); // Call fetchUserList with no filter params
  };

  return (
    <>
      <AddNewModal
        open={isModalOpen}
        onClose={handleModalClose}
        cardsUserId={cardsUserId}
        isEditUsers={isEditUsers}
      />
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: 3,
            marginTop: 0,
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
          <Box sx={{ flexGrow: 1 }} />{" "}
          {/* Added to push the icon to the right */}
          {showSearch && (
            <OutlinedInput
              size="small"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search..."
              sx={{
                maxWidth: "250px",
                transition: "max-width 0.3s ease-in-out",
                marginRight: 1,
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => console.log("Searching:", searchValue)}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          )}
          <IconButton
            onClick={handleSearchToggle}
            aria-label="toggle search"
            sx={{ alignItems: "center", marginRight: 1 }}
          >
            {showSearch ? <CloseSharpIcon /> : <SearchIcon />}
          </IconButton>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={isExpanded}
            aria-label="show more"
            sx={{ alignItems: "center" }}
          >
            <FilterAltIcon />
          </IconButton>
        </Box>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
  <Box sx={{ marginTop: 2, marginBottom: 2 }}>
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="Status-label">Status</InputLabel>
        <Select
          labelId="Status-label"
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="">
            <em>Select Status</em>
          </MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="death">Death</MenuItem>
          <MenuItem value="dismiss">Dismiss</MenuItem>
          <MenuItem value="suspend">Suspend</MenuItem>
          <MenuItem value="VRS">VRS</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="memberType-label">Member Type</InputLabel>
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
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <MenuItem value="">
            <em>Select Gender</em>
          </MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="userType-label">User Type</InputLabel>
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
      {/* Filter Button */}
      <Button
        variant="contained"
        onClick={handleFilter}
        color="primary"
        sx={{ paddingLeft: "50px", paddingRight: "50px" }}
      >
        Filter
      </Button>
      {/* Reset Button */}
      <Button
        variant="outlined"
        onClick={handleReset}
        color="secondary"
        sx={{ paddingLeft: "20px", paddingRight: "20px" }}
      >
        Reset
      </Button>
    </Box>
  </Box>
</Collapse>


        <Grid
          container
          spacing={1}
          style={{ height: 460, overflowY: "scroll" }}
        >
          {users.map((user, index) => (
            <Grid className="mb-3" item xs={12} sm={6} md={3} key={index}>
              <ActionCard
                users={user}
                profile={user?.profile}
                memberTypeHistory={user?.memberTypeHistory}
                onEdit={() => handleEdit(user)}
                onDelete={handleDelete}
                isEdit={editingCard}
              />
            </Grid>
          ))}
        </Grid>

        {error && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <p style={{ color: "red" }}>{error}</p>
          </Box>
        )}

        {hasMore && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
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
