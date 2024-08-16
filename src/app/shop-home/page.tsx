"use client";
import Endpoints, { base } from "@/api/endpoints";
import { useAuthStore } from "@/stores/auth-store";
import { shopType, useForCustomersStore } from "@/stores/for-customer-store";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function ShopHome() {
  const { session } = useAuthStore();
  const {shop, updateShopSelected} = useForCustomersStore();
  

  // useEffect(() => {
  //   if (session) {
  //       const shopp = Endpoints.getShop(session.shopId);
        
        
  //   }
  // }, [session]);

  const fetchShopDetails = async (shopId: string): Promise<shopType> => {
    const response = await base.get(`/trial/shop/${shopId}`);
    return response.data.data;
  };

  const {
    data: fetchedShop,
    error: shopError,
    isLoading: isShopLoading,
  } = useQuery(
    ["shopDetails", session?.shopId],
    () => (session ? fetchShopDetails(session?.shopId) : Promise.reject("No shopId")),
    {
      enabled: !!session?.shopId,

    }
  );

  return <div className="pt-[72px]">{session?.shopId}</div>;
}




