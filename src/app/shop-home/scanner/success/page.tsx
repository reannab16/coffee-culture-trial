"use client"
import { base } from "@/api/endpoints";
import { GetPrepaid, GiftCard } from "@/app/card/[id]/page";
import { GetCardResponse } from "@/components/shopHome/redeemDrink";
import { Button } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";

export default function SuccessfulScan() {
    const searchParams = useSearchParams();
    const cardId = searchParams.get('cardId');
    const type = searchParams.get('type');
    const router = useRouter()

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
          enabled: !!cardId && !!type,
        }
      );

      function isPrepaid(card: GetCardResponse): card is GetPrepaid {
        return (card as GetPrepaid).name !== undefined && (card as GetPrepaid).email !== undefined;
      }


    return(
        <div className="flex items-start justify-center min-h-screen">
            <div className="container flex flex-col justify-start items-center mt-[72px] p-10 max-w-[500px] gap-y-5">
                {/* <div className="font-semibold text-3xl">Successful <span className="font-normal italic">Scan</span></div> */}
                <div className="font-bold text-2xl">Scan <span className="italic font-normal">Successful!</span></div>
            <div className="border-2 border-[var(--green)] border-solid bg-[var(--green20)] flex flex-col items-start justify-start p-4 rounded-lg text-sm w-full gap-y-2">
                <div>{card && isPrepaid(card) ? card?.name : card?.receiverDetails.name} has redeemed <span className="font-semibold">drink {(card) && card?.drinksAllowance - card?.drinksLeft} out of {card?.drinksAllowance}</span>, leaving <span className="font-semibold">{card?.drinksLeft} more</span></div>
                <div><span className="font-semibold">Customer name: </span>{card && isPrepaid(card) ? card?.name : card?.receiverDetails.name}</div>
                <div><span className="font-semibold">Drinks remaining: </span>{card?.drinksLeft}</div>

            </div>
            <Button
          variant="outlined"
          color="primary"
          sx={{
            fontWeight: "400",
            fontSize: "12px",
            paddingX: "24px",
            height: "44px",

            // "&:hover": {
            //   backgroundColor: "#AFAF81",
            // },
          }}
          disableElevation
          onClick={() => {
            Cookies.remove("reloaded");
            router.push("/shop-home/scanner")
          }}
          fullWidth
        >
          Return to scanner
        </Button>
            </div>

        </div>
    )
}