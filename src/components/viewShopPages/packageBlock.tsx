"use client";
import { packageType } from "@/stores/for-customer-store";
import React, { useCallback, useEffect } from "react";
import { Button } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getHoverColor,
  getTransBackgroundColor,
  getMixColor,
} from "@/utils/colourUtils";
import { TruncateText } from "../utils/truncateText";
import Link from "next/link";
import { primary } from "@/themes/customs/palette";

export default function PackageBlock({
  isGift,
  packageDetails,
  lightBrandColour,
  darkBrandColour,
  setLoaded,
}: {
  isGift: boolean;
  packageDetails: packageType;
  lightBrandColour: string;
  darkBrandColour: string;
  setLoaded: () => void;
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

  useEffect(() => {
    if (isGift) {
      setLoaded();
    }
  }, []);

  // console.log(packageDetails.drinksIncluded?.join(', '))

  return (
    <div className="flex flex-col gap-y-2">
      <div
        className="border-solid border-2 flex flex-col items-center justify-center rounded-xl max-w-96 relative"
        style={{
          borderColor: isGift ? primary.giftYellow : `#${lightBrandColour}`,
          backgroundColor: getMixColor(`#${lightBrandColour}`, "#E1D6CC", 80),
        }}
      >
        {isGift && (
          <img
            src="https://raw.githubusercontent.com/reannab16/coffee-culture-trial/refs/heads/main/public/giftBow.png"
            alt=""
            className="absolute -top-[2px] -left-[3px] w-20"
            onLoad={() => {
              setLoaded();
            }}
          />
        )}
        <div
          className=" flex items-stretch justify-center h-auto rounded-t-xl"
          style={{
            backgroundColor: getTransBackgroundColor(
              `#${lightBrandColour}`,
              0.2
            ),
          }}
        >
          <div
            className="flex flex-col items-center justify-center text-center border-r-2 border-r-solid p-5"
            style={{
              borderColor: isGift ? primary.giftYellow : `#${lightBrandColour}`,
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
                {
                  packageDetails.drinksIncluded && (
                    // `Valid drinks: ${packageDetails.drinksIncluded.join(', ').slice(0, 25)}...`}

                    <span>
                      Valid drinks:{" "}
                      {packageDetails.drinksIncluded.join(", ").length >= 20 ? (
                        <TruncateText
                          text={packageDetails.drinksIncluded.join(", ")}
                          limit={20}
                        />
                      ) : (
                        packageDetails.drinksIncluded.join(", ")
                      )}
                    </span>
                  )

                  // `Valid drinks: ${
                  //   packageDetails.drinksIncluded.join(", ").length >= 20 ? (
                  //     <TruncateText
                  //       text={packageDetails.drinksIncluded.join(", ")}
                  //       limit={20}
                  //     />
                  //   ) : (
                  //     packageDetails.drinksIncluded.join(", ")
                  //   )
                  // }`
                }
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
            className="py-3 px-3 text-center z-10 text-xs font-light italic rounded-tr-lg"
            style={{
              writingMode: "vertical-lr",
              backgroundColor: getTransBackgroundColor(
                `#${lightBrandColour}`,
                0.5
              ),
            }}
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
                createQueryString("selected", `${isGift ? "gift" : "bundle"}`) +
                "&" +
                "packageId" +
                "=" +
                packageDetails._id
            );
          }}
        >
          purchase {isGift ? "gift card" : "prepaid card"}
        </Button>
      </div>
      <div className="text-end">
        <Link
          href={`#${isGift ? "giftCardFAQ" : "prepaidCardFAQ"}`}
          className="text-xs underline opacity-60 hover:opacity-100 duration-300"
        >
          see FAQ
        </Link>
      </div>
    </div>
  );
}
