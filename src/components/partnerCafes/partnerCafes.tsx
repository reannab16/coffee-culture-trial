"use client";
import React, { Suspense, useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoadingTopbar from "../progressBar/loadingTopBar";
import Image from "next/image";
import Button from "@mui/material/Button";
import { primary, secondary } from "@/themes/customs/palette";
import { Divider } from "@mui/material";
import { shopType } from "@/stores/for-customer-store";
import { useQuery } from "react-query";
import axios from "axios";
import { base } from "@/api/endpoints";
import { getHoverColor, getTransBackgroundColor } from "@/utils/colourUtils";
import Link from "next/link";

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

  if (isLoading || !partnerCafes) {
    return <LoadingTopbar />;
  } else
    return (
      <Suspense fallback={<LoadingTopbar />}>
        <div className="flex flex-col min-h-[calc(100vh-60px)] items-center justify-start container pt-[72px] px-8">
          <div className="text-center text-2xl py-8">
            <span className="italic">Partner</span>{" "}
            <span className="font-semibold">
              Cafés <br /> and offers
            </span>
          </div>
          <div className="flex items-start justify-center gap-y-5 flex-wrap w-full gap-x-5">
            {partnerCafes.map((partnerCafe) => {
              if (
                partnerCafe.prepaidCardPackage ||
                partnerCafe.giftCardPackage
              ) {
                return (
                  <button
                    className={`h-32 w-full min-w-60 rounded-xl max-w-80 relative`}
                    key={partnerCafe._id}
                    style={{
                      backgroundImage: `url(${partnerCafe.featureImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => {
                      router.push(
                        partnerCafe.shopName.replaceAll(" ", "-") +
                          "-" +
                          partnerCafe._id
                      );
                    }}
                  >
                    <div
                      className="absolute top-0 bottom-0 text-[var(--backgroundColour)] left-0 right-0 bg-gradient-to-b from-[var(--darkBrown30)] to-[#2f211a] rounded-xl opacity-90 flex flex-col items-between justify-between p-3"
                      style={{
                        backgroundImage: `linear-gradient(${getTransBackgroundColor(
                          `#${partnerCafe.darkBrandColour}`,
                          0.3
                        )},#${partnerCafe.darkBrandColour})`,
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col pt-4 pl-4">
                          <div className="font-medium text-base">
                            {partnerCafe.shopName}
                          </div>
                          <div className="text-[10px] font-light">
                            {partnerCafe.postcode}
                          </div>
                        </div>

                        <img
                          src={partnerCafe.logo}
                          alt={partnerCafe.shopName + " logo"}
                          className="w-10 h-10"
                        />
                      </div>
                      <div className="flex items-center justify-end">
                        <Button
                          variant="contained"
                          // color="secondary"
                          sx={{
                            fontWeight: "400",
                            fontSize: "10px",
                            paddingX: "12px",
                            opacity: 100,
                            color: secondary.contrastText,
                            backgroundColor: `#${partnerCafe.lightBrandColour}`,

                            "&:hover": {
                              backgroundColor: getHoverColor(
                                `#${partnerCafe?.lightBrandColour}`
                              ),
                            },
                          }}
                          disableElevation
                          onClick={() => {
                            router.push(
                              partnerCafe.shopName.replaceAll(" ", "-") +
                                "-" +
                                partnerCafe._id
                            );
                          }}
                        >
                          {partnerCafe.prepaidCardPackage &&
                            "£" +
                              partnerCafe.prepaidCardPackage.price +
                              " for " +
                              partnerCafe.prepaidCardPackage.drinksAllowance +
                              " drinks"}
                          {partnerCafe.prepaidCardPackage &&
                            partnerCafe.giftCardPackage && (
                              <Divider
                                orientation="vertical"
                                flexItem
                                sx={{
                                  color: primary.main,
                                  marginX: "4px",
                                  opacity: 1,
                                }}
                              />
                            )}
                          {partnerCafe.giftCardPackage &&
                            "£" +
                              partnerCafe.giftCardPackage.price +
                              " gift card"}
                        </Button>
                      </div>
                    </div>
                  </button>
                );
              } else return <></>;
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
