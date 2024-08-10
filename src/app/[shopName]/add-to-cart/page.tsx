"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { shopType, useForCustomersStore } from "@/stores/for-customer-store";
import LoadingTopbar from "@/components/progressBar/loadingTopBar";
import Add from "@/components/addToCart/add";
import Cookies from "js-cookie";
import { useParams } from 'next/navigation'

export default function AddToCart() {
  
  const searchParams = useSearchParams();
  const params = useParams();
  const decodedShopId = params.shopName;
  const selected = searchParams.get("selected");
  const router = useRouter();
  const { shop } = useForCustomersStore();
  const [loading, setLoading] = useState(true);
  const shopCookieString = Cookies.get('cc-v1-shop');
  console.log(shop);
  let shopCookie: shopType | undefined = undefined;

  useEffect(() => {

    let shopCookie: any = null;

    if (shopCookieString) {
      try {
        shopCookie = JSON.parse(shopCookieString);
      } catch (error) {
        console.error("Failed to parse shop cookie:", error);
        shopCookie = null;
      }
    }
    console.log("shop", shop ? true : false, "shop cookie", shopCookie ? true: false)
    if ((shopCookie.shopId || shop) && selected) {
      setLoading(false);
      console.log('here bros', 'this cookie',shopCookie,'this shop', shop)
    } else if (shop && !selected) {
      router.push(shop.shopName.replaceAll(" ", "-") + "-" + shop._id);
    } else if (shopCookie && !selected) {
      router.push(shopCookie.shopName.replaceAll(" ", "-") + "-" + shopCookie._id);
    } else if ((!shopCookie.shopId && !shop) || (!shopCookie.shopId) || (!shop))  {
      router.push('/');
    }
  }, [shop, loading]);

  console.log(selected)

  if (loading == true) {
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
