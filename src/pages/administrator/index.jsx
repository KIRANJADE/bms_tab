import React, { useEffect } from "react";

import CustomizedTables from "../../components/tableView/administratorTable"; // Import the CustomizedTables component
import { administratorsList } from "../../state/redux/userApi";
import { useDispatch, useSelector } from "react-redux";
import { administratorData } from "../../state/redux/authSlice";
const ordersData = [
  {
    memberId: "100/000/0156",
    lastname: "ரா",
    firstname: "சத்யரூபன்",
    position: "தலைவர்",
    phoneno: "9789453541",
  },
  {
    memberId: "100/000/0157",
    lastname: "நா",
    firstname: "சதாசிவம்",
    position: "துணைத்தலைவர்",
    phoneno: "9488073868",
  },
];
const index = () => {
  const dispatch = useDispatch();

//   const adminData = useSelector((state) => state.auth?.adminData);
//   console.log(adminData,"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  

  useEffect(() => {
    fetchAdministratorsList();
  }, []);

  const fetchAdministratorsList = async () => {
    try {
      const response = await administratorsList();
      console.log(response, "adminList");
      if (response.status) {
        dispatch(administratorData(response?.userDetails));
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <h1>Administrator List</h1>
      <CustomizedTables data={ordersData} />
    </div>
  );
};

export default index;
