"use client"
import Endpoints, { base } from "@/api/endpoints";
import { GetPrepaid, GiftCard } from "@/app/card/[id]/page";
import { Button } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LoadingTopbar from "../progressBar/loadingTopBar";
import Cookies from "js-cookie";

export default function RedeemDrink({
  cardId: initialCardId,
  shopId: initialShopId,
  type: initialType,
}: {
  cardId: string;
  shopId: string;
  type: string;
}) {
  const router = useRouter();
  const token = Cookies.get('accessToken');
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const [cardId, setCardId] = useState(initialCardId);
  const [shopId, setShopId] = useState(initialShopId);
  const [type, setType] = useState(initialType);

  // useEffect(()=>{
  //   console.log(cardId, "found card", typeof(cardId), cardId.length > 0);
  //   if (!(cardId.length > 0)) {
  //     router.push("/shop-home/scanner")
  //   }
  // }, [])

  useEffect(()=>{
    if (!cardId || !shopId || !type) {
      const queryCardId = searchParams.get('cardId');
      const queryShopId = searchParams.get('shopId');
      const queryType = searchParams.get('type');

      if (queryCardId && queryShopId && queryType) {
        setCardId(queryCardId);
        setShopId(queryShopId);
        setType(queryType); } else {
          router.push("/shop-home/scanner");
        }
    }
  });


  const {
    data: card,
    error,
    isLoading: isCardLoading,
  } = useQuery<GetCardResponse, Error>(
    ["cardSuccess", cardId],
    async (): Promise<GiftCard> => {
      const response = await base.get(
        `/trial/card/${cardId}?type=${type}`
      );
      return response.data.data;
    },
    {
      enabled: cardId.length > 0 && shopId.length > 0 && type.length > 0,
    }
  );

  const redeemMutation = useMutation({
    mutationFn: async (values: { cardId: string, shopId: string, type: string,  }) => {
      //   return Endpoints.loginShopUser(values);

      const config = {
        headers: {
            'x-auth-token': token 
        }
    }



      const response = await base.patch(`/trial/card/decrement-drinks?cardId=${cardId}&shopId=${shopId}&type=${type}`,{}, config);
      return response.data.data;
    },
    onSuccess: (response: any) => {
      queryClient.invalidateQueries(["cardSuccess", cardId]);
      router.push("/shop-home/scanner/success" + "?cardId=" + cardId + "&type=" + type);
    },
    onError: (error: any) => {
      toast.error(`Error, ${error.message}`);
    },
  });

  const handleRedeem = async () => {
    // e.preventDefault();
    redeemMutation.mutate({ cardId: cardId, shopId: shopId, type: type,  });
  };

  if (isCardLoading) {
    return(<LoadingTopbar/>)
  }

  function isGiftCard(card: GetCardResponse): card is GiftCard {
    return (card as GiftCard).receiverDetails !== undefined;
  }
  
  function isPrepaid(card: GetCardResponse): card is GetPrepaid {
    return (card as GetPrepaid).name !== undefined && (card as GetPrepaid).email !== undefined;
  }

  return (
    <div className="flex items-start justify-center min-h-screen">
      <div className="container flex flex-col justify-start items-center mt-[72px] p-10 max-w-[500px] gap-y-5">
        <div className="border-2 border-[var(--green)] border-solid bg-[var(--green20)] flex items-center justify-start p-4 rounded-lg text-sm w-full">
          <span className="font-semibold pr-1">Card holder name: </span>
          <span> {card && isPrepaid(card) ? card?.name! : card?.receiverDetails!.name!}</span>
        </div>
        <div className="border-2 border-[var(--green)] border-solid bg-[var(--green20)] flex items-center justify-start p-4 rounded-lg text-sm w-full">
          <span className="font-semibold pr-1">Drinks remaining: </span>
          <span> {card?.drinksLeft}</span>
        </div>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            fontWeight: "400",
            fontSize: "12px",
            paddingX: "24px",
            height: "44px",

            "&:hover": {
              backgroundColor: "#AFAF81",
            },
          }}
          disableElevation
          onClick={() => {
            handleRedeem();
          }}
          fullWidth
        >
          Redeem drink
        </Button>
      </div>
    </div>
  );
}

export type GetCardResponse = GiftCard | GetPrepaid;
