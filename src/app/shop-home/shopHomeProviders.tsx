"use client";
import { base } from "@/api/endpoints";
import { PageType } from "@/components/navigation/navBar";
import LoadingTopbar from "@/components/progressBar/loadingTopBar";
import { useNavContext } from "@/contexts/nav";
import { useAuthStore } from "@/stores/auth-store";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

interface Props {
  children: React.ReactNode;
}

const ShopHomeProviders: React.FC<Props> = ({ children }) => {
  const { session, updateSession } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  const { setWhichPageType } = useNavContext();
  const pathname = usePathname();

  useEffect(() => {
    setWhichPageType(PageType.ShopHome);
  }, [[pathname]]);

  // useEffect(() => {
  //   if (!session && !refreshToken) {
  //     router.push("/store-login");
  //     setLoading(false);
  //   } else if (token && !session) {
  //     //send to endpoint that checks if token is valid and sends back shopId and email
  //   }
  // }, [session]);

  const oneHourFromNow = new Date();
  oneHourFromNow.setTime(oneHourFromNow.getTime() + 50 * 60 * 1000);

  useEffect(() => {
    if (!session) {
      if (accessToken) {
        accessMutation.mutate({ accessToken });
      } else if (!accessToken && refreshToken) {
        refreshMutation.mutate({ refreshToken });
      } else if (!accessToken && !refreshToken) {
        router.push("/store-login");
      }
    }
  }, [session, refreshToken, accessToken]);

  const refreshMutation = useMutation({
    mutationFn: async (values: { refreshToken: string }) => {
      const response = await base.post(`/trial/shop/refresh-token`, values);
      return response.data.data;
    },
    onSuccess: (response: any) => {
      Cookies.set("accessToken", response.accessToken, {
        expires: oneHourFromNow,
      });
      Cookies.set("refreshToken", response.refreshToken, { expires: 7 });
      updateSession({
        accessToken: response.accessToken,
        signedIn: false,
        shopId: session?.shopId || "",
        email: session?.email || "",
        accessType: session?.accessType || "",
      });
    },
    onError: (error: any) => {
      toast.error(`Error- session expired, ${error.message}`);
      router.push("/store-login");
    },
  });

  const accessMutation = useMutation({
    mutationFn: async (values: { accessToken: string }) => {
      const config = {
        headers: {
          "x-auth-token": accessToken,
        },
      };
      const response = await base.get(`/trial/shop/auth/shop-details`, config);
      return response.data.data;
    },
    onSuccess: (response: any) => {
      updateSession({
        accessToken: session?.accessToken,
        signedIn: true,
        shopId: response.shopId,
        email: response.email,
        accessType: response.accessType,
      });
    },
    onError: (error: any) => {
      toast.error(`Error- session expired, ${error.message}`);
      router.push("/store-login");
    },
  });

  // if (loading) {
  //   return <LoadingTopbar />;
  // } else {
  //   return <Suspense fallback={<LoadingTopbar />}>{children}</Suspense>;
  // }

  return <Suspense fallback={<LoadingTopbar />}>{children}</Suspense>;
};

export default ShopHomeProviders;
