"use client";
import LoadingTopbar from "@/components/progressBar/loadingTopBar";
import { useAuthStore } from "@/stores/auth-store";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const ShopHomeProviders: React.FC<Props> = ({ children }) => {
  const { session, updateSession } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const token = Cookies.get('token')

  useEffect(() => {
    if (!session && !token) {
      router.push("/store-login");
      setLoading(false);
    } else if (token && !session) {
      //send to endpoint that checks if token is valid and sends back shopId and email
    }
  }, [session]);

  // if (loading) {
  //   return <LoadingTopbar />;
  // } else {
  //   return <Suspense fallback={<LoadingTopbar />}>{children}</Suspense>;
  // }

  return <Suspense fallback={<LoadingTopbar />}>{children}</Suspense>;
};

export default ShopHomeProviders;
