"use client";
import Image from "next/image";
import Button from "@mui/material/Button";
import { primary, secondary } from "@/themes/customs/palette";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useCallback } from "react";

export default function Hero({}) {
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
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex md:flex-row flex-col min-h-[calc(100vh-60px)] items-center md:justify-start justify-center container md:pt-0 pt-40">
        <div className="flex flex-col md:items-start justify-center md:gap-y-2 gap-y-3 lg:px-32 md:px-20 px-5 -mt-5 items-center md:text-start text-center ">
          <div className="uppercase md:text-md text-sm text-[var(--darkBrown)] opacity-50">
            Digital subscription & loyalty
          </div>
          <div className="md:text-4xl text-3xl font-semibold text-[var(--darkBrown)] md:w-80 w-64 md:pb-0">
            Supporting your <span className="italic font-medium">local</span>{" "}
            coffee shop
          </div>
          <div className="md:text-base text-xs font-light xl:w-[496px] lg:w-96 md:w-80 w-72">
            Our mission is to help coffee shop owners bring in loyal customers
            and guarantee revenue.
          </div>
          <div className="md:text-base text-xs font-light xl:w-[496px] lg:w-96 md:w-80 w-72">
            Find a cup of coffee with a story and a saving with our package deals and gift cards.
          </div>
          <div className="flex gap-x-2 pt-2">
            <Button
              variant="contained"
              color="secondary"
              sx={{
                fontWeight: "300",
                fontSize: "12px",
                paddingX: "24px",

                "&:hover": {
                  backgroundColor: "#AFAF81",
                },
              }}
              disableElevation
              onClick={() => {
                router.push(
                  "/partner-cafes"
                );
              }}
            >
              Check out offers at our partner cafés
            </Button>
            
          </div>
        </div>

        <img
          src="hero.png"
          alt=""
          className="md:absolute md:block hidden xl:h-screen lg:h-[80vh] h-[70vh] w-auto right-0 -z-10 lg:pr-20 pr-8"
        />
        <img
          src="small-hero.png"
          alt=""
          className="w-screen md:hidden block pt-16 h-auto"
        />
        {/* <div className="md:hidden block w-screen h-[90vh] mt-20 border-red-500 border-2 border-solid bg-top bg-no-repeat bg-contain bg-[url('https://raw.githubusercontent.com/Coffee-Culture-UK/coffee-culture-frontend/main/public/small-hero.png')]"></div> */}
      </div>
    </Suspense>
  );
}
