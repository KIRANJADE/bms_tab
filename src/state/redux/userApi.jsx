import urls from "../../utils/AppSettings";
import axios from "axios"
let BASE_URL = urls.BaseUrl;
// UserLoginAPI

export const createUserLogin = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/users/login`,params)
        console.log(response, "response")
        if(response.data.user?.token){
            localStorage.setItem("authToken", JSON.stringify(response.data.user?.token));
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const userList = async () => {
    try {
        const authToken = JSON.parse(localStorage.getItem("authToken"));
        console.log(authToken,"authToken");
        
        // Set up headers, including the Authorization token
        const headers = {
          "x-access-token": `${authToken}`,
          "Content-Type": "application/json",
        };
        console.log(headers,"headers");
        
        const response = await axios.get(`${BASE_URL}/api/users`, {
            headers,
          });
      
       console.log(response,"ContentContent");
       
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const createUserApi = async(params) => {
    try {
        const authToken = JSON.parse(localStorage.getItem("authToken"));
        const headers = {
            "x-access-token": `${authToken}`,
            "Content-Type": "application/json",
          };
        const response = await axios.post(`${BASE_URL}/api/users`,params, {
            headers,
          })
        return response
    } catch (error) {
        throw error
    }
}

export const editUserApi = async(id) => {
    try {
        const authToken = JSON.parse(localStorage.getItem("authToken"));
        const headers = {
            "x-access-token": `${authToken}`,
            "Content-Type": "application/json",
          };
        const response = await axios.put(`${BASE_URL}/api/users/${id}`, {
            headers,
          })
        return response
    } catch (error) {
        throw error
    }
}


export const deleteUserApi = async (id) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("authToken"));
      const headers = {
        "x-access-token": `${authToken}`,
        "Content-Type": "application/json",
      };
  
      const response = await axios.delete(`${BASE_URL}/api/users/${id}`,params, {
        headers,
      });
  
      return response;
    } catch (error) {
      throw error;
    }
  };

