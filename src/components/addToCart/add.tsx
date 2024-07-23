import { shopType, useForCustomersStore } from "@/stores/for-customer-store";
import React, { useState } from "react";
import { SmolLogo } from "../navigation/icons";
import { Button, TextField } from "@mui/material";
import { useMutation } from "react-query";
// import toast from "react-hot-toast";
import axios from "axios";
import stripe from "stripe";
import { loadStripe } from '@stripe/stripe-js';
import { loadEnvConfig } from '@next/env'

export default function Add({
  shop,
  selected,
}: {
  shop: shopType | null;
  selected: string | null;
}) {
  const [packageDetails, setPackageDetails] = useState({
    email: "",
    shopId: shop?.id,
  });
  const [giftCardDetails, setGiftCardDetails] = useState({
    shopId: shop?.id,
    senderDetails: {
      email: "",
      firstName: "",
    },
    // receiverEmail: "",
    receiverFirstName: "",
    senderMessage: "",
  });
  const isGift = selected == "gift";

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

  const handleSubmit = async () => {
    // e.preventDefault();
    // if (user.userType == UserType.SHOP) {
    //   registerShopMutation.mutate({email: user.email, password: user.password, firstName: user.firstName})
    // }
    // isGift ? console.log(giftCardDetails) : console.log(packageDetails);
    if (isGift) {
      console.log(giftCardDetails);
    } else {
      console.log(packageDetails);
      registerBundleMutation.mutate({
        email: packageDetails.email,
        shopId: packageDetails.shopId!,
      });
    }
  };

  const registerBundleMutation = useMutation({
    mutationFn: async (values: { email: string; shopId: string }) => {
      // return Endpoints.registerShopUser(values);
      try {
        const payload = { values };
        const response = await axios.post(
          `http://127.0.0.1:5000/create-checkout-session`,
          { payload }
        );
        console.log(response?.status);
        if (response.status >= 200 && response.status < 300) {
          const session = await response.data;
          return session;
        } else {
          throw new Error(
            response.data.message || "create checkout session failed"
          );
        }
      } catch (error: any) {
        if (error.response) {
          console.error("Error registering user:", error);
          // return error.response.data;
          throw new Error(
            error.response.data.message || "create checkout session failed"
          );
        } else {
          // return error;
          throw new Error(error);
        }
      }
    },
    onSuccess: async (session) => {
      // // router.push( pathname + "?" + createQueryString("step", "2"))
      // addQueryParam('step', '2');
      // removeQueryParam('register');
      // router.push('/register/step-2')
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
        if (error) {
            console.error("Stripe redirect error:", error);
        }

      } else {
        console.error("Stripe failed to load")
      }

      
    
        
    },
    onError: (error: any) => {
    //   toast.error("Failed to register user");
      console.log("going");
      console.log(error);
    },
  });

  return (
    <div className="container flex flex-col justify-start items-center px-8 gap-y-5 ">
      <div className="flex flex-col items-center justify-start mt-5">
        <img src={shop?.logoSRC} alt="" className="w-7 h-7" />
        <div className="-mb-[5px] text-lg font-medium">{shop?.shopName}</div>
        <div className="text-[10px] flex items-end justify-center italic">
          <span className="pr-[1px]">x c</span>
          <SmolLogo className="mb-[3px]" />
          <span>ffee culture</span>
        </div>
      </div>
      <div className="px-7 py-8 flex justify-between items-center border-2 border-solid border-[var(--green)] bg-[var(--green20)] rounded-[10px] w-full">
        <div className="flex flex-col justify-center items-center">
          <div className="text-2xl font-medium -mb-[3px]">
            £{!isGift ? shop?.packageDetails.price : shop?.giftPackage.price}
          </div>
          {isGift && <div className="text-xs font-medium">Gift a friend</div>}
          <div className="text-xs">
            {!isGift
              ? `for ${shop?.packageDetails.drinksAllowance}`
              : shop?.giftPackage.drinksAllowance}{" "}
            drinks
          </div>
        </div>
        <div className="flex items-center justify-center text-xs">
          <img
            src="https://raw.githubusercontent.com/reannab16/coffee-culture-trial/ce4d061db63b80357eaef8e223196cae6e26cda8/public/taskBullet.svg"
            alt=""
            className="w-4 h-4 mr-1"
          />
          added to basket
        </div>
      </div>
      <TextField
        id="outlined-required"
        label="Email"
        variant="outlined"
        value={
          isGift ? giftCardDetails.senderDetails.email : packageDetails.email
        }
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          //   setUser({ ...user, email: e.target.value });
          isGift
            ? setGiftCardDetails({
                ...giftCardDetails,
                senderDetails: {
                  ...giftCardDetails.senderDetails,
                  email: e.target.value,
                },
              })
            : setPackageDetails({ ...packageDetails, email: e.target.value });
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
        type="submit"
        onClick={handleSubmit}
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
        // onClick={() => {
        //   router.push(
        //     pathname + "?" + createQueryString("register", "true")
        //   );
        // }}
        fullWidth
      >
        Continue
      </Button>
    </div>
  );
}
