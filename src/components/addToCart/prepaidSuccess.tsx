import { PrepaidCardResponse } from "@/app/success/page";
import { shopType } from "@/stores/for-customer-store";
import React from "react";
import { SmolLogo } from "../navigation/icons";
import { GiftCard } from "@/app/card/[id]/page";
import { getTransBackgroundColor } from "@/utils/colourUtils";

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
  return (
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
      <div className="px-6 py-6 flex flex-col justify-center items-center border-2 border-solid rounded-[10px] w-full text-center text-xs gap-y-5" style={{
          borderColor: `#${shop?.lightBrandColour}`,
          backgroundColor: getTransBackgroundColor(
            `#${shop?.lightBrandColour}`,
            0.2
          ),
        }}>
        <div className="">
          <span className="text-base font-semibold pb-4">{isGift? `Congrats ${giftCard?.receiverDetails.name}!`: `Thank you!`} </span>
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
              <img src={giftCard ? giftCard.qrCodeUrl : card?.qrCodeUrl} alt="" className="h-14 w-14" />
            </div>
          </div>
          <div
            className={`w-full h-7 rounded-b-lg flex items-center justify-between px-4 text-[10px]`}
            style={{ backgroundColor: `#${shop?.lightBrandColour}` }}
          >
            <div>{isGift? giftCard?.drinksAllowance : card?.drinksAllowance} drinks</div>
            <div className="italic font-light">Enjoy your coffee!</div>
          </div>
        </div>
        <div
          className="w-full flex gap-y-5 p-5 text-xs flex-col border-2 border-solid rounded-lg items-start justify-center text-start"
          style={{ borderColor: `#${shop.lightBrandColour}` }}
        >
          <div className="font-semibold">How to redeem?</div>
          <ol className="list-decimal ml-5 text-start">
            <li>
              You can use your card at {shop.shopName} for{" "}
              {isGift ? giftCard?.drinksAllowance : card?.drinksAllowance} delicious drinks.{" "}
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
            {card && <div>
              {card?.drinksIncluded
                ? `Valid drinks: ${card?.drinksIncluded.join(', ')}`
                : `All drinks, excluding: ${card?.drinksExcluded.join(', ')}`}
            </div>}
            {giftCard && <div>
              {giftCard?.drinksIncluded
                ? `Valid drinks: ${giftCard?.drinksIncluded.join(', ')}`
                : `All drinks, excluding: ${giftCard?.drinksExcluded.join(', ')}`}
            </div>}
          </div>
          <div className="flex">
            {" "}
            <img
              src="https://raw.githubusercontent.com/reannab16/coffee-culture-trial/ce4d061db63b80357eaef8e223196cae6e26cda8/public/taskBullet.svg"
              alt=""
              className="w-4 h-4 mr-1"
            />
            <div>
              Valid for one year
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
