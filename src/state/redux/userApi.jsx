import urls from "../../utils/AppSettings";
import axios from "axios"
let BASE_URL = urls.BaseUrl;
// UserLoginAPI

export const createUserLogin = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/users/login`,params)
        if(response?.data?.accessToken){
            localStorage.setItem("user", JSON.stringify(response.data.accessToken));
        }
        localStorage.setItem("isAuthenticated", "true");
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}