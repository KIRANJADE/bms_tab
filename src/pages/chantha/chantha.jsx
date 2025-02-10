import { useEffect, useState } from "react";
import { Box, Button, Grid, Grid2, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import ChanthaTable from "../../components/tableView/chanthaTable";
import {
  createChanthafee,
  deleteChanthafee,
  editChanthafee,
  getAllChanthafee,
} from "../../state/redux/userApi";
import { useDispatch, useSelector } from "react-redux";
import { chanthaList } from "../../state/redux/authSlice";

const ParentComponent = () => {
  const [open, setOpen] = useState(false);
  const [chanthaData, setChanthaData] = useState([]);
  const [editData, setEditData] = useState({});
  const [editStatus, setEditStatus]= useState("active");
  const { control, handleSubmit, setValue, reset } = useForm();
  const dispatch = useDispatch();

  const chanthaListData = useSelector((state) => state.auth.chanthaData);
  console.log(
    chanthaListData?.chanthafeeDetails,
    "chanthaListData",
    chanthaData
  );

  useEffect(() => {
    fetchAllChanthaFeeDetails();
  }, []);

  const fetchAllChanthaFeeDetails = async () => {
    try {
      const response = await getAllChanthafee();
      if (response) {
        dispatch(chanthaList(response));
      }
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async (data) => {
    let payload = {
      "remark": "test delete"
    }
    try {
      const response = await deleteChanthafee(data?._id, payload)
      if (response) {
        fetchAllChanthaFeeDetails();
      }
    } catch (error) {
      throw error
    }
  }

  const handleOpen = (data = null) => {
    setEditData(data);
    if (data) {
      setValue("chanthaamount", data.chanthaamount);
      setValue("chanthaId", data.chanthaId);

      // Convert DD/MM/YYYY to YYYY-MM-DD
      console.log(data.effectiveDate,'data.effectiveDate')
      if (data.effectiveDate) {
        const dateParts = data.effectiveDate.split("-"); // Split the date
        if (dateParts.length === 3) {
          const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // Rearrange to YYYY-MM-DD
          setValue("effectiveDate", formattedDate);
        } else {
          console.error("Invalid date format:", data.effectiveDate);
        }
      }
    } else {
      reset();
    }
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
    reset();
    setEditData({});
  };


  const onSubmit = async (data) => {
    try {
      let response;
      if (editData && editData._id) {
        const updatedData = {
          chanthaamount: data?.chanthaamount,
          status: editStatus,
        };
        response = await editChanthafee(editData?._id, updatedData);
        setChanthaData((prevData) => prevData.map((item) => (item.id === editData.id ? response : item)));
      } else {
        response = await createChanthafee(data);
        setChanthaData((prevData) => [...prevData, response]);
      }
      if (response) {
        fetchAllChanthaFeeDetails();
      }
      handleClose();
    } catch (error) {
      console.error("Error saving Chantha:", error);
    }
  };

  return (
    <div>
      <Box
        sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 2 }}
      >
        <Button
          style={{ backgroundColor: "#4C79F8" }}
          variant="contained"
          onClick={handleOpen}
        >
          Add Chantha
        </Button>
      </Box>
      <Grid2 container spacing={1}>
        <ChanthaTable
          data={chanthaListData?.chanthafeeDetails}
          onEdit={handleOpen}
          onDelete={handleDelete}
        />
      </Grid2>

      <Modal open={open} onClose={handleClose}>

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            p: 4,
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <h5 style={{ "marginBottom": "20px" }}>{editData._id ? "Edit Chantha" : "Add Chantha"}</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            {editData._id && (
              <Controller
              name="chanthaId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Chantha Id"
                  fullWidth
                  margin="normal"
                  type="text"
                  required
                  disabled              
                />
              )}
            />
            )}
            <Controller
              name="chanthaamount"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Chantha Amount"
                  fullWidth
                  margin="normal"
                  type="number"
                  required
                />
              )}
            />
            <Controller
              name="effectiveDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Effective Date"
                  type="date"
                  fullWidth
                  margin="normal"
                  required
                  disabled={editData._id ? true : false}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
            {editData._id && (
  <Select
    fullWidth
    style={{ marginTop: "15px", marginBottom: "15px" }}
    value={editStatus || editData.status || ""}
    onChange={(e) => {
      const newStatus = e.target.value;
      setEditStatus(newStatus);
      setEditData((prev) => ({ ...prev, status: newStatus })); // Update editData state
    }}
  >
    <MenuItem value="active">Active</MenuItem>
    <MenuItem value="inactive">Inactive</MenuItem>
  </Select>
)}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                marginTop: 2,
              }}
            >
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>

              <Button type="submit" variant="contained" color="primary">
                {editData._id ? "Update" : "Submit"}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ParentComponent;
