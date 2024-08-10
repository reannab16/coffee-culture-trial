"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShopResponse } from "@/components/partnerCafes/partnerCafes";
import { shopType, useForCustomersStore } from "@/stores/for-customer-store";
import PackageBlock from "@/components/shopPages/packageBlock";
import { useQuery } from "react-query";
import { base } from "@/api/endpoints";

export default function ShopPage({ params }: { params: { shopName: string } }) {
  const decodedShopName = decodeURIComponent(params.shopName);
  const [foundShop, setFoundShop] = useState<shopType | null>();

  const {
    data: partnerCafes,
    error,
    isLoading,
  } = useQuery<shopType[], Error>(
    ["partnerCafes"],
    async (): Promise<shopType[]> => {
      const response = await base.get<ShopResponse>("/trial/shop");
      console.log(response.data);
      if (partnerCafes) {
        setFoundShop(
          partnerCafes.find((partnerCafe) => {
            return (
              partnerCafe.shopName.replaceAll(" ", "-") +
                "-" +
                partnerCafe._id ==
              decodedShopName
            );
          })
        );
      }

      return response.data.data;
    }
  );

  const { updateShopSelected } = useForCustomersStore();

  useEffect(() => {
    if (foundShop) {
      updateShopSelected(foundShop);
    }
  }, [foundShop]);

  return (
    <div className="flex items-start justify-center mb-10">
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-60px)] items-center justify-start md:justify-center md:items-start pt-[72px]  container gap-x-10 gap-y-8">
        {/* {foundShop.id} */}
        <div className="flex flex-col items-center justify-start">
          <img
            src={foundShop?.featureImage}
            alt=""
            className="w-full h-auto max-w-[600px]"
          />
          <div className="z-10 -mt-8 md:-mt-12 w-full px-8 flex flex-col items-center justify-start gap-y-8">
            {foundShop && (
              <PackageBlock
                isGift={false}
                packageDetails={foundShop?.prepaidCardPackage}
              />
            )}
            {foundShop && (
              <PackageBlock
                isGift={true}
                packageDetails={foundShop?.giftCardPackage}
              />
            )}
          </div>
        </div>
        <div className="flex-col gap-y-5 flex justify-start items-start max-w-[500px] md:px-0 px-8">
          <div className="text-lg">Gift Card FAQs</div>
          <div className="text-xs">
            <span className="font-semibold">
              When will my recipient get it?{" "}
            </span>
            We will provide a link for you to send to the recipient, containing
            a digital card with your special message!
          </div>
          <div className="text-xs">
            <span className="font-semibold">
              How does my recipient redeem it?{" "}
            </span>
            Upon following the link, they will be prompted to enter their email
            and will receive a qr code to scan in store to claim free drinks.{" "}
            <br /> The qr is valid until all drinks have been redeemed.
          </div>
          <div className="text-xs">
            <span className="font-semibold">Further info? </span>
            Please contact info@coffee-culture.uk
          </div>
          {foundShop && (
            <div className="flex flex-col gap-y-5 mt-4">
              <div className="text-lg">About {foundShop.shopName}</div>
              {foundShop.address && (
                <div className="text-xs">
                  <span className="font-semibold">Address: </span>
                  {foundShop.address + ", " + foundShop.postcode}
                </div>
              )}
              {foundShop.phone && (
                <div className="text-xs">
                  <span className="font-semibold">Phone: </span>
                  {foundShop.phone}
                </div>
              )}
              {foundShop.about && (
                <div className="text-xs">
                  <span className="font-semibold">About our café: </span>
                  {foundShop.about}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
