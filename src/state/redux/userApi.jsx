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

export const userList = async (payload) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const headers = {
      "x-access-token": `${authToken}`,
      "Content-Type": "application/json",
    };

    // const queryParams = new URLSearchParams({ page, limit,  });

    const response = await axios.post(`${BASE_URL}/api/users/getall`, payload, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error;
  }
};

export const userSearch = async (val, limit = 12, page = 1) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const headers = {
      "x-access-token": `${authToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.get(`${BASE_URL}/api/users/search?val=${val}&limit=${limit}&page=${page}`, {
      headers,
    });
    return response;
  } catch (error) {
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
    const response = await axios.post(`${BASE_URL}/api/committeemeeting/getAll`, payload, {
      headers,
    });
    console.log(response.data,'response.data')
    return response.data;
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error;
  }
};

export const deleteCommiteeDetails = async (id) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const headers = {
      "x-access-token": `${authToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.delete(
      `${BASE_URL}/api/committeemeeting/${id}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error;
  }
};

export const getCommiteemeetingDetailsById = async (id) => {
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
    console.error("Error fetching user list:", error);
    throw error;
  }
};

export const editCommiteeMeeting = async (id, requestParams) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const headers = {
      "x-access-token": `${authToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.put(
      `${BASE_URL}/api/committeemeeting/${id}`,
      requestParams,
      {
        headers,
      }
    );
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
    const response = await axios.get(
      `${BASE_URL}/api/users/admininstratorlist`,
      {
        headers,
      }
    );
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
    const response = await axios.post(
      `${BASE_URL}/api/committeemeeting/`,
      requestParams,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCommiteeMeeting = async (id, requestParams) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const headers = {
      "x-access-token": `${authToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.delete(
      `${BASE_URL}/api/committeemeeting/${id}`,
      requestParams,
      {
        headers,
      }
    );
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

export const updateCommiteeMeetingDetails = async (id, requestParams) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const headers = {
      "x-access-token": `${authToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.put(
      `${BASE_URL}/api/committeemeeting/${id}`,
      requestParams,
      {
        headers,
      }
    );
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

  export const createChanthafee = async (requestParams) => {
	  try {
		const authToken = JSON.parse(localStorage.getItem("authToken"));
		const headers = {
		  "x-access-token": `${authToken}`,
		  "Content-Type": "application/json",
		};  
    console.log(headers,"headerssss");
    
		const response = await axios.post(`${BASE_URL}/api/chanthafee`,requestParams, {
		  headers,
		});
    console.log(response,"hghghgh");
    
		return response.data;
	
	  } catch (error) {
		throw error;
	  }
	};

  export const getAllChanthafee = async (payload) => {
	  try {
		const authToken = JSON.parse(localStorage.getItem("authToken"));
		const headers = {
		  "x-access-token": `${authToken}`,
		  "Content-Type": "application/json",
		};  
    console.log(headers,"headerssss");
    
		const response = await axios.post(`${BASE_URL}/api/chanthafee/getall`,payload, {
		  headers,
		});
    
		return response.data;
	
	  } catch (error) {
		throw error;
	  }
	};

  export const getChanthafeeById = async (id) => {
	  try {
		const authToken = JSON.parse(localStorage.getItem("authToken"));
		const headers = {
		  "x-access-token": `${authToken}`,
		  "Content-Type": "application/json",
		};  
    console.log(headers,"headerssss");
    
		const response = await axios.get(`${BASE_URL}/api/chanthafee/${id}`, {
		  headers,
		});
    
		return response.data;
	
	  } catch (error) {
		throw error;
	  }
	};

  export const editChanthafee = async (id,requestParams) => {
	  try {
		const authToken = JSON.parse(localStorage.getItem("authToken"));
		const headers = {
		  "x-access-token": `${authToken}`,
		  "Content-Type": "application/json",
		};  
    console.log(headers,"headerssss");
    
		const response = await axios.put(`${BASE_URL}/api/chanthafee/${id}`,requestParams, {
		  headers,
		});
    
		return response.data;
	
	  } catch (error) {
		throw error;
	  }
	};

  export const deleteChanthafee = async (id,requestParams) => {
	  try {
		const authToken = JSON.parse(localStorage.getItem("authToken"));
		const headers = {
		  "x-access-token": `${authToken}`,
		  "Content-Type": "application/json",
		};
    const config = {
      headers,
      ...requestParams,
    }
		const response = await axios.delete(`${BASE_URL}/api/chanthafee/${id}`,config);
    
		return response.data;
	
	  } catch (error) {
		throw error;
	  }
	};

  export const getAllEvents = async (payload) => {
	  try {
		const authToken = JSON.parse(localStorage.getItem("authToken"));
		const headers = {
		  "x-access-token": `${authToken}`,
		  "Content-Type": "application/json",
		};  
    console.log(headers,"headerssss");
    
		const response = await axios.post(`${BASE_URL}/api/events/getall`,payload, {
		  headers,
		});
    
		return response.data;
	
	  } catch (error) {
		throw error;
	  }
	};

  export const createEvents = async (requestParams) => {
	  try {
		const authToken = JSON.parse(localStorage.getItem("authToken"));
		const headers = {
		  "x-access-token": `${authToken}`,
		  "Content-Type": "application/json",
		};  
    
		const response = await axios.post(`${BASE_URL}/api/events/`,requestParams, {
		  headers,
		});
    
		return response.data;
	
	  } catch (error) {
		throw error;
	  }
	};

  export const editEvents = async (id,requestParams) => {
	  try {
		const authToken = JSON.parse(localStorage.getItem("authToken"));
		const headers = {
		  "x-access-token": `${authToken}`,
		  "Content-Type": "application/json",
		};  
    
		const response = await axios.put(`${BASE_URL}/api/events/${id}`,requestParams, {
		  headers,
		});
    
		return response.data;
	
	  } catch (error) {
		throw error;
	  }
	};

  export const getEventById = async (id) => {
	  try {
		const authToken = JSON.parse(localStorage.getItem("authToken"));
		const headers = {
		  "x-access-token": `${authToken}`,
		  "Content-Type": "application/json",
		};  
    console.log(headers,"headerssss");
    
		const response = await axios.get(`${BASE_URL}/api/events/${id}`, {
		  headers,
		});
    
		return response.data;
	
	  } catch (error) {
		throw error;
	  }
	};

  export const deleteEvents = async (id,requestParams) => {
	  try {
		const authToken = JSON.parse(localStorage.getItem("authToken"));
		const headers = {
		  "x-access-token": `${authToken}`,
		  "Content-Type": "application/json",
		};
    const config = {
      headers,
      ...requestParams,
    }
		const response = await axios.delete(`${BASE_URL}/api/events/${id}`,config);
    
		return response.data;
	
	  } catch (error) {
		throw error;
	  }
	};

  export const publishEvents = async (requestParams) => {
	  try {
		const authToken = JSON.parse(localStorage.getItem("authToken"));
		const headers = {
		  "x-access-token": `${authToken}`,
		  "Content-Type": "application/json",
		};  
    
		const response = await axios.post(`${BASE_URL}/api/events/publisheventsamount`,requestParams, {
		  headers,
		});
    
		return response.data;
	
	  } catch (error) {
		throw error;
	  }
	};





  
  
