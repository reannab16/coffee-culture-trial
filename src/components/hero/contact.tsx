import { primary } from "@/themes/customs/palette";
import { Button, TextField } from "@mui/material";
import React from "react";

export default function Contact() {
  return (
    <div
      className="flex flex-col items-center justify-center w-full mt-20"
      id="contact"
    >
      <div className=" flex flex-col gap-y-5 rounded-xl  md:w-96 items-center justify-start">
        <div className="text-2xl font-semibold">
          <span className="italic font-normal">Contact </span>Us
        </div>
        <form
          action="https://formsubmit.co/info@coffee-culture.uk"
          method="POST"
          className="flex flex-col gap-y-5 items-center justify-start w-72 p-5"
        >
          <TextField
            //   error={errorState.email ? true : false}
            //   helperText={errorState.email}
            id="outlined-required"
            label="Name"
            name="name"
            autoComplete="name"
            type="name"
            variant="outlined"
            //   value={user.email}
            //   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //     setUser({ ...user, email: e.target.value });
            //   }}
            sx={{
              fontSize: "12px",
              fontFamily: "Inter",
            }}
            fullWidth
            inputProps={{
              style: { fontSize: 12 },
            }}
            InputLabelProps={{
              style: { fontSize: 12, display: "flex", alignItems: "center" },
            }}
            color="primary"
          />
          <TextField
            //   error={errorState.email ? true : false}
            //   helperText={errorState.email}
            id="outlined-required"
            label="Email"
            name="email"
            autoComplete="email"
            type="email"
            variant="outlined"
            //   value={user.email}
            //   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //     setUser({ ...user, email: e.target.value });
            //   }}
            sx={{
              fontSize: "12px",
              fontFamily: "Inter",
            }}
            fullWidth
            inputProps={{
              style: { fontSize: 12 },
            }}
            InputLabelProps={{
              style: { fontSize: 12, display: "flex", alignItems: "center" },
            }}
            color="primary"
          />
          <TextField
            id="outlined-multiline-required"
            label="Message"
            variant="outlined"
            multiline
            name="message"
            // value={giftCardDetails.message.long}
            sx={{
              fontSize: "12px",
              fontFamily: "Inter",
            }}
            fullWidth
            inputProps={{
              style: { fontSize: 12 },
            }}
            InputLabelProps={{
              style: { fontSize: 12, display: "flex", alignItems: "center" },
            }}
            color="primary"
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{
              fontWeight: "400",
              fontSize: "12px",
              paddingX: "24px",
              height: "44px",
              typography: "shopButtons",

              "&:hover": {
                backgroundColor: "#AFAF81",
              },
            }}
            disableElevation
            fullWidth
            type="submit"
            //   onClick={()=>{}}
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
