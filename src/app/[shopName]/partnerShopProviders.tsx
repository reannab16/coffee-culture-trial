"use client";
import { PageType } from "@/components/navigation/navBar";
import LoadingTopbar from "@/components/progressBar/loadingTopBar";
import { useNavContext } from "@/contexts/nav";
import { usePathname } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";


interface Props {
  children: React.ReactNode;
}

const PartnerShopProviders: React.FC<Props> = ({ children }) => {
  const { setPartnerShopPage, setWhichPageType } = useNavContext();
  const pathname = usePathname();

  useEffect(() => {
    setPartnerShopPage(true);
    setWhichPageType(PageType.Store);
  }, [pathname]);

  const [loading, setLoading] = useState(true);

  return <Suspense fallback={<LoadingTopbar />}>{children}</Suspense>;
};

export default PartnerShopProviders;
