"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { shopType, useForCustomersStore } from "@/stores/for-customer-store";
import LoadingTopbar from "@/components/progressBar/loadingTopBar";
import Add from "@/components/addToCart/add";
import Cookies from "js-cookie";
import { useParams } from 'next/navigation'
import { useQuery } from "react-query";
import { base } from "@/api/endpoints";
import { ShopResponse } from "@/components/partnerCafes/partnerCafes";

export default function AddToCart() {
  
  const searchParams = useSearchParams();
  const params = useParams();
  const decodedShopName = params.shopName;
  const selected = searchParams.get("selected");
  const router = useRouter();
  const { shop } = useForCustomersStore();
  const [loading, setLoading] = useState(true);
  const shopCookieString = Cookies.get('cc-v1-shop');
  let shopCookie: shopType | undefined = undefined;

  const [foundShop, setFoundShop] = useState<shopType | null>();

  const {
    data: partnerCafes,
    error,
    isLoading,
  } = useQuery<shopType[], Error>(
    ["partnerCafes"],
    async (): Promise<shopType[]> => {
      const response = await base.get<ShopResponse>("/trial/shop");
      return response.data.data;
    }
  );

  const { updateShopSelected } = useForCustomersStore();

  useEffect(() => {
    if (partnerCafes) {

      const foundShop = partnerCafes.find((partnerCafe) => {
        return (
          partnerCafe.shopName.replaceAll(" ", "-") +
            "-" +
            partnerCafe._id ==
          decodedShopName
        );
      })
      if (foundShop) {
        updateShopSelected(foundShop);
      }
    }
  }, [partnerCafes]);

  if (isLoading == true) {
    return <LoadingTopbar />;
  } else {
    return (
      <Suspense fallback={<LoadingTopbar />}>
        <div className="flex items-center justify-center pt-[72px]">
          <Add shop={shop} selected={selected} />
        </div>
      </Suspense>
    );
  }
}
