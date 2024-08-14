"use client"
import Endpoints, { base } from "@/api/endpoints";
import { GetPrepaid, GiftCard } from "@/app/card/[id]/page";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LoadingTopbar from "../progressBar/loadingTopBar";
import Cookies from "js-cookie";

export default function RedeemDrink({
  cardId,
  shopId,
  type,
}: {
  cardId: string;
  shopId: string;
  type: string;
}) {
  const router = useRouter();
  const token = Cookies.get('token');
  const queryClient = useQueryClient();

  // useEffect(()=>{
  //   console.log(cardId, "found card", typeof(cardId), cardId.length > 0);
  //   if (!(cardId.length > 0)) {
  //     router.push("/shop-home/scanner")
  //   }
  // }, [])

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
    }
  );

  const redeemMutation = useMutation({
    mutationFn: async (values: { cardId: string, shopId: string, type: string,  }) => {
      //   return Endpoints.loginShopUser(values);
      console.log("passing")
      const config = {
        headers: {
            'x-auth-token': token 
        }
    }

    console.log(config.headers)

      const response = await base.patch(`/trial/card/decrement-drinks?cardId=${cardId}&shopId=${shopId}&type=${type}`,{}, config);
      return response.data.data;
    },
    onSuccess: (response: any) => {
      queryClient.invalidateQueries(["cardSuccess", cardId]);
      console.log("invalidated", cardId)
      router.push("/shop-home");
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

  return (
    <div className="flex items-start justify-center min-h-screen">
      <div className="container flex flex-col justify-start items-center mt-[72px] p-10 max-w-[500px] gap-y-5">
        <div className="border-2 border-[var(--green)] border-solid bg-[var(--green20)] flex items-center justify-start p-4 rounded-lg text-sm w-full">
          <span className="font-semibold pr-1">Card ID: </span>
          <span> {cardId}</span>
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
          redeem drink
        </Button>
      </div>
    </div>
  );
}

type GetCardResponse = GiftCard | GetPrepaid;
