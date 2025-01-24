import React, { useEffect, useState } from "react";
import ActionCard from "../../components/cardList/card";
import { Box, Button,IconButton, Grid,  Collapse ,TextField ,Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import AddNewModal from "../userAdd/addUser";
import { useSelector, useDispatch } from "react-redux";
import { userList } from "../../state/redux/userApi";
import { userListData } from "../../state/redux/authSlice";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const ITEMS_PER_PAGE =12;

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
  
  const dispatch = useDispatch();

   const {
	  reset,
	} = useForm();

  const fetchUserList = async (currentPage) => {
    setLoading(true);
    setError(""); 
    try {
      const response = await userList(currentPage, ITEMS_PER_PAGE, {
        status: "active",
      });

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
	console.log(cardsUserId,"cardsUserId");
  }, [cardsUserId])
  

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => {
	  setIsModalOpen(false);
	  reset();
  }

  const handleEdit = (card) => {
    setcardsUserId(card?._id);
    setEditingCard(card);
    setIsModalOpen(true);
	setIsEditMode(true)
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
  return (
    <>
      <AddNewModal open={isModalOpen} onClose={handleModalClose}  cardsUserId={cardsUserId}  isEditUsers={isEditUsers}/>
      <div className="">
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

        <Box sx={{ flexGrow: 1 }} /> {/* Added to push the icon to the right */}

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
        <Box sx={{ marginTop: 2,marginBottom: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="memberType-label">Member Type</InputLabel>
              <Select
                labelId="memberType-label"
                label="Member Type"
              >
                <MenuItem value=""><em>Select Member Type</em></MenuItem>
                <MenuItem value={'a-class'}>A-Class</MenuItem>
                <MenuItem value={'b-class'}>B-Class</MenuItem>
                <MenuItem value={'c-class'}>C-Class</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                label="Gender"
              >
                <MenuItem value=""><em>Select Gender</em></MenuItem>
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="userType-label">User Type</InputLabel>
              <Select
                labelId="userType-label"
                label="User Type"
              >
                <MenuItem value=""><em>Select User Type</em></MenuItem>
                <MenuItem value={'full'}>Full</MenuItem>
                <MenuItem value={'half'}>Half</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" sx={{ paddingLeft: '50px', paddingRight: '50px' }}>
              Filter
            </Button>
          </Box>
        </Box>
      </Collapse>

        <Grid container spacing={1} style={{height:460,overflowY:"scroll"}}>
          {users.map((user, index) => (
            <Grid className="mb-3" item xs={12} sm={6} md={3} key={index}>
              <ActionCard
                users={user}
                profile={user?.profile}
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
            <Button style={{backgroundColor:"#4c79f8",color:"white"}}
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

