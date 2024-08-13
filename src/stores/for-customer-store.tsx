import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {cookieStorage} from "@/utils/cookieStorage"

export type shopType = {
  shopName: string;
    _id: string;
    prepaidCardPackage: packageType;
    giftCardPackage: packageType;
    featureImage: string;
    logoSRC:string;
    brandColour: string;
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