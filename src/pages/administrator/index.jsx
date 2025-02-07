import React, { useEffect } from "react";

import CustomizedTables from "../../components/tableView/administratorTable"; 
import { administratorsList } from "../../state/redux/userApi";
import { useDispatch, useSelector } from "react-redux";
import { administratorData } from "../../state/redux/authSlice";

const index = () => {
  const dispatch = useDispatch();

  const adminData = useSelector((state) => state.auth?.adminData);

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
      <h5>Administrator List</h5>
      <CustomizedTables data={adminData} search={false}/>
    </div>
  );
};

export default index;
