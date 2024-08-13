"use client";
import { base } from "@/api/endpoints";
import LoadingTopbar from "@/components/progressBar/loadingTopBar";
import { shopType, useForCustomersStore } from "@/stores/for-customer-store";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { useQuery } from "react-query";
import GiftSuccess from "@/components/addToCart/giftSuccess";

// export default function SuccessfulPurchase() {
//   const searchParams = useSearchParams();
//   const sessionId = searchParams.get("session_id");
//   const { updateShopSelected, shop } = useForCustomersStore();

//   const {
//     data: card,
//     error,
//     isLoading: isCardLoading,
//   } = useQuery<CardResponse, Error>(
//     ["cardSuccess"],
//     async (): Promise<CardResponse> => {
//       const response = await base.post("/trial/payments/card", {
//         sessionId: sessionId,
//       });
//       console.log(response);
//       return response.data.data;
//     }
//   );

//   const fetchShopDetails = async (shopId: string): Promise<shopType> => {
//     const response = await base.get(`/trial/shop/${shopId}`); // Adjust the endpoint as needed
//     return response.data.data;
//   };

//   const {
//     data: fetchedShop,
//     error: shopError,
//     isLoading: isShopLoading,
//   } = useQuery(
//     ["shopDetails", card?.shopId],
//     () => (card ? fetchShopDetails(card.shopId) : Promise.reject("No shopId")),
//     {
//       enabled: !!card?.shopId,
//     }
//   );

//   useEffect(() => {
//     if (fetchedShop) {
//       updateShopSelected(fetchedShop);
//     }
//   }, [fetchedShop]);

//   if (
//     isCardLoading == true
//     || isShopLoading == true
//   ) {
//     return (
//       <Suspense fallback={<LoadingTopbar />}>
//         <LoadingTopbar/>
//       </Suspense>
//     )
//   } else {
//     const isGiftCardResponse = (
//       card: CardResponse
//     ): card is GiftCardResponse => {
//       return (card as GiftCardResponse).url !== undefined;
//     };

//     const isPrepaidCardResponse = (
//       card: CardResponse
//     ): card is PrepaidCardResponse => {
//       return (card as PrepaidCardResponse).qrCodeUrl !== undefined;
//     };
//     return (
//       <Suspense fallback={<LoadingTopbar />}>
//         <div className="flex items-center justify-center pt-[72px]">
//           {isGiftCardResponse(card!) && (
//             <GiftSuccess shop={shop!} card={card!} />
//           )}
//         </div>
//       </Suspense>
//     );
//   }
// }

function SessionIdProvider({ onSessionId }: { onSessionId: (sessionId: string | null) => void }) {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  React.useEffect(() => {
    onSessionId(sessionId);
  }, [sessionId, onSessionId]);

  return null;
}

function SuccessfulPurchaseComponent({ sessionId }: { sessionId: string | null }) {
  const { updateShopSelected, shop } = useForCustomersStore();

  const {
    data: card,
    error,
    isLoading: isCardLoading,
  } = useQuery<CardResponse, Error>(
    ["cardSuccess", sessionId],
    async (): Promise<CardResponse> => {
      const response = await base.post("/trial/payments/card", { sessionId });
      return response.data.data;
    },
    {
      enabled: !!sessionId,
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

  const isGiftCardResponse = (card: CardResponse): card is GiftCardResponse => {
    return (card as GiftCardResponse).url !== undefined;
  };

  if (isCardLoading || !sessionId) {
    return <LoadingTopbar />;
  }

  return (
    <div className="flex items-center justify-center pt-[72px]">
      {card && isGiftCardResponse(card) && (
        <GiftSuccess shop={shop!} card={card} />
      )}
    </div>
  );
}

export default function SuccessfulPurchase() {
  const [sessionId, setSessionId] = React.useState<string | null>(null);

  return (
    <Suspense fallback={<LoadingTopbar />}>
      <SessionIdProvider onSessionId={setSessionId} />
      {sessionId !== null && <SuccessfulPurchaseComponent sessionId={sessionId} />}
    </Suspense>
  );
}

export interface GiftCardResponse {
  url: string;
  shopId: string;
  senderName: string;
  type: "giftCard";
}

export interface PrepaidCardResponse {
  qrCodeUrl: string;
  drinksLeft: number;
  drinksAllowance: number;
  drinksIncluded: string;
  drinksExcluded: string;
  shopId: string;
  type: string;
}

export type CardResponse = GiftCardResponse | PrepaidCardResponse;
