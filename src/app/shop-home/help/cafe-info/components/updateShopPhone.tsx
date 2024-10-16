import LoadingTopbar from "@/components/progressBar/loadingTopBar";
import { primary } from "@/themes/customs/palette";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { z } from "zod";
import { useUpdateShopInfoMutation } from "../hooks/useUpdateShopInfoMutation";

type Props = { open: boolean; handleClose: () => void; phone?: string };

export default function UpdateShopPhoneDialog({
  phone: phoneNumber,
  open,
  handleClose,
}: Props) {
  const [errorState, setErrorState] = useState<{
    [key: string]: string | undefined;
  }>({});
  const [phone, setPhone] = useState(phoneNumber ?? "");

  const resetMutation = useUpdateShopInfoMutation({
    setErrorState,
    handleClose,
  });

  const handleSubmit = async () => {
    // e.preventDefault();
    resetMutation.mutate({ phone: phone });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // Define a field-specific schema based on the field name
    const fieldSchema = z.string().email();

    if (fieldSchema) {
      const result = fieldSchema.safeParse(value);

      if (!result.success) {
        // setErrorState({...errorState, email: result.error.errors.toString()})
        console.log(result.error.errors);
      }
    }
  };

  {
    resetMutation.isLoading && <LoadingTopbar />;
  }

  return (
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
      <DialogTitle sx={{ padding: "0px", paddingBottom: "24px" }}>
        <div className=" flex flex-col">
          <div className="font-semibold">
            Update <span className="font-normal italic">Shop phone</span>
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
            error={errorState.phone ? true : false}
            helperText={errorState.phone}
            id="outlined-required"
            label="Enter your shop phone"
            autoComplete="string"
            type="text"
            variant="outlined"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPhone(e.target.value);
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
  );
}
