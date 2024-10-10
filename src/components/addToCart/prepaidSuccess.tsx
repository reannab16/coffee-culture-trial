import { PrepaidCardResponse } from "@/app/success/page";
import { shopType } from "@/stores/for-customer-store";
import React from "react";
import { SmolLogo } from "../navigation/icons";
import { GiftCard } from "@/app/card/[id]/page";
import { getTransBackgroundColor } from "@/utils/colourUtils";
import { AddToGoogleWallet } from "../icons/icons";
import { Button } from "@mui/material";
import { useMutation } from "react-query";
import { base } from "@/api/endpoints";
import AddToWalletButton, { Platform } from "../addToWallet/addToWalletButton";


export default function PrepaidSuccess({
  shop,
  card,
  giftCard,
  isGift,
}: {
  shop: shopType;
  card?: PrepaidCardResponse;
  giftCard?: GiftCard;
  isGift: boolean;
}) {
  const handleAddGoogleWallet = () => {
    handleAddWalletMutation.mutate({
      type: isGift ? "giftCard" : "prepaidCard",
      cardId: card?.cardId,
      platform: "google",
      shopId: shop._id,
    });
  };

  const handleAddWalletMutation = useMutation({
    mutationFn: async (values: {
      type?: string;
      cardId?: string;
      shopId?: string;
      platform: string;
    }) => {
      // return Endpoints.registerShopUser(values);
      try {
        const response = await base.post(`/trial/card/generate-pass`, values);
        if (response.status >= 200 && response.status < 300) {
          const session = await response.data;
          return session;
        } else {
          throw new Error(
            response.data.message || "add to google wallet failed"
          );
        }
      } catch (error: any) {
        if (error.response) {
          console.error("Add to google wallet failed:", error);
          // return error.response.data;
          throw new Error(
            error.response.data.message || "Add to google wallet failed"
          );
        } else {
          // return error;
          console.error("add to google wallet failed:", error);
          throw new Error(error);
        }
      }
    },
    onSuccess: async (data) => {
      const htmlSnippet = data;
      // Parse the HTML snippet to extract the saveUrl
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlSnippet;

      // Extract the href from the <a> tag
      const anchorTag = tempDiv.querySelector("a");
      const saveUrl = anchorTag?.getAttribute("href");
      console.log(saveUrl);

      // If the URL is found, redirect the user to Google Wallet
      if (saveUrl) {
        window.location.href = saveUrl;
      } else {
        alert("Failed to retrieve the Google Wallet pass URL.");
      }
    },
    onError: (error: any) => {
      //   toast.error("Failed to register user");
      console.log(error);
    },
  });

  return (
    <div className="container flex flex-col justify-start items-center px-8 gap-y-5 max-w-[25rem]">
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
        className="px-6 py-6 flex flex-col justify-center items-center border-2 border-solid rounded-[10px] w-full text-center text-xs gap-y-5 mb-20"
        style={{
          borderColor: `#${shop?.lightBrandColour}`,
          backgroundColor: getTransBackgroundColor(
            `#${shop?.lightBrandColour}`,
            0.2
          ),
        }}
      >
        <div className="">
          <span className="text-base font-semibold pb-4">
            {isGift
              ? `Congrats ${giftCard?.receiverDetails.name}!`
              : `Thank you!`}{" "}
          </span>
          <br />
          <span className="light italic test-sm">here is your QR code:</span>
        </div>

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
                  {shop.shopName}
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
              <img
                src={giftCard ? giftCard.qrCodeUrl : card?.qrCodeUrl}
                alt=""
                className="h-14 w-14"
              />
            </div>
          </div>
          <div
            className={`w-full h-7 rounded-b-lg flex items-center justify-between px-4 text-[10px]`}
            style={{ backgroundColor: `#${shop?.lightBrandColour}` }}
          >
            <div>
              {isGift ? giftCard?.drinksAllowance : card?.drinksAllowance}{" "}
              drinks
            </div>
            <div className="italic font-light">
              {isGift
                ? `for ${giftCard?.receiverDetails.name} from ${giftCard?.senderDetails.name}`
                : `Enjoy your coffee!`}
            </div>
          </div>
        </div>

        <div className="flex gap-x-2 w-full justify-center items-center -mt-5">
          {/* <div className="max-w-[45%] h-8 bg-black w-full rounded-full"></div> */}
          <AddToWalletButton
            isGift={isGift}
            shop={shop}
            card={card}
            platform={Platform.Apple}
          />
          {/* <button className="max-w-[45%]" onClick={handleAddGoogleWallet}>
            <AddToGoogleWallet className="w-full" />
          </button> */}
          <AddToWalletButton
            isGift={isGift}
            shop={shop}
            card={card}
            platform={Platform.Google}
          />
        </div>

        <div
          className="w-full flex gap-y-5 p-5 text-xs flex-col border-2 border-solid rounded-lg items-start justify-center text-start"
          style={{ borderColor: `#${shop.lightBrandColour}` }}
        >
          <div className="font-semibold">How to redeem?</div>
          <ol className="list-decimal ml-5 text-start">
            <li>
              You can use your card at {shop.shopName} for{" "}
              {isGift ? giftCard?.drinksAllowance : card?.drinksAllowance}{" "}
              delicious drinks.{" "}
            </li>
            <li>Simply show the QR code to redeem your coffees.</li>
          </ol>
          <div>
            We have emailed you with a copy of the above - please check your
            spam if not received.
          </div>
        </div>
        <div className="flex flex-col w-full items-start justify-start gap-y-2">
          <div className="flex">
            {" "}
            <img
              src="https://raw.githubusercontent.com/reannab16/coffee-culture-trial/ce4d061db63b80357eaef8e223196cae6e26cda8/public/taskBullet.svg"
              alt=""
              className="w-4 h-4 mr-1"
            />
            <div className="flex flex-col items-start justify-start text-start">
              <div>Valid drinks:</div>
              {card && (
                <div className="flex flex-col">
                  {card?.drinksIncluded && (
                    <span>Included: {card?.drinksIncluded.join(", ")}</span>
                  )}
                  {card?.drinksExcluded && (
                    <span>Excluded: {card?.drinksExcluded.join(", ")}</span>
                  )}
                </div>
              )}
            </div>
            {/* {giftCard && shop && <div>
              {shop?.giftCardPackage.drinksIncluded
                ? `Valid drinks: ${shop?.giftCardPackage.drinksIncluded.join(', ')}`
                : shop.giftCardPackage.drinksExcluded && `All drinks, excluding: ${shop?.giftCardPackage.drinksExcluded.join(', ')}`}
            </div>} */}
          </div>
          <div className="flex">
            {" "}
            <img
              src="https://raw.githubusercontent.com/reannab16/coffee-culture-trial/ce4d061db63b80357eaef8e223196cae6e26cda8/public/taskBullet.svg"
              alt=""
              className="w-4 h-4 mr-1"
            />
            <div>Valid until all drinks claimed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
