import { useForCustomersStore } from "@/stores/for-customer-store";
import React from "react";

export default function AddBundle() {
    const {shop} = useForCustomersStore();
    return(
        <div className="container flex flex-col justify-start items-center px-8 ">
            <div className="px-7 py-8 flex justify-between items-center border-2 border-solid border-[var(--green)] bg-[var(--green20)] rounded-[10px] w-full">
                <div className="flex flex-col justify-center items-center">
                    <div className="text-2xl font-medium -mb-[3px]">£{shop?.prepaidCardPackage.price}</div>
                    <div className="text-xs">for {shop?.prepaidCardPackage.drinksAllowance} drinks</div>
                </div>
                <div className="flex items-center justify-center text-xs">added to basket</div>

            </div>
        </div>
    )
}