import React from "react";

import { SmolLogo } from "../navigation/icons";
import { CardResponse, GiftCardResponse } from "@/app/success/page";
import { getTransBackgroundColor } from "@/utils/colourUtils";

export default function GiftSuccess({
  shop,
  card,
}: {
  shop: shopType;
  card: GiftCardResponse;
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
      <div
        className="px-4 py-4 flex justify-center items-center border-2 border-solid rounded-[10px] w-full text-center text-xs"
        style={{
          borderColor: `#${shop?.lightBrandColour}`,
          backgroundColor: getTransBackgroundColor(
            `#${shop?.lightBrandColour}`,
            0.2
          ),
        }}
      >
        Thank you for your purchase!
      </div>
      <div className="items-center justify-start flex flex-col w-full mt-5 gap-y-5">
        <div className="font-medium uppercase text-sm text-start w-full">
          What to do next?
        </div>
        <div className="w-[calc(65vw+1.5rem)] relative h-full">
          <div
            className="absolute top-0 left-0 w-[65vw] h-[50vh] rounded-md -z-10 shadow"
            style={{
              backgroundColor: getTransBackgroundColor(
                `#${shop?.lightBrandColour}`,
                1
              ),
            }}
          ></div>
          <div className="absolute top-6 left-6 w-[65vw] min-h-[50vh] bg-[var(--backgroundColour)] rounded-md shadow flex flex-col items-center justify-start p-5 gap-y-5">
            <div className="text-start text-xs">
              Cheers, {card.senderName}! Your Coffee Gift is Ready to Brew!☕{" "}
              <br /> <br/>
              Here&apos;s how to spread the coffee love:
            </div>

            <div
              className=" text-xs text-wrap w-full p-4 rounded-md"
              style={{
                backgroundColor: getTransBackgroundColor(
                  `#${shop?.lightBrandColour}`,
                  0.2
                ),
              }}
            >
              <ol className="list-decimal gap-y-3 flex flex-col ml-4">
                <li>
                  Copy this special link:{" "}
                  <span className="text-wrap break-words underline">
                    {card.url}
                  </span>
                </li>
                <li>Send it to your lucky recipient when you&apos;re ready</li>
                <li>
                  They&apos;ll click the link to claim their personalized gift
                  card
                </li>
              </ol>
            </div>
            <div className="text-start text-xs">
              Don&apos;t worry – we&apos;ve also emailed you these details for
              safekeeping. <br />
              <br />
              Thanks for gifting great coffee experiences!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type shopType = {
  shopName: string;
  _id: string;
  prepaidCardPackage: prepaidPackageType;
  giftCardPackage: giftPackageType;
  featureImage: string;
  logo: string;
  lightBrandColour: string;
  darkBrandColour: string;
  postcode?: string;
  address?: string;
  phone?: string;
  about?: string;
};

export type prepaidPackageType = {
  drinksAllowance: number;
  drinksIncluded?: string[];
  drinksExcluded?: string[];
  price: number;
};

export type giftPackageType = {
  drinksAllowance: number;
  drinksIncluded?: string[];
  drinksExcluded?: string[];
  price: number;
};
