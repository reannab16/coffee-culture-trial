import LoadingTopbar from "@/components/progressBar/loadingTopBar";
import { primary } from "@/themes/customs/palette";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { useUpdateShopInfoMutation } from "../hooks/useUpdateShopInfoMutation";

type Props = {
  open: boolean;
  handleClose: () => void;
  lightBrandColour?: string;
  darkBrandColour?: string;
};

export default function UpdateShopBrandColorsDialog({
  lightBrandColour,
  darkBrandColour,
  open,
  handleClose,
}: Props) {
  const [errorState, setErrorState] = useState<{
    [key: string]: string | undefined;
  }>({});
  const [lightColor, setLightColor] = useState(lightBrandColour ?? "");
  const [darkColor, setDarkColor] = useState(darkBrandColour ?? "");

  const updateColorsMutation = useUpdateShopInfoMutation({
    setErrorState,
    handleClose,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name: fieldName } = event.target;

    fieldName === "darkColor" ? setDarkColor(value) : setLightColor(value);
  };

  const handleSubmit = () => {
    updateColorsMutation.mutate({
      lightBrandColour: lightColor,
      darkBrandColour: darkColor,
    });
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
            Update <span className="font-normal italic">Brand colors</span>
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
          <div>
            <label className="block mb-2">Light Brand Color:</label>
            <input
              className="h-11 w-44 cursor-pointer border-0 bg-transparent p-0"
              name="lightColor"
              type="color"
              value={lightColor}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block mb-2">Dark Brand Color:</label>
            <input
              className="h-11 w-44 cursor-pointer border-0 bg-transparent p-0"
              name="darkColor"
              type="color"
              value={darkColor}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button
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
            Update Colors
          </Button>
        </div>
      </DialogContent>
      {updateColorsMutation.isLoading && <LoadingTopbar />}
    </Dialog>
  );
}
