import urls from "../../utils/AppSettings";
import axios from "axios";
let BASE_URL = urls.BaseUrl;
// UserLoginAPI

export const createUserLogin = async (params) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/login`, params);
    console.log(response, "response");
    if (response.data.user?.token) {
      localStorage.setItem(
        "authToken",
        JSON.stringify(response.data.user?.token)
      );
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const userList = async ( payload) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const headers = {
      "x-access-token": `${authToken}`,
      "Content-Type": "application/json",
    };

    // const queryParams = new URLSearchParams({ page, limit,  });

    const response = await axios.post(`${BASE_URL}/api/users/getall`,payload, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error;
  }
};

export const createUserApi = async (params) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const headers = {
      "x-access-token": `${authToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(`${BASE_URL}/api/users`, params, {
      headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const editUserApi = async (id, requestParams) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const headers = {
      "x-access-token": `${authToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.put(
      `${BASE_URL}/api/users/${id}`,
      requestParams,
      {
        headers,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUserApi = async (id) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const headers = {
      "x-access-token": `${authToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.delete(`${BASE_URL}/api/users/${id}`, {
      headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const headers = {
      "x-access-token": `${authToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.get(`${BASE_URL}/api/users/${id}`, {
      headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const CommitteeList = async (page = 1, limit = 10, payload = {}) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const headers = {
      "x-access-token": `${authToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.get(`${BASE_URL}/api/committeemeeting/`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error;
  }
};

export const administratorsList = async () => {
  try {
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const headers = {
      "x-access-token": `${authToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.get(`${BASE_URL}/api/users/admininstratorlist`, {
      headers,
    });
    return response.data;

  } catch (error) {
    throw error;
  }
};

export const createCommitteMeeting = async (requestParams) => {
	try {
	  const authToken = JSON.parse(localStorage.getItem("authToken"));
	  const headers = {
		"x-access-token": `${authToken}`,
		"Content-Type": "application/json",
	  };
	  const response = await axios.get(`${BASE_URL}/api/committeemeeting/`,requestParams, {
		headers,
	  });
	  return response.data;
  
	} catch (error) {
	  throw error;
	}
  };

  export const deleteCommiteeMeeting = async (id,requestParams) => {
	  try {
		const authToken = JSON.parse(localStorage.getItem("authToken"));
		const headers = {
		  "x-access-token": `${authToken}`,
		  "Content-Type": "application/json",
		};
		const response = await axios.delete(`${BASE_URL}/api/committeemeeting/${id}`,requestParams, {
		  headers,
		});
		return response.data;
	
	  } catch (error) {
		throw error;
	  }
	};

  export const getCommiteeMeetingDetailsById = async (id) => {
	  try {
		const authToken = JSON.parse(localStorage.getItem("authToken"));
		const headers = {
		  "x-access-token": `${authToken}`,
		  "Content-Type": "application/json",
		};
		const response = await axios.get(`${BASE_URL}/api/committeemeeting/${id}`, {
		  headers,
		});
		return response.data;
	
	  } catch (error) {
		throw error;
	  }
	};

  export const updateCommiteeMeetingDetails = async (id,requestParams) => {
	  try {
		const authToken = JSON.parse(localStorage.getItem("authToken"));
		const headers = {
		  "x-access-token": `${authToken}`,
		  "Content-Type": "application/json",
		};
		const response = await axios.put(`${BASE_URL}/api/committeemeeting/${id}`,requestParams, {
		  headers,
		});
		return response.data;
	
	  } catch (error) {
		throw error;
	  }
	};

  export const getAttendanceMembersList = async () => {
	  try {
		const authToken = JSON.parse(localStorage.getItem("authToken"));
		const headers = {
		  "x-access-token": `${authToken}`,
		  "Content-Type": "application/json",
		};  
    console.log(headers,"headerssss");
    
		const response = await axios.get(`${BASE_URL}/api/common/getattendancemembers`, {
		  headers,
		});
    console.log(response,"hghghgh");
    
		return response.data;
	
	  } catch (error) {
		throw error;
	  }
	};
  