"use client";
import React, { Suspense, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoadingTopbar from "../progressBar/loadingTopBar";
import Image from "next/image";
import Button from "@mui/material/Button";
import { primary } from "@/themes/customs/palette";
import { Divider } from "@mui/material";

export default function PartnerCafes() {
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
    <Suspense fallback={<LoadingTopbar />}>
      <div className="flex flex-col min-h-[calc(100vh-60px)] items-center justify-start container pt-[72px] px-8">
        <div className="text-center text-2xl py-8">
          <span className="italic">Partner</span>{" "}
          <span className="font-semibold">
            Cafés <br /> and offers
          </span>
        </div>
        <div className="flex items-start justify-center gap-y-5 flex-wrap w-full gap-x-5">
          {partnerCafes.map((partnerCafe) => {
            return (
              <div
                className={`h-32 w-full min-w-60 rounded-xl max-w-80 relative`}
                key={partnerCafe.id}
                style={{
                  backgroundImage: `url(${partnerCafe.featureSRC})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute top-0 bottom-0 text-[var(--backgroundColour)] left-0 right-0 bg-gradient-to-b from-[var(--darkBrown30)] to-[#2f211a] rounded-xl opacity-90 flex flex-col items-between justify-between p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col pt-4 pl-4">
                      <div className="font-medium text-base">
                        {partnerCafe.shopName}
                      </div>
                      <div className="text-[10px] font-light">
                        {partnerCafe.postcode}
                      </div>
                    </div>

                    <img
                      src={partnerCafe.logoSRC}
                      alt={partnerCafe.shopName + " logo"}
                      className="w-10 h-10"
                    />
                  </div>
                  <div className="flex items-center justify-end">
                    {/* <div className="flex items-center justify-center p-1 bg-[var(--green)] bg-opacity-80 text-[var(--darkBrown)] text-[10px] rounded-sm px-2">
                      {"£" +
                        partnerCafe.packageDetails.price +
                        " for " +
                        partnerCafe.packageDetails.drinksAllowance +
                        " drinks"}{" "}
                    </div> */}
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{
                        fontWeight: "400",
                        fontSize: "10px",
                        paddingX: "12px",
                        opacity: 100,
                        backgroundColor: primary.green ,
                        

                        "&:hover": {
                          backgroundColor: "#AFAF81",
                        },
                      }}
                      disableElevation
                      onClick={() => {
                        router.push(
                          pathname + "?" + createQueryString("shop", partnerCafe.shopName)
                        );
                      }}
                    >
                      {"£" +
                        partnerCafe.packageDetails.price +
                        " for " +
                        partnerCafe.packageDetails.drinksAllowance +
                        " drinks"}
                        <Divider orientation="vertical" flexItem sx={{color: primary.main, marginX: '4px', opacity: 1}} />
                        {"£" +
                        partnerCafe.giftPackage.price +
                        " gift card" }
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Suspense>
  );
}

const partnerCafes = [
  {
    shopName: "Culture Café",
    id: "669952b8aea37e04c4f36b8c",
    packageDetails: {
      drinksAllowance: 5,
      drinksIncluded: ["matcha, espresso, americano"],
      price: 15,
    },
    giftPackage: {
      drinksAllowance: 5,
      drinksIncluded: ["matcha, espresso, americano"],
      price: 20,
    },
    featureSRC:
      "https://raw.githubusercontent.com/Coffee-Culture-UK/coffee-culture-trial-frontend/main/public/cultureCaf%C3%A9Banner.png",
    logoSRC:
      "https://raw.githubusercontent.com/Coffee-Culture-UK/coffee-culture-trial-frontend/main/public/cultureCaf%C3%A9Logo.png",
    postcode: "NW87JD",
  },
  {
    shopName: "Culture Café",
    id: "66997ed67e113cc445bcb12c",
    packageDetails: {
      drinksAllowance: 5,
      drinksIncluded: ["matcha, espresso, americano"],
      price: 15,
    },
    giftPackage: {
      drinksAllowance: 5,
      drinksIncluded: ["matcha, espresso, americano"],
      price: 20,
    },
    featureSRC:
      "https://raw.githubusercontent.com/Coffee-Culture-UK/coffee-culture-trial-frontend/main/public/cultureCaf%C3%A9Banner.png",
    logoSRC:
      "https://raw.githubusercontent.com/Coffee-Culture-UK/coffee-culture-trial-frontend/main/public/cultureCaf%C3%A9Logo.png",
    postcode: "NW87JD",
  },
];
