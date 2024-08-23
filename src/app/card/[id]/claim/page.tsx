"use client";
import { shopType, useForCustomersStore } from "@/stores/for-customer-store";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { GiftCard } from "../page";
import { base } from "@/api/endpoints";
import LoadingTopbar from "@/components/progressBar/loadingTopBar";
import { SmolLogo } from "@/components/navigation/icons";
import { Button, TextField } from "@mui/material";
import { secondary } from "@/themes/customs/palette";
import { usePathname, useRouter } from "next/navigation";

export default function Claim({ params }: { params: { id: string } }) {
  const decodedGiftId = decodeURIComponent(params.id);
  const { shop, updateShopSelected } = useForCustomersStore();
  const router = useRouter();
  const pathname = usePathname();
  const [receiver, setReceiver] = useState({
    email: "",
    contactNumber: "",
  })

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

  const handleSubmit = async () => {
    claimGiftMutation.mutate({email:receiver.email, contactNumber:receiver.contactNumber, cardId: decodedGiftId})
}

const claimGiftMutation = useMutation({
    mutationFn: async (values: {
      email?: string;
      contactNumber?: string;
      cardId?: string;
    }) => {
      // return Endpoints.registerShopUser(values);
      try {
        const response = await base.post(
          `/trial/card/giftCard/claim`,
          values
        );
        if (response.status >= 200 && response.status < 300) {
          const session = await response.data;
          return session;
        } else {
          throw new Error(
            response.data.message || "claim gift card failed"
          );
        }
      } catch (error: any) {
        if (error.response) {
          console.error("Error registering user:", error);
          // return error.response.data;
          throw new Error(
            error.response.data.message || "failed to claim gift card"
          );
        } else {
          // return error;
          console.error("failed to claim gift card:", error);
          throw new Error(error);
        }
      }
    },
    onSuccess: async (session) => {
      router.push(pathname + "/success");
      
    },
    onError: (error: any) => {
      //   toast.error("Failed to register user");
      console.log(error);
    },
  });

  console.log(shop, fetchedShop)

  

  if (isCardLoading || isShopLoading) {
    return <LoadingTopbar />;
  } else
  return (
    <div className="flex items-center justify-center pt-[72px]">
      <div className="container flex flex-col justify-start items-center px-8 gap-y-5 ">
        <div className="flex flex-col items-center justify-start mt-5">
          <img src={shop?.logo} alt="" className="w-7 h-7" />
          <div className="-mb-[5px] text-lg font-medium">{shop?.shopName}</div>
          <div className="text-[10px] flex items-end justify-center italic">
            <span className="pr-[1px]">x c</span>
            <SmolLogo className="mb-[3px]" />
            <span>ffee culture</span>
          </div>
        </div>
        <div className="px-6 py-6 flex flex-col justify-center items-center border-2 border-solid border-[var(--green)] bg-[var(--green20)] rounded-[10px] w-full text-center text-xs gap-y-5">
          <div className="flex flex-col rounded-lg w-full max-w-96">
            <div
              className="w-full h-20 bg-cover rounded-t-lg "
              style={{ backgroundImage: `url(${shop?.featureImage})` }}
            >
              <div
                className={`w-full h-full  to-transparent rounded-t-lg flex items-center justify-between px-4`}
                style={{
                  backgroundImage: `linear-gradient(to right, #${shop?.darkBrandColour}, transparent)`,
                }}
              >
                <div className="flex flex-col text-[var(--backgroundColour)] text-start max-w-20">
                  <div className="text-sm font-bold uppercase">
                    {shop?.shopName}
                  </div>
                  <div className="text-[10px] flex items-end justify-start italic -mt-[2px]">
                    <span className="pr-[1px]">x c</span>
                    <SmolLogo
                      className="mb-[3px] text-[var(--backgroundColour)]"
                      colour="#E1D6CC"
                    />
                    <span>ffee culture</span>
                  </div>
                </div>
                {/* <img src={card?.qrCodeUrl} alt="" className="h-14 w-14" /> */}
              </div>
            </div>
            <div
              className={`w-full h-7 rounded-b-lg flex items-center justify-between px-4 text-[10px]`}
              style={{ backgroundColor: `#${shop?.lightBrandColour}` }}
            >
              <div>{card?.drinksAllowance} drinks</div>
              <div className="italic font-light">
                for {card?.receiverDetails.name} from {card?.senderDetails.name}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full items-start justify-start gap-y-2 text-start">
          <div className="flex">
            {" "}
            <img
              src="https://raw.githubusercontent.com/reannab16/coffee-culture-trial/ce4d061db63b80357eaef8e223196cae6e26cda8/public/taskBullet.svg"
              alt=""
              className="w-4 h-4 mr-1"
            />
            <div>
              {fetchedShop?.giftCardPackage.drinksIncluded
                ? `Valid drinks: ${fetchedShop?.giftCardPackage.drinksIncluded.join(', ')}`
                : fetchedShop?.giftCardPackage.drinksExcluded && ` All drinks, excluding: ${fetchedShop?.giftCardPackage?.drinksExcluded.join(', ')}`}
            </div>
          </div>
          <div className="flex text-start">
            {" "}
            <img
              src="https://raw.githubusercontent.com/reannab16/coffee-culture-trial/ce4d061db63b80357eaef8e223196cae6e26cda8/public/taskBullet.svg"
              alt=""
              className="w-4 h-4 mr-1"
            />
            <div>
            Receive QR code via email, scan at checkout to claim drink
            </div>
          </div>
          <div className="flex">
            {" "}
            <img
              src="https://raw.githubusercontent.com/reannab16/coffee-culture-trial/ce4d061db63b80357eaef8e223196cae6e26cda8/public/taskBullet.svg"
              alt=""
              className="w-4 h-4 mr-1"
            />
            <div>
            Valid until all drinks claimed or for one year
            </div>
          </div>
          
        </div>
        </div>
        <TextField
        id="outlined-required"
        label={"Email Address"}
        variant="outlined"
        value={
          receiver.email
        }
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          //   setUser({ ...user, email: e.target.value });
          setReceiver({...receiver, email: e.target.value});
        }}
        sx={{
          fontSize: "12px",
          fontFamily: "Inter",
        }}
        fullWidth
        inputProps={{
          style: { fontSize: 12 },
        }}
        InputLabelProps={{
          style: { fontSize: 12, display: "flex", alignItems: "center" },
        }}
        color="primary"
      />
      <TextField
        id="outlined-required"
        label="Phone Number"
        variant="outlined"
        value={
          receiver.contactNumber
        }
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          //   setUser({ ...user, email: e.target.value });
          setReceiver({...receiver, contactNumber: e.target.value})
        }}
        sx={{
          fontSize: "12px",
          fontFamily: "Inter",
        }}
        fullWidth
        inputProps={{
          style: { fontSize: 12 },
        }}
        InputLabelProps={{
          style: { fontSize: 12, display: "flex", alignItems: "center" },
        }}
        color="primary"
      />
      <Button
                        variant="contained"
                        // color="secondary"
                        sx={{
                          fontWeight: "400",
                          fontSize: "12px",
                          paddingX: "20px",
                          height: "44px",
                          width: "100%",
                          opacity: 100,
                          color: secondary.contrastText,
                          backgroundColor: `#${shop?.lightBrandColour}`,
                          

                          "&:hover": {
                            backgroundColor: "#AFAF81",
                          },
                        }}
                        disableElevation
                        onClick={handleSubmit}
                      >Claim your gift card</Button>
      </div>
    </div>
  );
}
