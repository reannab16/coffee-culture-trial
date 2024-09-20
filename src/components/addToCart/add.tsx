import { shopType, useForCustomersStore } from "@/stores/for-customer-store";
import React, { useEffect, useState } from "react";
import { SmolLogo } from "../navigation/icons";
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useMutation, useQuery } from "react-query";
// import toast from "react-hot-toast";
import axios from "axios";
import stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";
import { loadEnvConfig } from "@next/env";
import { base } from "@/api/endpoints";
import { getHoverColor, getTransBackgroundColor } from "@/utils/colourUtils";
import LoadingTopbar from "../progressBar/loadingTopBar";
import { z } from "zod";

const prepaidSchema = z.object({
  email: z.string().email(),
  contactNumber: z.number(),
  shopId: z.string(),
  type: z.enum(["prepaidCard"]),
  cardPackageId: z.string(),
})



const giftSchema = z.object({
  shopId: z.string(),
    senderDetails: z.object({
      email: z.string().email(),
      contactNumber: z.number(),
      name: z.string(),
    }),
    // receiverEmail: "",
    receiverName: z.string(),
    message: z.object({
      short: z.string(),
      long: z.string(),
    }),
    type: z.enum(["giftCard"]),
    cardPackageId: z.string(),
})

export default function Add({
  shop,
  selected,
  packageId,
}: {
  shop: shopType;
  selected: string;
  packageId: string;
}) {
  const [packageDetails, setPackageDetails] = useState({
    email: "",
    contactNumber: "",
    shopId: shop?._id,
    type: "prepaidCard",
    cardPackageId: packageId, 
  });
  const [giftCardDetails, setGiftCardDetails] = useState({
    shopId: shop?._id,
    senderDetails: {
      email: "",
      contactNumber: "",
      name: "",
    },
    // receiverEmail: "",
    receiverName: "",
    message: {
      short: "",
      long: "",
    },
    type: "giftCard",
    cardPackageId: packageId, 
  });
  const [errorState, setErrorState] = useState<{ [key: string]: string | undefined }>({});
  const isGift = selected == "gift";
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
  
    // Define a field-specific schema based on the field name
    const fieldSchema = prepaidSchema.shape[name as keyof typeof prepaidSchema.shape];
    
    if (fieldSchema) {
      const result = fieldSchema.safeParse(value);
  
      if (!result.success) {
        // Handle validation errors for this specific field
        console.log(`Validation error for ${name}:`, result.error.errors);
      }
    }
  };

  const handleSubmit = async () => {
    if (isGift) {
      console.log(giftCardDetails);
      registerBundleMutation.mutate({
        shopId: giftCardDetails.shopId!,
        type: giftCardDetails.type,
        cardPackageId: giftCardDetails.cardPackageId,
        senderDetails: {
          email: giftCardDetails.senderDetails.email,
          name: giftCardDetails.senderDetails.name,
          contactNumber: giftCardDetails.senderDetails.contactNumber,
        },
        receiverName: giftCardDetails.receiverName,
        message: {
          short: giftCardDetails.message.short,
          long: giftCardDetails.message.long,
        },
      });
    } else {
      registerBundleMutation.mutate({
        email: packageDetails.email,
        shopId: packageDetails.shopId!,
        contactNumber: packageDetails.contactNumber,
        type: packageDetails.type,
        cardPackageId: packageDetails.cardPackageId,
      });
    }
  };

  const registerBundleMutation = useMutation({
    mutationFn: async (values: {
      email?: string;
      shopId: string;
      contactNumber?: string;
      type: string;
      cardPackageId: string;
      senderDetails?: {
        email: string;
        name: string;
        contactNumber: string;
      };
      receiverName?: string;
      message?: {
        short: string;
        long: string;
      };
    }) => {
      // return Endpoints.registerShopUser(values);
      try {
        const response = await base.post(
          `/trial/payments/create-checkout-session`,
          values
        );
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
          console.error("Error registering user:", error);
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
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (error) {
          console.error("Stripe redirect error:", error);
        }
      } else {
        console.error("Stripe failed to load");
      }
    },
    onError: (error: any) => {
      //   toast.error("Failed to register user");
      console.log(error);
    },
  });

  type messageType = {
    short: string;
    long: string;
  };

  interface messageResponse {
    statusCode: number;
    data: {
      messages: messageType[];
    };
  }

  const {
    data: giftMessages,
    error,
    isLoading,
  } = useQuery<messageType[], Error>(
    ["giftMessages"],
    async (): Promise<messageType[]> => {
      const response = await base.get<messageResponse>(
        "/trial/card/giftCard/messages"
      );
      console.log(response.data.data.messages);
      return response.data.data.messages;
    }
  );

  console.log(shop.prepaidCardPackages, shop.prepaidCardPackages.find((e)=>{e._id == packageId})?._id)

  useEffect(() => {
    if (!isLoading && giftMessages) {
      setGiftCardDetails({
        ...giftCardDetails,
        message: {
          ...giftCardDetails.message,
          short: giftMessages[0].short,
          long: giftMessages[0].long,
        },
      });
    }
  }, [giftMessages]);

  if (isLoading) {
    return <LoadingTopbar />;
  } else
    return (
      <div className="container flex flex-col justify-start items-center px-8 gap-y-5 max-w-96">
        <div className="flex flex-col items-center justify-start mt-5">
          <img src={shop?.logo} alt="" className="w-7 h-7" />
          <div className="-mb-[5px] text-lg font-medium">{shop?.shopName}</div>
          <div className="text-[10px] flex items-end justify-center italic">
            <span className="pr-[1px]">x c</span>
            <SmolLogo className="mb-[3px]" />
            <span>ffee culture</span>
          </div>
        </div>
        <div
          className="px-7 py-8 flex justify-between items-center border-2 border-solid rounded-[10px] w-full"
          style={{
            borderColor: `#${shop?.lightBrandColour}`,
            backgroundColor: getTransBackgroundColor(
              `#${shop?.lightBrandColour}`,
              0.2
            ),
          }}
        >
          <div className="flex flex-col justify-center items-center">
            <div className="text-2xl font-medium -mb-[3px]">
              £
              {!isGift
                ? shop?.prepaidCardPackages.find((e)=>e._id == packageId)?.price
                : shop?.giftCardPackages.find((e)=>e._id == packageId)?.price} 
            </div>
            {isGift && <div className="text-xs font-medium">Gift a friend</div>}
            <div className="text-xs">
              {!isGift
                ? `for ${shop?.prepaidCardPackages.find((e)=>e._id == packageId)?.drinksAllowance}`
                : shop?.giftCardPackages.find((e)=>e._id == packageId)?.drinksAllowance}{" "} 
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
        {isGift && (
          <TextField
            id="outlined-required"
            label="Your Name"
            type="name"
            autoComplete="name"
            variant="outlined"
            value={giftCardDetails.senderDetails.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setGiftCardDetails({
                ...giftCardDetails,
                senderDetails: {
                  ...giftCardDetails.senderDetails,
                  name: e.target.value,
                },
              });
            }}
            onBlur={()=>{
              handleBlur;
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
        )}
        <TextField
          id="outlined-required"
          label={isGift ? "Your Email" : "Email Address"}
          type="email"
          autoComplete="email"
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
          onBlur={handleBlur}
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
          type="tel"
          autoComplete="tel"
          variant="outlined"
          value={
            isGift
              ? giftCardDetails.senderDetails.contactNumber
              : packageDetails.contactNumber
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //   setUser({ ...user, email: e.target.value });
            isGift
              ? setGiftCardDetails({
                  ...giftCardDetails,
                  senderDetails: {
                    ...giftCardDetails.senderDetails,
                    contactNumber: e.target.value,
                  },
                })
              : setPackageDetails({
                  ...packageDetails,
                  contactNumber: e.target.value,
                });
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
        {isGift && (
          <TextField
            id="outlined-required"
            label="Recipient's Name"
            variant="outlined"
            value={giftCardDetails.receiverName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setGiftCardDetails({
                ...giftCardDetails,
                receiverName: e.target.value,
              });
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
        )}
        {isGift && (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={giftCardDetails.message.short}
            label="Short message"
            sx={{
              width: "100%",
              fontSize: "12px",
              fontFamily: "Inter",
            }}
            onChange={(e: SelectChangeEvent<string>) => {
              const selectedShort = e.target.value;

              if (giftMessages) {
                const correspondingMessage = giftMessages.find(
                  (message) => message.short === selectedShort
                );

                if (correspondingMessage) {
                  setGiftCardDetails({
                    ...giftCardDetails,
                    message: {
                      long: correspondingMessage.long,
                      short: e.target.value,
                    },
                  });
                } else {
                  setGiftCardDetails({
                    ...giftCardDetails,
                    message: {
                      ...giftCardDetails.message,
                      short: e.target.value,
                    },
                  });
                }
              } else {
                setGiftCardDetails({
                  ...giftCardDetails,
                  message: {
                    ...giftCardDetails.message,
                    short: e.target.value,
                  },
                });
              }

              // if (changed) {
              //   setGiftCardDetails({
              //     ...giftCardDetails,
              //     message: {
              //       ...giftCardDetails.message,
              //       short: e.target.value,
              //     },
              //   });
              // } else
            }}
          >
            {giftMessages?.map((giftMessage) => {
              return (
                <MenuItem value={giftMessage.short} key={giftMessage.short}>
                  {giftMessage.short}
                </MenuItem>
              );
            })}
          </Select>
        )}
        {isGift && (
          <TextField
            id="outlined-multiline-required"
            label="Personal Message"
            variant="outlined"
            multiline
            value={giftCardDetails.message.long}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setGiftCardDetails({
                ...giftCardDetails,
                message: {
                  ...giftCardDetails.message,
                  long: e.target.value,
                },
              });
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
        )}
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
            backgroundColor: `#${shop?.lightBrandColour}`,
            typography: "shopButtons",
            marginBottom: "40px",

            "&:hover": {
              backgroundColor: getHoverColor(`#${shop?.lightBrandColour}`),
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
