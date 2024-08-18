"use client";
import Endpoints, { base } from "@/api/endpoints";
import LoadingTopbar from "@/components/progressBar/loadingTopBar";
import { useAuthStore } from "@/stores/auth-store";
import { shopType, useForCustomersStore } from "@/stores/for-customer-store";
import { secondary } from "@/themes/customs/palette";
import { getHoverColor, getTransBackgroundColor } from "@/utils/colourUtils";
import {
  AssessmentOutlined,
  ManageAccountsOutlined,
  QrCodeScanner,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import tinycolor from "tinycolor2";

export default function ShopHome() {
  const { session } = useAuthStore();
  const { shop, updateShopSelected } = useForCustomersStore();
  const router = useRouter();

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
    () =>
      session ? fetchShopDetails(session?.shopId) : Promise.reject("No shopId"),
    {
      enabled: !!session?.shopId,
    }
  );

  if (isShopLoading) {
    return <LoadingTopbar />;
  } else {
    return (
      <div className="pt-[72px] flex flex-wrap gap-x-5 gap-y-5 items-start justify-center ">
        <div className="container flex flex-wrap gap-x-5 gap-y-5 items-start justify-start p-5 w-full">
          {shopHomeLinks.map((link) => {
            return (
              <div
                key={link.src}
                className="border-2 border-solid h-32 min-w-32 flex-grow rounded-xl flex flex-col justify-between bg-opacity-20"
                style={{
                  borderColor: `#${fetchedShop?.lightBrandColour}`,
                  backgroundColor: getTransBackgroundColor(
                    `#${fetchedShop?.lightBrandColour}`,
                    0.2
                  ),
                }}
              >
                <div className="w-full flex-grow px-5 pt-5 flex flex-col gap-y-1 items-start justify-start">
                  <div
                    className=""
                    // style={{ color: `#${fetchedShop?.lightBrandColour}` }}
                  >
                    {link.icon}
                  </div>
                  <div className="text-base font-medium">{link.name}</div>
                </div>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    fontWeight: "400",
                    fontSize: "12px",
                    width: "100%",
                    //   paddingX: "24px",
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    color: `#${fetchedShop?.lightBrandColour}`,
                    backgroundColor: `#${fetchedShop?.lightBrandColour}`,
                    typography: "shopButtons",

                    "&:hover": {
                      backgroundColor: getHoverColor(
                        `#${fetchedShop?.lightBrandColour}`
                      ),
                    },
                  }}
                  disableElevation
                  onClick={() => {
                    router.push(link.src);
                  }}
                >
                  open
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const shopHomeLinks = [
  {
    name: "Scanner",
    src: "/shop-home/scanner",
    icon: <QrCodeScanner />,
  },
  {
    name: "Analytics",
    src: "/shop-home/analytics",
    icon: <AssessmentOutlined />,
  },
  {
    name: "Help & Settings",
    src: "/shop-home/help",
    icon: <ManageAccountsOutlined />,
  },
];
