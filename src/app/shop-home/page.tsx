"use client"
import { useAuthStore } from "@/stores/auth-store";
import React from "react";

export default function ShopHome() {
    const {session} = useAuthStore();

    return(
        <div className="pt-[72px]">{session?.shopId}</div>
    )
}