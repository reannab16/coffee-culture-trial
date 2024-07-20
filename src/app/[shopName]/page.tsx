"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { partnerCafes } from "@/components/partnerCafes/partnerCafes";
import {useForCustomersStore} from "@/stores/for-customer-store";
import PackageBlock from "@/components/shopPages/packageBlock";

export default function ShopPage({ params }: { params: { shopName: string } }) {
    const decodedShopName = decodeURIComponent(params.shopName)
    const foundShop = partnerCafes.find((partnerCafe)=>{return (partnerCafe.shopName.replaceAll(" ", "-") + "-" + partnerCafe.id) == decodedShopName})
    const {updateShopSelected} = useForCustomersStore();

  useEffect(()=>{if (foundShop) {updateShopSelected(foundShop)}},[foundShop])
    


  return (
    <div className="flex flex-col min-h-[calc(100vh-60px)] items-center justify-start container pt-[72px]">
      {/* {foundShop.id} */}
      <img src={foundShop?.featureSRC} alt="" className="w-full h-auto" />
      <div className="z-10 -mt-8 w-full px-8 flex flex-col items-center justify-start gap-y-8">
        {foundShop && <PackageBlock isGift={false} packageDetails={foundShop?.packageDetails}/>}
        {foundShop && <PackageBlock isGift={true} packageDetails={foundShop?.giftPackage}/>}
      </div>
    </div>
  );
}
