import { useAuthStore } from "@/stores/auth-store";
import axios, { InternalAxiosRequestConfig } from "axios";

// export const base = axios.create({
//   // baseURL: "http://127.0.0.1:5000/api/v1",
//   baseURL: "https://api.coffee-culture.uk/api/v1",
// });

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://api.coffee-culture.uk/api/v1';

export const base = axios.create({
  baseURL: baseURL,
});

base.interceptors.request.use((config) => {
  const token = useAuthStore.getState().session?.accessToken;
  config.headers['X-AUTH-TOKEN'] = token

  return config
})


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
    try {
      const response = await base.post(`/trial/shop/login`, payload);
      if (response.status >= 200 && response.status < 300) {
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
    try {
      const response = await base.post(`/trial/shop/login`, payload);
      if (response.status >= 200 && response.status < 300) {
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

  static getShop = async (shopId: string) => {
    try {
      const response = await base.get(`trial/shop/${shopId}`)
      return response.data;
    } catch (error: any) {
      throw error.response.data || "shop not found"
    }
  }



}

export default Endpoints

// {
//   "statusCode": 200,
//   "data": [
//       {
//           "_id": "66b559266ff7a06ae65ba1f7",
//           "about": "coffee shop",
//           "address": "London",
//           "featureImage": "https://coffee-culture.s3.eu-north-1.amazonaws.com/cultureCafe%CC%81Banner.png",
//           "openingHours": "10-7",
//           "phone": "9999999999",
//           "shopName": "Culture Café",
//           "logo": "https://coffee-culture.s3.eu-north-1.amazonaws.com/cultureCafe%CC%81Logo.png",
//           "lightBrandColour": "BCBF8C",
//           "darkBrandColour": "2f211a"
//       },
//       {
//           "_id": "66b55bb26ff7a06ae65ba1fd",
//           "about": "coffee shop",
//           "address": "London",
//           "featureImage": "https://coffee-culture.s3.eu-north-1.amazonaws.com/cultureCafe%CC%81Banner.png",
//           "openingHours": "10-7",
//           "phone": "9999999999",
//           "shopName": "Culture Café 2",
//           "lightBrandColour": "BCBF8C",
//           "darkBrandColour": "4D2512",
//           "logo": "https://coffee-culture.s3.eu-north-1.amazonaws.com/cultureCafe%CC%81Logo.png"
//       },
//       {
//           "_id": "66bba7a7bf207ecd87829cb3",
//           "about": "coffee shop",
//           "address": "london",
//           "featureImage": "https://coffee-culture.s3.eu-north-1.amazonaws.com/shops/arelBanner.png",
//           "lightBrandColour": "D7BB77",
//           "logo": "https://coffee-culture.s3.eu-north-1.amazonaws.com/shops/arelLogo.png",
//           "openingHours": "10-7",
//           "phone": "9999999999",
//           "shopName": "Arel Coffee",
//           "darkBrandColour": "233B55"
//       },
//       {
//           "_id": "66d8a42e3cff8f79aed7b199",
//           "about": "not actually a coffee shop",
//           "address": "London",
//           "darkBrandColour": "2f211a",
//           "featureImage": "https://coffee-culture.s3.eu-north-1.amazonaws.com/cultureCafe%CC%81Banner.png",
//           "lightBrandColour": "BCBF8C",
//           "logo": "https://coffee-culture.s3.eu-north-1.amazonaws.com/cultureCafe%CC%81Logo.png",
//           "openingHours": "10-7",
//           "phone": "9999999999",
//           "shopName": "culture café 3"
//       }
//   ],
//   "totalShops": 4,
//   "totalPages": 1,
//   "currentPage": 1
// }

// {
//   "statusCode": 200,
//   "data": [
//       {
//           "_id": "66b559266ff7a06ae65ba1f7",
//           "about": "coffee shop",
//           "address": "London",
//           "featureImage": "https://coffee-culture.s3.eu-north-1.amazonaws.com/cultureCafe%CC%81Banner.png",
//           "openingHours": "10-7",
//           "phone": "9999999999",
//           "shopName": "Culture Café",
//           "logo": "https://coffee-culture.s3.eu-north-1.amazonaws.com/cultureCafe%CC%81Logo.png",
//           "lightBrandColour": "BCBF8C",
//           "darkBrandColour": "2f211a"
//       },
//       {
//           "_id": "66b55bb26ff7a06ae65ba1fd",
//           "about": "coffee shop",
//           "address": "London",
//           "featureImage": "https://coffee-culture.s3.eu-north-1.amazonaws.com/cultureCafe%CC%81Banner.png",
//           "openingHours": "10-7",
//           "phone": "9999999999",
//           "shopName": "Culture Café 2",
//           "lightBrandColour": "BCBF8C",
//           "darkBrandColour": "4D2512",
//           "logo": "https://coffee-culture.s3.eu-north-1.amazonaws.com/cultureCafe%CC%81Logo.png"
//       },
//       {
//           "_id": "66bba7a7bf207ecd87829cb3",
//           "about": "coffee shop",
//           "address": "london",
//           "featureImage": "https://coffee-culture.s3.eu-north-1.amazonaws.com/shops/arelBanner.png",
//           "lightBrandColour": "D7BB77",
//           "logo": "https://coffee-culture.s3.eu-north-1.amazonaws.com/shops/arelLogo.png",
//           "openingHours": "10-7",
//           "phone": "9999999999",
//           "shopName": "Arel Coffee",
//           "darkBrandColour": "233B55"
//       },
//       {
//           "_id": "66d8a42e3cff8f79aed7b199",
//           "about": "not actually a coffee shop",
//           "address": "London",
//           "darkBrandColour": "2f211a",
//           "featureImage": "https://coffee-culture.s3.eu-north-1.amazonaws.com/cultureCafe%CC%81Banner.png",
//           "lightBrandColour": "BCBF8C",
//           "logo": "https://coffee-culture.s3.eu-north-1.amazonaws.com/cultureCafe%CC%81Logo.png",
//           "openingHours": "10-7",
//           "phone": "9999999999",
//           "shopName": "culture café 3"
//       }
//   ],
//   "totalShops": 4,
//   "totalPages": 1,
//   "currentPage": 1
// }

