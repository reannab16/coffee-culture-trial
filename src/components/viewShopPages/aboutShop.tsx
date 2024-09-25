import { shopType } from "@/stores/for-customer-store";
import React from "react";

export default function AboutShop({shop}:{shop:shopType}) {
    return(
        <div className="flex items-start justify-between">
            <div className="flex flex-col gap-y-5 mt-4 justify-start items-start">
              <div className="text-lg">About {shop.shopName}</div>
              {shop.address && (
                <div className="text-xs">
                  <span className="font-semibold">Address: <br /> </span>
                  {shop.address.addressLine1 && <span>{shop.address.addressLine1}, </span>} 
                  {shop.address.addressLine2 && <span>{shop.address.addressLine2}, </span>} 
                  {shop.address.state && <span>{shop.address.state}, </span>} 
                  {shop.address.city && <span>{shop.address.city}, </span>} 
                  {shop.address.postcode && <span>{shop.address.postcode} </span>}
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

        </div>
    )
}