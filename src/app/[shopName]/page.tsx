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
import LoadingTopbar from "@/components/progressBar/loadingTopBar";
import ShopPageSkeleton from "./skeletons/shopPageSkeleton";

export default function ShopPage({ params }: { params: { shopName: string } }) {
  const decodedShopName = decodeURIComponent(params.shopName);
  // const [foundShop, setFoundShop] = useState<shopType | null>();
  const [imagesLoaded, setImagesLoaded] = useState({
    feature: false,
    bow: false,
  });

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
      console.log(partnerCafes)
      const foundShop = partnerCafes.find((partnerCafe) => {
        return (
          partnerCafe?.shopName?.replaceAll(" ", "-") + "-" + partnerCafe._id ==
          decodedShopName
        );
      });
      if (foundShop) {
        updateShopSelected(foundShop);
      }
    }
  }, [partnerCafes]);

  if (isLoading) {
    return (<div className="w-full flex items-start justify-center mb-10"><LoadingTopbar /><ShopPageSkeleton /></div>);
  } else
    return (
      <div className="flex items-start justify-center mb-10 w-full">
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-60px)] w-full items-center justify-start md:justify-center md:items-start pt-[72px]  container gap-x-10 gap-y-8">
          <div className="flex flex-col items-center justify-start">
            <img
              src={shop?.featureImage}
              alt=""
              className="w-full h-[133px] max-w-[600px]"
              onLoad={() => {
                setImagesLoaded({ ...imagesLoaded, feature: true });
              }}
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
                      setLoaded={() => {
                        setImagesLoaded({ ...imagesLoaded, bow: true });
                      }}
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
                      setLoaded={() => {
                        setImagesLoaded({ ...imagesLoaded, bow: true });
                      }}
                    />
                  );
                })}
            </div>
          </div>
          <div className="flex-col gap-y-5 flex justify-start items-start max-w-[500px] w-full md:px-0 px-8 text-start">
            {shop && <AboutShop shop={shop} />}
            {shop && shop?.prepaidCardPackages?.length > 0 && (
              <CheckoutFAQ type="prepaidCard" colour={shop.lightBrandColour} />
            )}
            {shop && shop?.giftCardPackages?.length > 0 && (
              <CheckoutFAQ type="giftCard" colour={shop.lightBrandColour} />
            )}
          </div>
        </div>
      </div>
    );
}
