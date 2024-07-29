"use client";
import LoadingTopbar from "@/components/progressBar/loadingTopBar";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const ShopHomeProviders: React.FC<Props> = ({ children }) => {
  const { session, updateSession } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push("/store-login");
      setLoading(false);
    }
  }, [session]);

  if (loading) {
    return <LoadingTopbar />;
  } else {
    return <Suspense fallback={<LoadingTopbar />}>{children}</Suspense>;
  }
};

export default ShopHomeProviders;
