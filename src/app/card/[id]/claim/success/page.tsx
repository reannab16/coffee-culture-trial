"use client"
import PrepaidSuccess from "@/components/addToCart/prepaidSuccess";
import { shopType, useForCustomersStore } from "@/stores/for-customer-store";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { GiftCard } from "../../page";
import { base } from "@/api/endpoints";
import LoadingTopbar from "@/components/progressBar/loadingTopBar";

export default function Success({ params }: { params: { id: string } }) {
    const decodedGiftId = decodeURIComponent(params.id);
  const { shop, updateShopSelected } = useForCustomersStore();

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

  if (isCardLoading || isShopLoading) {
    return(<LoadingTopbar/>)
  }
  
    return(
        <div className="flex items-center justify-center pt-[72px]">
            <PrepaidSuccess shop={shop!} giftCard={card} isGift={true} />

        </div>
    )
}