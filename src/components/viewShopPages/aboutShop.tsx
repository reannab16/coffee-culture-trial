import { shopType } from "@/stores/for-customer-store";
import React from "react";

export default function AboutShop({ shop }: { shop: shopType }) {
  return (
    <div className="flex flex-col items-start justify-start max-w-[500px] ">
      <div className="text-lg mb-5">About {shop.shopName}</div>
      <div className="flex items-start justify-between gap-x-5">
        <div className="flex flex-col gap-y-5 justify-start items-start max-w-1/2">
          {shop.address && (
            <div className="text-xs">
              <span className="font-semibold">
                Address: <br />{" "}
              </span>
              {shop.address.addressLine1 && (
                <span>{shop.address.addressLine1}, </span>
              )}
              {shop.address.addressLine2 && (
                <span>{shop.address.addressLine2}, </span>
              )}
              {shop.address.state && <span>{shop.address.state}, </span>}
              {shop.address.city && <span>{shop.address.city}, </span>}
              {shop.address.postCode && <span>{shop.address.postCode} </span>}
            </div>
          )}
          {shop.phone && (
            <div className="text-xs">
              <span className="font-semibold">Phone: </span>
              {shop.phone}
            </div>
          )}
          {shop.about && (
            <div className="text-xs">
              <span className="font-semibold">About our café: </span>
              {shop.about}
            </div>
          )}
        </div>
        {/*  */}
      </div>
      
    </div>
  );
}
