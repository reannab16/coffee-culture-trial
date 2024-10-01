"use client"
import { shopType } from "@/stores/for-customer-store";
import { getHoverColor, getTransBackgroundColor } from "@/utils/colourUtils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Button, Skeleton } from "@mui/material";
import { secondary } from "@/themes/customs/palette";
import Image from "next/image";

export default function CafeButton({ partnerCafe }: { partnerCafe: shopType }) {
  const router = useRouter();
  const [imagesLoaded, setImagesLoaded] = useState({
    background: false,
    logo: false,
  });

  useEffect(() => {
    const img = document.createElement('img');
    img.src = partnerCafe.featureImage;
    img.onload = () => {
      setImagesLoaded((prev) => ({ ...prev, background: true }));
    };
  }, [partnerCafe.featureImage]);

  return (
    <div className={`h-32 w-full max-w-80 min-w-60 `} key={partnerCafe._id}>
        {(!imagesLoaded.background && !imagesLoaded.logo) && <Skeleton
                variant="rectangular"
                width="100%"
                height={128}
                sx={{
                  borderRadius: "8px",
                  visibility: imagesLoaded ? "hidden":"visible", 
                }}
              />}
      <button
        className={`h-32 w-full min-w-60 rounded-xl max-w-80 relative ${(imagesLoaded.background && imagesLoaded.logo) ? "visible": "invisible"}`}
        style={{
          backgroundImage: `url(${partnerCafe.featureImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={() => {
          router.push(
            partnerCafe.shopName.replaceAll(" ", "-") + "-" + partnerCafe._id
          );
        }}
      >
        <div
          className="absolute top-0 bottom-0 text-[var(--backgroundColour)] left-0 right-0 bg-gradient-to-r from-[var(--darkBrown30)] to-[#2f211a] rounded-xl opacity-90 flex flex-col items-between justify-between p-3"
          style={{
            backgroundImage: `linear-gradient(270deg, ${getTransBackgroundColor(
              `#${partnerCafe.darkBrandColour}`,
              0.3
            )},#${partnerCafe.darkBrandColour})`,
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col pt-4 pl-4">
              <div className="font-medium text-base">
                {partnerCafe.shopName}
              </div>
              <div className="text-[10px] font-light text-start flex items-center justify-start gap-x-1">
                <Icon
                  icon="hugeicons:location-01"
                  height={"10px"}
                  width="10px"
                />
                {partnerCafe.address?.postCode}
              </div>
            </div>

            <img
              width={1000}
              height={1000}
              src={partnerCafe.logo}
              alt={partnerCafe.shopName + " logo"}
              className="w-10 h-10"
              onLoad={() => {
                setImagesLoaded({ ...imagesLoaded, logo: true });
              }}
            />
          </div>
          <div className="flex items-center justify-end">
            <Button
              variant="contained"
              // color="secondary"
              sx={{
                fontWeight: "400",
                fontSize: "10px",
                paddingX: "12px",
                opacity: 100,
                color: secondary.contrastText,
                backgroundColor: `#${partnerCafe.lightBrandColour}`,

                "&:hover": {
                  backgroundColor: getHoverColor(
                    `#${partnerCafe?.lightBrandColour}`
                  ),
                },
              }}
              disableElevation
              onClick={() => {
                router.push(
                  partnerCafe.shopName.replaceAll(" ", "-") +
                    "-" +
                    partnerCafe._id
                );
              }}
            >
              View Offers
            </Button>
          </div>
        </div>
      </button>
    </div>
  );
}
