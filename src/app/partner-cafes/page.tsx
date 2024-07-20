import PartnerCafes from "@/components/partnerCafes/partnerCafes";
import LoadingTopbar from "@/components/progressBar/loadingTopBar";
import React, { Suspense } from "react";

export default function Partner() {
  return (
    <Suspense fallback={<LoadingTopbar />}>
    <div className="w-full h-full flex items-center justify-center">
    <PartnerCafes/>
    </div>
    </Suspense>
  );
}
