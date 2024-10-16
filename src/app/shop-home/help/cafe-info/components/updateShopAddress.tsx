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
import { useUpdateShopInfoMutation } from "../hooks/useUpdateShopInfoMutation";

export type Address = {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postCode: string;
};

type Props = { open: boolean; handleClose: () => void;  address?: Address };

export default function UpdateShopAddressDialog({
  address: initialAddress,
  open,
  handleClose,
}: Props) {
  const [errorState, setErrorState] = useState<{ [key: string]: string | undefined }>({});
  const [address, setAddress] = useState<Address>({
    addressLine1: initialAddress?.addressLine1 ?? "",
    addressLine2: initialAddress?.addressLine2 ?? "",
    city: initialAddress?.city ?? "",
    state: initialAddress?.state ?? "",
    postCode: initialAddress?.postCode ?? "",
  });

  const resetMutation = useUpdateShopInfoMutation({
    setErrorState,
    handleClose,
  });

  const handleSubmit = async () => {
    resetMutation.mutate({ address });
  };

  const handleAddressChange = (field: keyof Address) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [field]: event.target.value });
  };

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
        <div className="flex flex-col">
          <div className="font-semibold">
            Update <span className="font-normal italic">Shop Address</span>
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
            label="Address Line 1"
            variant="outlined"
            value={address.addressLine1}
            onChange={handleAddressChange("addressLine1")}
            fullWidth
            sx={{ fontSize: "12px", fontFamily: "Inter" }}
            inputProps={{ style: { fontSize: 12 } }}
            InputLabelProps={{ style: { fontSize: 12 } }}
          />
          <TextField
            label="Address Line 2"
            variant="outlined"
            value={address.addressLine2}
            onChange={handleAddressChange("addressLine2")}
            fullWidth
            sx={{ fontSize: "12px", fontFamily: "Inter" }}
            inputProps={{ style: { fontSize: 12 } }}
            InputLabelProps={{ style: { fontSize: 12 } }}
          />
          <TextField
            label="City"
            variant="outlined"
            value={address.city}
            onChange={handleAddressChange("city")}
            fullWidth
            sx={{ fontSize: "12px", fontFamily: "Inter" }}
            inputProps={{ style: { fontSize: 12 } }}
            InputLabelProps={{ style: { fontSize: 12 } }}
          />
          <TextField
            label="State"
            variant="outlined"
            value={address.state}
            onChange={handleAddressChange("state")}
            fullWidth
            sx={{ fontSize: "12px", fontFamily: "Inter" }}
            inputProps={{ style: { fontSize: 12 } }}
            InputLabelProps={{ style: { fontSize: 12 } }}
          />
          <TextField
            label="Post Code"
            variant="outlined"
            value={address.postCode}
            onChange={handleAddressChange("postCode")}
            fullWidth
            sx={{ fontSize: "12px", fontFamily: "Inter" }}
            inputProps={{ style: { fontSize: 12 } }}
            InputLabelProps={{ style: { fontSize: 12 } }}
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
      {resetMutation.isLoading && <LoadingTopbar />}
    </Dialog>
  );
}
