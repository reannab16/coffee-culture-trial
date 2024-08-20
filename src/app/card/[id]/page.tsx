"use client";
import { base } from "@/api/endpoints";
import LoadingTopbar from "@/components/progressBar/loadingTopBar";
import { shopType, useForCustomersStore } from "@/stores/for-customer-store";
import { secondary } from "@/themes/customs/palette";
import { getHoverColor, getTransBackgroundColor } from "@/utils/colourUtils";
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function GiftCardPage({ params }: { params: { id: string } }) {
  const decodedGiftId = decodeURIComponent(params.id);
  const { shop, updateShopSelected } = useForCustomersStore();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const {
    data: card,
    error,
    isLoading: isCardLoading,
  } = useQuery<GiftCard, Error>(
    ["cardSuccess", decodedGiftId],
    async (): Promise<GiftCard> => {
      const response = await base.get(
        `/trial/card/${decodedGiftId}?type=giftCard`
      );
      return response.data.data;
    },
    {
      enabled: !!decodedGiftId,
    }
  );

  const fetchShopDetails = async (shopId: string): Promise<shopType> => {
    const response = await base.get(`/trial/shop/${shopId}`);
    return response.data.data;
  };

  const {
    data: fetchedShop,
    error: shopError,
    isLoading: isShopLoading,
  } = useQuery(
    ["shopDetails", card?.shopId],
    () => (card ? fetchShopDetails(card.shopId) : Promise.reject("No shopId")),
    {
      enabled: !!card?.shopId,
    }
  );

  useEffect(() => {
    if (fetchedShop) {
      updateShopSelected(fetchedShop);
    }
  }, [fetchedShop]);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  if (isCardLoading || isShopLoading) {
    return <LoadingTopbar />;
  } else
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-10 gap-y-10">
        <div
          className={`w-[calc(65vw+1.5rem)] relative h-full min-h-[50vh] mb-10 duration-300 ${
            open ? "" : "-rotate-6"
          }`}
        >
          <div
            className="absolute top-0 left-0 w-[65vw] h-[50vh] rounded-md -z-20 shadow"
            style={{
              backgroundColor: getTransBackgroundColor(
                `#${shop?.lightBrandColour}`,
                1
              ),
            }}
          ></div>
          <div
            className={`absolute duration-300 top-6 left-6 w-[65vw] min-h-[50vh] bg-[var(--backgroundColour)] rounded-md shadow flex flex-col items-center justify-around gap-y-5 ${
              open ? "" : ""
            }`}
            style={{
              transform: open ? "rotateY(180deg) translateX(65vw)" : "rotateY(0deg) translateX(0)",

            }}
          >
            {!open && <div className="w-full flex justify-end">
              <img
                src={shop?.logo}
                alt=""
                className="h-6 opacity-50 w-6 mx-2"
              />
            </div>}
            {!open && <div className="font-medium text-lg px-5">
              Congratulations
              {/* {card?.receiverDetails.name} */}!
            </div>}
            {!open && <img
              src={shop?.featureImage}
              alt=""
              className="w-full h-auto max-w-[600px] px-5"
            />}
            {!open && <div className="flex flex-col items-center justify-center px-14">
              <div className="w-full text-start text-xs">from</div>
              <div className="font-medium text-lg italic">
                {card?.senderDetails.name}
              </div>
              <div className="text-base">& {shop?.shopName}</div>
            </div>}
            {!open && <div className="w-full flex justify-start">
              <img
                src={shop?.logo}
                alt=""
                className="h-6 opacity-50 w-6 mx-2"
              />
            </div>}
          </div>
          <div className="absolute top-6 left-6 -z-10 w-[65vw] min-h-[50vh] bg-[var(--backgroundColour)] rounded-md shadow flex flex-col items-center justify-center gap-y-5 p-5"></div>
        </div>
        <Button
          variant="contained"
          // color="secondary"
          sx={{
            fontWeight: "400",
            fontSize: "14px",
            paddingX: "20px",
            width: "100%",
            opacity: 100,
            color: secondary.contrastText,
            backgroundColor: `#${shop?.lightBrandColour}`,
            typography: "shopButtons",

            "&:hover": {
              backgroundColor: getHoverColor(`#${shop?.lightBrandColour}`),
            },
          }}
          disableElevation
          onClick={() => {
            open ? router.push(pathname + `/claim`) : setOpen(true);
          }}
        >
          {open ? "Claim your gift card" : "Open and claim your gift card"}
        </Button>
      </div>
    );
}

export interface GiftCard {
  cardId: string;
  senderDetails: {
    email: string;
    name: string;
    contactNumber: number;
  };
  shopId: string;
  drinksLeft: number;
  drinksAllowance: number;
  qrCodeUrl: string;
  message: string;
  receiverDetails: {
    email: string;
    name: string;
    contactNumber: string;
  };
  drinksIncluded: string[];
  drinksExcluded: string[];
}

export interface GetPrepaid {
  cardId: string;
  email: string;
  name: string;
  shopId: string;
  drinksLeft: number;
  drinksAllowance: number;
}
