import { useEffect, useState } from "react";
import { Box, Button, Grid, Grid2, Modal, TextField } from "@mui/material";
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

  const handleDelete = async(data) => {
    console.log(data);
    try {
      const response = await deleteChanthafee(data?._id)
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
  
      // Convert DD/MM/YYYY to YYYY-MM-DD
      if (data.effectiveDate) {
        const dateParts = data.effectiveDate.split("/"); // Split the date
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
        response = await editChanthafee(editData?._id,editData);
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
          onDelete = {handleDelete}
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
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
