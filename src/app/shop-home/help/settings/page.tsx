"use client";
import { base } from "@/api/endpoints";
import {
  ArrowRight,
  Mail,
  SquareUnlock,
} from "@/components/icons/icons";
import LoadingTopbar from "@/components/progressBar/loadingTopBar";
import { useAuthStore } from "@/stores/auth-store";
import { shopType } from "@/stores/for-customer-store";
import { getHoverColor, getMixColor } from "@/utils/colourUtils";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import Dialog from "@mui/material/Dialog";
import { primary } from "@/themes/customs/palette";
import CloseIcon from "@mui/icons-material/Close";
import { z } from "zod";
import toast from "react-hot-toast";
import { createErrorObject } from "@/utils/createErrorObject";

export default function SettingsPage() {
  const { session } = useAuthStore();
  const router = useRouter();
  const [open, setOpen] = useState("");

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    setOpen("");
  };

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
            {settingsList.map((setting, index) => {
              return (
                <Button
                  className="w-full flex gap-x-2 justify-between"
                  key={index}
                  onClick={() => {
                    // router.push(setting.link)
                    if (setting.value == "password") {
                      setOpen("password")
                    }
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
        <ChangePasswordDialog open={open == "password"} handleClose={handleClose}/>
      </div>
    );
  }
}

function ChangePasswordDialog({open, handleClose}: {open: boolean, handleClose: () => void}) {
    const [errorState, setErrorState] = useState<{ [key: string]: string | undefined }>({});
    const [email, setEmail] = useState("");

    const resetMutation = useMutation({
        mutationFn: async (values: { email: string }) => {
            const response = await base.post(`/trial/shop/forgot-password/`, {email: email});
            return response;
        },
        onSuccess: (response: any) => {
          toast.success("sent!")
          handleClose();
        },
        onError: (error: any) => {
          toast.error(`Reset failed, ${error.response.data.message}`);
    
          if (error.errors) {
            const newErrorState = createErrorObject(error.errors)
            setErrorState(newErrorState);
          }
        },
      });
    
      const handleSubmit = async () => {
        // e.preventDefault();
        resetMutation.mutate({ email: email });
      };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { value } = event.target;
      
        // Define a field-specific schema based on the field name
        const fieldSchema = z.string().email()
        
        if (fieldSchema) {
          const result = fieldSchema.safeParse(value);
      
          if (!result.success) {
            // setErrorState({...errorState, email: result.error.errors.toString()})
            console.log(result.error.errors);
          }
        }
      };

      {resetMutation.isLoading && <LoadingTopbar/>}

    return(
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              backgroundColor: primary.background,
              color: primary.main,
              width: "24rem",
              padding: "32px",
            },
          }}
        >
          <DialogTitle 
          sx={{ padding: "0px", paddingBottom: "24px" }}
          >
            <div className=" flex flex-col">
              <div className="font-semibold">
                Reset <span className="font-normal italic">Password?</span>
              </div>
              <div className="text-xs font-normal">
                No worries, we&apos;ll send you reset instructions.
              </div>
            </div>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent sx={{ padding: "0px", paddingTop: "8px" }}>
            <div className="flex flex-col gap-y-5 justify-between items-center">
              <TextField
                error={errorState.email ? true : false}
                helperText={errorState.email}
                id="outlined-required"
                label="Enter your email"
                autoComplete="email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value)
                }}
                onBlur={handleBlur}
                sx={{
                  fontSize: "12px",
                  fontFamily: "Inter",
                }}
                fullWidth
                inputProps={{
                  style: { fontSize: 12 },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                  },
                }}
                color="primary"
              />
              <Button
                type="submit"
                onClick={handleSubmit}
                variant="contained"
                color="secondary"
                sx={{
                  fontWeight: "400",
                  fontSize: "12px",
                  paddingX: "24px",
                  height: "44px",

                  "&:hover": {
                    backgroundColor: "#AFAF81",
                  },
                }}
                disableElevation
                fullWidth
              >
                Continue
              </Button>
            </div>
          </DialogContent>
        </Dialog>
    )
}

const settingsList = [
  //   {
  //     name: "Change email",
  //     value: "email",

  //     icon: ({ className }: { className: string }) => {
  //       return <Mail className={className} />;
  //     },
  //   },
  {
    name: "Change password",
    value: "password",

    icon: ({ className }: { className: string }) => {
      return <SquareUnlock className={className} />;
    },
  }
];
