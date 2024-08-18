"use client";
import { packageType } from "@/stores/for-customer-store";
import React, { useCallback } from "react";
import { Button } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getHoverColor, getTransBackgroundColor } from "@/utils/colourUtils";

export default function PackageBlock({
  isGift,
  packageDetails,
  lightBrandColour,
  darkBrandColour,
}: {
  isGift: boolean;
  packageDetails: packageType;
  lightBrandColour: string;
  darkBrandColour: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div
      className="border-solid border-2 flex flex-col items-center justify-center rounded-xl max-w-96"
      style={{
        borderColor: `#${lightBrandColour}`,
        backgroundColor: getTransBackgroundColor(`#${lightBrandColour}`, 0.2),
      }}
    >
      <div
        className=" flex items-stretch justify-center h-auto"
        style={{
          backgroundColor: getTransBackgroundColor(`#${lightBrandColour}`, 0.2),
        }}
      >
        <div
          className="flex flex-col items-center justify-center text-center border-r-2 border-r-solid p-5"
          style={{
            borderColor: `#${lightBrandColour}`,
          }}
        >
          <div className="text-3xl font-medium -mb-[3px] ">
            £{packageDetails.price}
          </div>
          {isGift ? (
            <div className="text-xs text-nowrap">
              <span className="font-medium">Gift a friend</span>
              <br />
              <span>{packageDetails.drinksAllowance} drinks</span>
            </div>
          ) : (
            <div className="text-xs text-nowrap">
              for {packageDetails.drinksAllowance} drinks
            </div>
          )}
        </div>
        <div className="px-3 py-5 ">
          <ul className="text-xs flex flex-col gap-y-2">
            <li>
              {packageDetails.drinksIncluded &&
                `Valid drinks: ${packageDetails.drinksIncluded.join()}`}
            </li>
            <li>
              {isGift
                ? "Send a personal note to your fellow coffee lover"
                : "Receive QR code via email, scan at checkout to claim drink"}
            </li>
            <li>
              {isGift
                ? "Valid for one year from date of purchase"
                : "Valid until all drinks claimed"}
            </li>
          </ul>
        </div>
        <div
          className="py-3 px-3 text-center z-10 text-xs font-light italic"
          style={{ writingMode: "vertical-lr", backgroundColor: getTransBackgroundColor(`#${lightBrandColour}`, 0.5) }}
        >
          {isGift ? "gift card" : "save 20%"}
        </div>
      </div>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          fontWeight: "400",
          fontSize: "12px",
          width: "100%",
          //   paddingX: "24px",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          backgroundColor: `#${lightBrandColour}`,
          typography: "shopButtons",

          "&:hover": {
            backgroundColor: getHoverColor(`#${lightBrandColour}`),
          },
        }}
        disableElevation
        onClick={() => {
          router.push(
            pathname +
              "/add-to-cart" +
              "?" +
              createQueryString("selected", `${isGift ? "gift" : "bundle"}`)
          );
        }}
      >
        purchase
      </Button>
    </div>
  );
}
