import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {cookieStorage} from "@/utils/cookieStorage"

export type shopType = {
  shopName: string;
    _id: string;
    prepaidCardPackages: packageType[];
    giftCardPackages: packageType[];
    featureImage: string;
    logo: string;
    lightBrandColour: string;
    darkBrandColour: string;
    postcode?: string;
    address?: string;
    phone?: string;
    about?:string;
}

// export type prepaidPackageType = {
//   drinksAllowance: number;
//   drinksIncluded?: string[];
//   drinksExcluded?: string[];
//   price: number;
// }

// export type giftPackageType = {
//   drinksAllowance: number;
//   drinksIncluded?: string[];
//   drinksExcluded?: string[];
//   price: number;
// }

export type packageType = {
  _id: string;
  drinksAllowance: number;
  drinksIncluded?: string[];
  drinksExcluded?: string[];
  price: number;
}

interface forCustomersStoreState {
  shop: shopType | null;
  updateShopSelected: (newShop: shopType) => void;
}

export const useForCustomersStore = create<forCustomersStoreState>()(persist((set)=>({
  shop: null,
  updateShopSelected: (newShop) => set({shop: newShop})
}), {
  name: "cc-v1-shop",
  storage: createJSONStorage(()=> cookieStorage),
}))