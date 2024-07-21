import { packageType } from "@/stores/for-customer-store";
import React from "react";
import { Button } from "@mui/material";

export default function PackageBlock({
  isGift,
  packageDetails,
}: {
  isGift: boolean;
  packageDetails: packageType;
}) {
  return (
    <div className="border-solid border-2 border-[var(--green)] flex flex-col items-center justify-center bg-[var(--backgroundColour)] rounded-xl">
      <div className="bg-[var(--green20)] flex items-stretch justify-center h-auto">
        <div className="flex flex-col items-center justify-center text-center border-r-2 border-r-solid border-r-[var(--green)] p-5">
          <div className="text-3xl font-medium -mb-[3px] ">
            £{packageDetails.price}
          </div>
          {isGift ? (
            <div className="text-xs text-nowrap">
              <span className="font-medium">Gift a friend</span>
              <br />
              <span>{packageDetails.drinksAllowance} drinks</span>
            </div>
          ) : (
            <div className="text-xs text-nowrap">
              for {packageDetails.drinksAllowance} drinks
            </div>
          )}
        </div>
        <div className="px-3 py-5 ">
          <ul className="text-xs flex flex-col gap-y-2">
            <li>{packageDetails.drinksIncluded && `Valid drinks: ${packageDetails.drinksIncluded.join()}`}</li>
            <li>
              {isGift
                ? "Send a personal note to your fellow coffee lover"
                : "Receive QR code via email, scan at checkout to claim drink"}
            </li>
            <li>{isGift
                ? "Valid for one year from date of purchase"
                : "Valid until all drinks claimed"}</li>
          </ul>
        </div>
        <div
          className="py-3 bg-[var(--green50)] px-3 text-center z-10 text-xs font-light italic"
          style={{ writingMode: "vertical-lr" }}
        >
          {isGift ? "gift card" : "save 20%"}
        </div>
      </div>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          fontWeight: "400",
          fontSize: "12px",
          width: "100%",
          //   paddingX: "24px",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,

          "&:hover": {
            backgroundColor: "#AFAF81",
          },
        }}
        disableElevation
        // onClick={() => {
        //   router.push("/partner-cafes");
        // }}
      >
        purchase
      </Button>
    </div>
  );
}
