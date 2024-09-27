import { Skeleton } from "@mui/material";
import React from "react";

export default function ShopPageSkeleton() {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-60px)] w-full items-center justify-start md:justify-center md:items-start pt-[72px]  container gap-x-10 gap-y-8">
      <div className="flex flex-col items-center justify-start w-full max-w-[600px]">
        {/* <Skeleton
          variant="rectangular"
          width="100%"
          height={133}
          sx={{ maxWidth: "600px", width: "100%" }}
        /> */}
        <div className="z-10 -mt-8 md:-mt-12 w-full px-8 flex flex-col items-center justify-start gap-y-8 pt-[133px]">
          {[...Array(2)].map((_, index) => {
            return (
              <div className="w-full flex flex-col gap-y-2 text-end max-w-96 items-center" key={index}>
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={160}
                  sx={{ maxWidth: "24rem" }}
                />
                <div className="flex justify-end w-full">
                  <Skeleton
                    variant="text"
                    width={80}
                    height={16}
                    sx={{ textAlign: "end" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-col gap-y-5 flex justify-start items-start max-w-[500px] w-full md:px-0 px-8 text-start">
        <div className="flex flex-col items-start justify-start max-w-[500px] ">
          <Skeleton
            variant="text"
            width={160}
            height={28}
            sx={{ textAlign: "end", marginBottom: "20px" }}
          />
        </div>
      </div>
    </div>
  );
}
