"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForCustomersStore } from "@/stores/for-customer-store";
import LoadingTopbar from "@/components/progressBar/loadingTopBar";
import Add from "@/components/addToCart/add";

export default function AddToCart() {
  const searchParams = useSearchParams();
  const selected = searchParams.get("selected");
  const router = useRouter();
  const { shop } = useForCustomersStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (shop !== undefined) {
      setLoading(false);
      if (!selected && shop) {
        router.push(shop.shopName.replaceAll(" ", "-") + "-" + shop.id);
      }
      if (!shop) {
        router.push("/");
      }
    }
  }, [shop, loading]);

  console.log(selected)

  if (loading == true) {
    return <LoadingTopbar />;
  } else {
    return (
      <Suspense fallback={<LoadingTopbar />}>
        <div className="flex items-center justify-center pt-[72px]">
          <Add shop={shop} selected={selected} />
        </div>
      </Suspense>
    );
  }
}
