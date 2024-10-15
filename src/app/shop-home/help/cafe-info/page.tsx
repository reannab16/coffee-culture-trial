"use client";
import {
  ArrowRight,
  HelpCircle,
  Mail,
  PayByCheck,
  SquareUnlock,
} from "@/components/icons/icons";
import LoadingTopbar from "@/components/progressBar/loadingTopBar";
import { useAuthStore } from "@/stores/auth-store";
import { getHoverColor, getMixColor } from "@/utils/colourUtils";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import UpdateShopNameDialog from "./components/updateShopName";
import { useShopDetailsQuery } from "./hooks/useShopDetailsQuery";

export default function CaféInfoPage() {
  const { session } = useAuthStore();
  const router = useRouter();
  const [open, setOpen] = useState("");

  const {
    data: fetchedShop,
    error: shopError,
    isLoading: isShopLoading,
  } = useShopDetailsQuery(session?.shopId);

  const handleClose = () => {
    setOpen("");
  };

  if (isShopLoading) {
    return <LoadingTopbar />;
  } else {
    return (
      <div className="flex items-start justify-center min-h-screen w-screen">
        <div className="container flex flex-col justify-start items-center mt-[72px] p-10 max-w-[500px] gap-y-5">
          <div className="text-2xl font-semibold">
            Help & <span className="font-normal italic">Settings</span>
          </div>
          <div className="flex flex-col items-center justify-start rounded-xl w-full">
            {settingsList.map((setting, index) => {
              return (
                <Button
                  className="w-full flex gap-x-2 justify-between"
                  key={index}
                  onClick={() => {
                    setOpen(setting.value);
                  }}
                  sx={{
                    fontWeight: "400",
                    fontSize: "12px",
                    paddingX: "24px",
                    paddingY: "12px",
                    width: 100,
                    // height: "44px",
                    color: `#${fetchedShop?.lightBrandColour}`,
                    backgroundColor: `#${fetchedShop?.lightBrandColour}`,
                    typography: "shopButtons",
                    textAlign: "start",
                    borderRadius:
                      index == settingsList.length - 1
                        ? "0 0 8px 8px"
                        : index == 0
                        ? "8px 8px 0 0"
                        : "0 0 0 0",
                    borderBottom: index == settingsList.length - 1 ? 0 : 1,
                    borderColor: getMixColor(
                      `#${fetchedShop?.lightBrandColour}`,
                      "#2f211a",
                      30
                    ),

                    "&:hover": {
                      backgroundColor: getHoverColor(
                        `#${fetchedShop?.lightBrandColour}`
                      ),
                    },
                  }}
                >
                  <span className="flex justify-start gap-x-2">
                    {setting.icon({ className: "w-5 h-5" })}
                    {setting.name}
                  </span>
                  <span>
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
        <UpdateShopNameDialog
          shopName={fetchedShop?.shopName}
          open={open === "name"}
          handleClose={handleClose}
        />
      </div>
    );
  }
}

const settingsList = [
  {
    name: "Update shop name",
    value: "name",

    icon: ({ className }: { className: string }) => {
      return <Mail className={className} />;
    },
  },
  {
    name: "Update address",
    value: "address",

    icon: ({ className }: { className: string }) => {
      return <Mail className={className} />;
    },
  },
  {
    name: "Update phone number",
    value: "phoneNumber",

    icon: ({ className }: { className: string }) => {
      return <Mail className={className} />;
    },
  },
  {
    name: "Update about",
    value: "about",

    icon: ({ className }: { className: string }) => {
      return <SquareUnlock className={className} />;
    },
  },
];
