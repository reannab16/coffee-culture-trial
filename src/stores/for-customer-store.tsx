import { create } from "zustand";

export type shopType = {
  shopName: string;
    id: string;
    packageDetails: packageType;
    giftPackage: packageType;
    featureSRC: string;
    logoSRC:string;
    postcode: string;
}

export type packageType = {
  drinksAllowance: number;
  drinksIncluded: string[];
  price: number;
}

interface forCustomersStoreState {
  shop: shopType | null;
  updateShopSelected: (newShop: shopType) => void;
}

export const useForCustomersStore = create<forCustomersStoreState>((set)=>({
  shop: null,
  updateShopSelected: (newShop) => set({shop: newShop})
}))