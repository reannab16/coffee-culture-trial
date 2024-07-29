import Endpoints from "@/api/endpoints";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export default function RedeemDrink({ cardId }: { cardId: string }) {
  const router = useRouter();

  const redeemMutation = useMutation({
    mutationFn: async (values: { cardId: string }) => {
      //   return Endpoints.loginShopUser(values);

    },
    onSuccess: (response: any) => {
      console.log(response.data);
      router.push("/shop-home");
    },
    onError: (error: any) => {
      toast.error(`Error, ${error.message}`);

      
    },
  });

  const handleRedeem = async () => {
    // e.preventDefault();
    redeemMutation.mutate({ cardId: cardId });
  };

  return (
    <div className="flex items-start justify-center min-h-screen">
      <div className="container flex flex-col justify-start items-center mt-[72px] p-10 max-w-[500px] gap-y-5">
        <div className="border-2 border-[var(--green)] border-solid bg-[var(--green20)] flex items-center justify-start p-4 rounded-lg text-sm w-full">
          <span className="font-semibold pr-1">Card ID: </span>
          <span> {cardId}</span>
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
            handleRedeem;
          }}
          fullWidth
        >
          redeem drink
        </Button>
      </div>
    </div>
  );
}
