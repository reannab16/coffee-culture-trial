"use client";
import React, { Suspense, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoadingTopbar from "../progressBar/loadingTopBar";
import Button from "@mui/material/Button";
import { secondary } from "@/themes/customs/palette";
import { shopType } from "@/stores/for-customer-store";
import { useQuery } from "react-query";
import { base } from "@/api/endpoints";
import { getHoverColor, getTransBackgroundColor } from "@/utils/colourUtils";
import { Icon } from "@iconify/react";
import PartnerCafePageSkeleton from "./pageSkeleton";
import CafeButton from "./cafeButton";

// import { useCartStore } from "@/stores/cart-store";
// import {shopType, useForCustomersStore} from "@/stores/for-customer-store";

export default function PartnerCafes() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
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

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  // const [imagesLoading, setImagesLoading] = useState({

  // })

  if (isLoading || !partnerCafes) {
    return <PartnerCafePageSkeleton />;
  } else
    return (
      <Suspense fallback={<LoadingTopbar />}>
        <div className="flex flex-col min-h-[calc(100vh-60px)] items-center justify-start container py-[72px] px-8">
          <div className="text-center text-2xl py-8">
            <span className="italic">Partner</span>{" "}
            <span className="font-semibold">
              Cafés <br /> and offers
            </span>
          </div>
          <div className="flex items-start justify-center gap-y-5 flex-wrap w-full gap-x-5">
            {partnerCafes
              .filter(
                (partnerCafe) =>
                  partnerCafe.prepaidCardPackages?.length > 0 ||
                  partnerCafe.giftCardPackages?.length > 0
              )
              .map((partnerCafe) => {
                return (
                  <CafeButton partnerCafe={partnerCafe} key={partnerCafe._id}/>
                );
              })}
          </div>
        </div>
      </Suspense>
    );
}

export interface ShopResponse {
  statusCode: number;
  data: shopType[];
  totalShops: number;
  totalPages: number;
  currentPage: number;
}
