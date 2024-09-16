"use client";
import Endpoints, { base } from "@/api/endpoints";
import { useAuthStore } from "@/stores/auth-store";
import { Google } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import Cookies from "js-cookie";
import { createErrorObject } from "@/utils/createErrorObject";

export default function ResetPassword({ params }: { params: { resetToken: string } }) {
  const router = useRouter();
  const [password, setPassword] = useState({
    password: "",
    retyped: "",
  });
  const [errorState, setErrorState] = useState<{
    [key: string]: string | undefined;
  }>({});
  const { session, updateSession } = useAuthStore();

  const oneHourFromNow = new Date();
  oneHourFromNow.setTime(oneHourFromNow.getTime() + 50 * 60 * 1000);

  const resetPasswordMutation = useMutation({
    mutationFn: async (values: {password: string }) => {
      const response = await base.post(`/trial/shop/reset-password/${params.resetToken}`, {password: values.password});
            return response;
    },
    onSuccess: (response: any) => {
      console.log(response);
      toast.success("Successfully changed password");
      router.push("/store-login");
      
    },
    onError: (error: any) => {
      toast.error(`Reset failed, ${error.response.data.message}`);

      if (error.errors) {
        const newErrorState = createErrorObject(error.errors);
        setErrorState(newErrorState);
      }
    },
  });

  const handleSubmit = async () => {
    // e.preventDefault();
    // loginShopMutation.mutate({ email: user.email, password: user.password });
    resetPasswordMutation.mutate({password: password.password})
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-[var(--darkBrown)]">
      <div className="flex flex-col gap-5 p-10 bg-[var(--background)] items-center justify-center container max-w-[500px]">
        <div className="flex flex-col items-center justify-start text-center gap-y-2">
          <div className="text-2xl font-medium">
            Reset <span className="font-normal italic">Password</span>
          </div>
          <div className="text-xs font-normal">
            Your password must be at least 8 characters long
          </div>
        </div>

        <TextField
          error={errorState.password ? true : false}
          helperText={errorState.password}
          id="outlined-required"
          label="Enter New Password"
          autoComplete="password"
          type="password"
          variant="outlined"
          sx={{ fontSize: "12px", fontFamily: "Inter" }}
          fullWidth
          inputProps={{ style: { fontSize: 12 } }}
          InputLabelProps={{ style: { fontSize: 12 } }}
          value={password.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword({ ...password, password: e.target.value });
            if (e.target.value.length >=8) {
              setErrorState({...errorState, password: undefined})
            }
          }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>)=>{
            if (e.target.value.length <8 ) {
              setErrorState({...errorState, password: "Password must be at least 8 characters"})
            } else {
              setErrorState({...errorState, password: undefined})
            }
          }}
        />
        <TextField
          error={errorState.retyped ? true : false}
          helperText={errorState.retyped}
          id="outlined-required"
          label="Retype New Password"
          autoComplete="password"
          type="password"
          variant="outlined"
          sx={{ fontSize: "12px", fontFamily: "Inter" }}
          fullWidth
          inputProps={{ style: { fontSize: 12 } }}
          InputLabelProps={{ style: { fontSize: 12 } }}
          value={password.retyped}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword({ ...password, retyped: e.target.value });
            if (e.target.value !== password.password) {
              setErrorState({...errorState, retyped: "Passwords must match"})
            } else {
              setErrorState({...errorState, retyped: undefined})
            }
          }}
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
          // onClick={() => {
          //   router.push(
          //     pathname + "?" + createQueryString("register", "true")
          //   );
          // }}
          fullWidth
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
