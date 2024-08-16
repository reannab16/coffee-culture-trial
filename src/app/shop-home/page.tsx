"use client";
import Endpoints from "@/api/endpoints";
import { useAuthStore } from "@/stores/auth-store";
import { useForCustomersStore } from "@/stores/for-customer-store";
import React, { useEffect, useState } from "react";

export default function ShopHome() {
  const { session } = useAuthStore();
  const {shop, updateShopSelected} = useForCustomersStore();
  

  // useEffect(() => {
  //   if (session) {
  //       const shopp = Endpoints.getShop(session.shopId);
        
        
  //   }
  // }, [session]);

  return <div className="pt-[72px]">{session?.shopId}</div>;
}




