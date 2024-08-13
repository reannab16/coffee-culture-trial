"use client";
import { base } from "@/api/endpoints";
import LoadingTopbar from "@/components/progressBar/loadingTopBar";
import { shopType, useForCustomersStore } from "@/stores/for-customer-store";
import { secondary } from "@/themes/customs/palette";
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function GiftCardPage({ params }: { params: { id: string } }) {
    const decodedGiftId = decodeURIComponent(params.id);
    const {shop, updateShopSelected} = useForCustomersStore();
    const router = useRouter();
    const pathname = usePathname();

    const {
        data: card,
        error,
        isLoading: isCardLoading,
      } = useQuery<GiftCard, Error>(
        ["cardSuccess", decodedGiftId],
        async (): Promise<GiftCard> => {
          const response = await base.get(`/trial/card/${decodedGiftId}?type=giftCard`);
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
          console.log(shop)
        }
      }, [fetchedShop]);

      



    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
      setIsOpen(!isOpen);
    };

    if (isCardLoading || isShopLoading) {
        return <LoadingTopbar/>
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-10 gap-y-10">
        <div>card will go here</div>
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
                          

                          "&:hover": {
                            backgroundColor: "#AFAF81",
                          },
                        }}
                        disableElevation
                        onClick={() => {
                          router.push(
                            pathname + `/claim`
                          );
                        }}
                      >Claim your gift card</Button>

      
    </div>
  );
}

export interface GiftCard  {
    cardId: string,
    senderDetails: {
        email: string,
        name: string,
        contactNumber: number
    },
    shopId: string,
    drinksLeft: number,
    drinksAllowance: number,
    qrCodeUrl: string,
    message: string,
    receiverDetails: {
        email: string,
        name: string,
        contactNumber: string,
    }
    drinksIncluded: string,
    drinksExcluded: string,
  }
