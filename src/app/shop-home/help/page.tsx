"use client";
import { base } from "@/api/endpoints";
import {
  CoffeeCup,
  EditUser,
  File,
  Settings,
  Star,
  UserAccount,
} from "@/components/icons/icons";
import LoadingTopbar from "@/components/progressBar/loadingTopBar";
import { useAuthStore } from "@/stores/auth-store";
import { shopType } from "@/stores/for-customer-store";
import { getHoverColor, getMixColor, getTransBackgroundColor } from "@/utils/colourUtils";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";

export default function Help() {
  const { session } = useAuthStore();
  const router = useRouter();

  const fetchShopDetails = async (shopId: string): Promise<shopType> => {
    const response = await base.get(`/trial/shop/${shopId}`);
    return response.data.data;
  };

  const {
    data: fetchedShop,
    error: shopError,
    isLoading: isShopLoading,
  } = useQuery(
    ["shopDetails", session?.shopId],
    () =>
      session ? fetchShopDetails(session?.shopId) : Promise.reject("No shopId"),
    {
      enabled: !!session?.shopId,
    }
  );

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
            {helpList.map((helper, index) => {
              return (
                <Button
                  className="w-full flex gap-x-2 justify-start"
                  key={index}
                  onClick={()=>{
                    router.push(helper.link)
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
                      index == helpList.length - 1
                        ? "0 0 8px 8px"
                        : index == 0
                        ? "8px 8px 0 0"
                        : "0 0 0 0",
                    borderBottom: index == helpList.length - 1 ? 0 : 1,
                    borderColor: getMixColor(
                        `#${fetchedShop?.lightBrandColour}`, "#2f211a", 30
                      ),
      
                    "&:hover": {
                      backgroundColor: getHoverColor(
                        `#${fetchedShop?.lightBrandColour}`
                      ),
                    },
                  }}
                  
                >
                  {helper.icon({ className: "w-5 h-5" })}
                  {helper.name}
                </Button>
              );
            })}
          </div>
          <div className="flex flex-col items-center justify-start rounded-xl w-full">
            {rate.map((helper, index) => {
              return (
                <Button
                  className="w-full flex gap-x-2 justify-start"
                  onClick={()=>{
                    router.push(helper.link)
                  }}
                  key={index}
                  style={{
                    
                  }}
                  sx={{
                    fontWeight: "400",
                    fontSize: "12px",
                    paddingX: "16px",
                    paddingY: "12px",
                    width: 100,
                    // height: "44px",
                    color: `#${fetchedShop?.lightBrandColour}`,
                    backgroundColor: `#${fetchedShop?.lightBrandColour}`,
                    typography: "shopButtons",
                    textAlign: "start",
                    borderRadius:
                      index == rate.length - 1
                        ? "0 0 8px 8px"
                        : index == 0
                        ? "8px 8px 0 0"
                        : "0 0 0 0",
                    borderBottom: index == rate.length - 1 ? 0 : 1,
                    borderColor: getMixColor(
                        `#${fetchedShop?.lightBrandColour}`, "#2f211a", 30
                      ),
      
                    "&:hover": {
                      backgroundColor: getHoverColor(
                        `#${fetchedShop?.lightBrandColour}`
                      ),
                    },
                  }}
                  
                >
                  {helper.icon({ className: "w-5 h-5" })}
                  {helper.name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const helpList = [
  {
    name: "Settings",
    link: "/shop-home/help/settings",
    icon: ({ className }: { className: string }) => {
      return <Settings className={className} />;
    },
  },
  {
    name: "Update Café Information",
    link: "/shop-home/help/cafe-info",
    icon: ({ className }: { className: string }) => {
      return <CoffeeCup className={className} />;
    },
  },
  {
    name: "Customise Cards",
    link: "/shop-home/help/customise-cards",
    icon: ({ className }: { className: string }) => {
      return <UserAccount className={className} />;
    },
  },
  {
    name: "Add User",
    link: "/shop-home/help/add-user",
    icon: ({ className }: { className: string }) => {
      return <EditUser className={className} />;
    },
  },
];

const rate = [
  {
    name: "Submit Feedback",
    link: "/shop-home/help/submit-feedback",
    icon: ({ className }: { className: string }) => {
      return <File className={className} />;
    },
  },
  {
    name: "Rate and Review",
    link: "",
    icon: ({ className }: { className: string }) => {
      return <Star className={className} />;
    },
  },
];
