import React from "react";
import LoadingTopbar from "../progressBar/loadingTopBar";
import { Skeleton } from "@mui/material";

export default function PartnerCafePageSkeleton() {
    return(
        <div className="flex flex-col min-h-[calc(100vh-60px)] items-center justify-start container py-[72px] px-8">
        <LoadingTopbar />
        <div className="text-center flex flex-col items-center justify-start text-2xl py-8">
          <Skeleton variant="text" width={220} height={32} />
          <Skeleton variant="text" width={180} height={32} />
        </div>
        <div className="flex items-start justify-center gap-y-5 flex-wrap w-full gap-x-5">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="h-32 w-full min-w-60 rounded-xl max-w-80 relative"
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height={128}
                sx={{
                  borderRadius: "8px", 
                }}
              />
            </div>
          ))}
        </div>
      </div>
    )
}