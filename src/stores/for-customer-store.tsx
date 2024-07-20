import { create } from "zustand";

export type shopType = {
  shopName: string;
    id: string;
    packageDetails: {
      drinksAllowance: number;
      drinksIncluded: string[];
      price: number;
    },
    giftPackage: {
      drinksAllowance: number;
      drinksIncluded: string[];
      price: number;
    },
    featureSRC: string;
    logoSRC:string;
    postcode: string;
}

interface forCustomersStoreState {
  shop: shopType | null;
  updateShopSelected: (newShop: shopType) => void;
}

export const useForCustomersStore = create<forCustomersStoreState>((set)=>({
  shop: null,
  updateShopSelected: (newShop) => set({shop: newShop})
}))