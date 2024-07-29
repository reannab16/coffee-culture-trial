import axios from "axios";

const base = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1",
});

class Endpoints {
    // static createCheckoutSession = async({})

      /**
   * Login shop user
   *
   * @param email The user's email
   * @param password The user's password
   * @returns The response from the server
   */
  static loginShopUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const payload = {
      email,
      password,
    };
    console.log(payload);
    try {
      const response = await base.post(`/trial/shop/login`, payload);
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
        return response.data;
      } else {
        
        throw response.data.messsage || "Login failed";
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Error logging in user:", error);
        throw error.response.data || "Login failed";
       
      } else {
        throw error.response.data;
      }
    }
  };

  static decrementPrepaid = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const payload = {
      email,
      password,
    };
    console.log(payload);
    try {
      const response = await base.post(`/trial/shop/login`, payload);
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
        return response.data;
      } else {
        
        throw response.data.messsage || "Login failed";
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Error logging in user:", error);
        throw error.response.data || "Login failed";
       
      } else {
        throw error.response.data;
      }
    }
  };



}

export default Endpoints