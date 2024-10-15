import { base } from "@/api/endpoints";
import { ShopResponse } from "@/components/partnerCafes/partnerCafes";
import { shopType } from "@/stores/for-customer-store";
import { useQuery } from "react-query";

const fetchShopDetails = async (shopId: string): Promise<shopType> => {
  const response = await base.get(`/trial/shop/${shopId}`);
  console.log({ response });
  return response.data.data;
};

export function useShopDetailsQuery(shopId?: string) {
  return useQuery<shopType, Error>(["shopDetails", shopId], () =>
    shopId ? fetchShopDetails(shopId) : Promise.reject("No shopId")
  );
}
