"use client";
import { base } from "@/api/endpoints";
import { PrepaidCardResponse } from "@/app/success/page";
import { shopType } from "@/stores/for-customer-store";
import React from "react";
import { useMutation } from "react-query";
import { AddToGoogleWallet } from "../icons/icons";

export enum Platform {
  Apple = "apple",
  Google = "google",
}

export default function AddToWalletButton({
  isGift,
  card,
  shop,
  platform,
}: {
  shop: shopType;
  card?: PrepaidCardResponse;
  isGift: boolean;
  platform: Platform;
}) {
  const handleAddGoogleWallet = () => {
    handleAddWalletMutation.mutate({
      type: isGift ? "giftCard" : "prepaidCard",
      cardId: card?.cardId,
      platform: Platform.Google,
      shopId: shop._id,
    });
  };

  const handleAddAppleWallet = () => {
    handleAddWalletMutation.mutate({
      type: isGift ? "giftCard" : "prepaidCard",
      cardId: card?.cardId,
      platform: Platform.Apple,
      shopId: shop._id,
    });
  };

  const handleAddWalletMutation = useMutation({
    mutationFn: async (values: {
      type?: string;
      cardId?: string;
      shopId?: string;
      platform: Platform;
    }) => {
      // return Endpoints.registerShopUser(values);
      try {
        const response = await base.post(`/trial/card/generate-pass`, values);
        if (response.status >= 200 && response.status < 300) {
          const session = await response.data;
          return session;
        } else {
          throw new Error(
            response.data.message || "add to google wallet failed"
          );
        }
      } catch (error: any) {
        if (error.response) {
          console.error("Add to google wallet failed:", error);
          // return error.response.data;
          throw new Error(
            error.response.data.message || "Add to google wallet failed"
          );
        } else {
          // return error;
          console.error("add to google wallet failed:", error);
          throw new Error(error);
        }
      }
    },
    onSuccess: async (data) => {
      if (platform == Platform.Google) {
        const htmlSnippet = data;
        // Parse the HTML snippet to extract the saveUrl
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlSnippet;

        // Extract the href from the <a> tag
        const anchorTag = tempDiv.querySelector("a");
        const saveUrl = anchorTag?.getAttribute("href");
        console.log(saveUrl);

        // If the URL is found, redirect the user to Google Wallet
        if (saveUrl) {
          window.location.href = saveUrl;
        } else {
          alert("Failed to retrieve the Google Wallet pass URL.");
        }
      }
      if (platform == Platform.Apple) {
        
      }
    },
    onError: (error: any) => {
      //   toast.error("Failed to register user");
      console.log(error);
    },
  });

  return (
    <>
      {platform == Platform.Google && (
        <button className="max-w-[45%]" onClick={handleAddGoogleWallet}>
          <AddToGoogleWallet className="w-full" />
        </button>
      )}
      {platform == Platform.Apple && (
        <button className="max-w-[45%]" onClick={handleAddAppleWallet}>
          <img src="/add-apple-wallet" className="w-full" />
        </button>
      )}
    </>
  );
}
