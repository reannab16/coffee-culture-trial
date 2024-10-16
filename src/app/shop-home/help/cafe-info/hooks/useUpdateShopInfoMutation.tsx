import { base } from "@/api/endpoints";
import { createErrorObject } from "@/utils/createErrorObject";
import { SetStateAction } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { Address } from "../components/updateShopAddress";

type ShopInfoPayload = {
  shopName?: string;
  phone?: string;
  about?: string;
  address?: Address;
  openingHours?: string;
  lightBrandColour?: string;
  darkBrandColour?: string;
  featureImage?: string;
  logo?: string;
};

type Props = {
  handleClose: () => void;
  setErrorState: (error: { [key: string]: string | undefined }) => void;
};

export const useUpdateShopInfoMutation = ({
  handleClose,
  setErrorState,
}: Props) => {
  return useMutation({
    mutationFn: async (values: ShopInfoPayload) => {
      const response = await base.patch(`/trial/shop/`, values);
      return response;
    },
    onSuccess: (response: any) => {
      toast.success("sent!");
      handleClose();
    },
    onError: (error: any) => {
      toast.error(`Reset failed, ${error.response.data.message}`);

      if (error.errors) {
        const newErrorState = createErrorObject(error.errors);
        setErrorState(newErrorState);
      }
    },
  });
};
