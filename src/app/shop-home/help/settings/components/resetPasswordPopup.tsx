import { base } from "@/api/endpoints";
import LoadingTopbar from "@/components/progressBar/loadingTopBar";
import { primary } from "@/themes/customs/palette";
import { createErrorObject } from "@/utils/createErrorObject";
import { Dialog, DialogTitle, IconButton, DialogContent, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import CloseIcon from "@mui/icons-material/Close";
import { z } from "zod";

export default function ChangePasswordDialog({open, handleClose}: {open: boolean, handleClose: () => void}) {
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
                No worries, we'll send you reset instructions.
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