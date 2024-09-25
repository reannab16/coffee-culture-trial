"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShopResponse } from "@/components/partnerCafes/partnerCafes";
import { shopType, useForCustomersStore } from "@/stores/for-customer-store";
import PackageBlock from "@/components/viewShopPages/packageBlock";
import { useQuery } from "react-query";
import { base } from "@/api/endpoints";
import CheckoutFAQ from "@/components/FAQ/customerFAQ/checkoutPageFAQ/checkoutFAQ";
import AboutShop from "@/components/viewShopPages/aboutShop";

export default function ShopPage({ params }: { params: { shopName: string } }) {
  const decodedShopName = decodeURIComponent(params.shopName);
  // const [foundShop, setFoundShop] = useState<shopType | null>();

  const {
    data: partnerCafes,
    error,
    isLoading,
  } = useQuery<shopType[], Error>(
    ["partnerCafes"],
    async (): Promise<shopType[]> => {
      const response = await base.get<ShopResponse>("/trial/shop");
      return response.data.data;
    }
  );

  const { updateShopSelected, shop } = useForCustomersStore();

  useEffect(() => {
    if (partnerCafes) {
      const foundShop = partnerCafes.find((partnerCafe) => {
        return (
          partnerCafe.shopName.replaceAll(" ", "-") + "-" + partnerCafe._id ==
          decodedShopName
        );
      });
      if (foundShop) {
        updateShopSelected(foundShop);
      }
    }
  }, [partnerCafes]);

  return (
    <div className="flex items-start justify-center mb-10 w-full">
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-60px)] w-full items-center justify-start md:justify-center md:items-start pt-[72px]  container gap-x-10 gap-y-8">
        {/* {foundShop.id} */}
        <div className="flex flex-col items-center justify-start">
          <img
            src={shop?.featureImage}
            alt=""
            className="w-full h-[133px] max-w-[600px]"
          />
          <div className="z-10 -mt-8 md:-mt-12 w-full px-8 flex flex-col items-center justify-start gap-y-8">
            {shop &&
              shop?.prepaidCardPackages?.length > 0 &&
              shop?.prepaidCardPackages?.map((prepaidCardPackage) => {
                return (
                  <PackageBlock
                    key={prepaidCardPackage._id}
                    isGift={false}
                    packageDetails={prepaidCardPackage}
                    lightBrandColour={shop.lightBrandColour}
                    darkBrandColour={shop.darkBrandColour}
                  />
                );
              })}
            {shop &&
              shop?.giftCardPackages?.length > 0 &&
              shop?.giftCardPackages?.map((giftCardPackage) => {
                return (
                  <PackageBlock
                    key={giftCardPackage._id}
                    isGift={true}
                    packageDetails={giftCardPackage}
                    lightBrandColour={shop.lightBrandColour}
                    darkBrandColour={shop.darkBrandColour}
                  />
                );
              })}
          </div>
        </div>
        <div className="flex-col gap-y-5 flex justify-start items-start max-w-[500px] w-full md:px-0 px-8 text-start">
          {/* <div className="text-lg">Gift Card FAQs</div>
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
          </div> */}
          {shop && <AboutShop shop={shop}/>}
          {shop &&
              shop?.prepaidCardPackages?.length > 0 && <CheckoutFAQ type="prepaidCard" colour={shop.lightBrandColour}/>}
              {shop &&
              shop?.giftCardPackages?.length > 0 && <CheckoutFAQ type="giftCard" colour={shop.lightBrandColour}/>}

        </div>
      </div>
    </div>
  );
}
