"use client";
import Endpoints from "@/api/endpoints";
import { useAuthStore } from "@/stores/auth-store";
import { Google } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import Cookies from 'js-cookie';

export default function StoreLogin() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorState, setErrorState] = useState<{ [key: string]: string | undefined }>({});
  const {session, updateSession} = useAuthStore();

  const oneHourFromNow = new Date();
 oneHourFromNow.setTime(oneHourFromNow.getTime() + 50 * 60 * 1000);

  const loginShopMutation = useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      return Endpoints.loginShopUser(values);
    },
    onSuccess: (response: any) => {
      console.log(response.data);
      updateSession({accessToken: response.data.accessToken, email: response.data.email, shopId: response.data.shopId, signedIn: true });
      Cookies.set('accessToken', response.data.accessToken, { expires: oneHourFromNow });
      Cookies.set('refreshToken', response.data.refreshToken, { expires: 7 });

      console.log(session);
      router.push("/shop-home");
    },
    onError: (error: any) => {
      toast.error(`Login failed, ${error.message}`);

      // if (error.errors) {
      //   setErrorState({email: undefined, password: undefined});
      //   console.log(errorState);
      //   error.errors.forEach((error: {field: string; message: string})=>{
      //     setErrorState({...errorState, [error.field]: error.message})
      //   })
      // }

      if (error.errors) {
        const newErrorState = error.errors.reduce((acc: { [key: string]: string | undefined }, curr: { field: string; message: string }) => {
          acc[curr.field] = curr.message;
          return acc;
        }, { email: undefined, password: undefined });
  
        setErrorState(newErrorState);
      }
    },
  });

  const handleSubmit = async () => {
    // e.preventDefault();
    loginShopMutation.mutate({ email: user.email, password: user.password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-[var(--darkBrown)]">
      <div className="flex flex-col gap-5 p-10 bg-[var(--background)] items-center justify-center container max-w-[500px]">
        <div className="text-2xl font-medium">Log in</div>

        <TextField
          error={errorState.email ? true : false}
          helperText={errorState.email}
          id="outlined-required"
          label="Email"
          variant="outlined"
          value={user.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, email: e.target.value });
          }}
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
          error={errorState.password ? true : false}
          helperText={errorState.password}
          id="outlined-required"
          label="Password"
          variant="outlined"
          sx={{ fontSize: "12px", fontFamily: "Inter" }}
          fullWidth
          inputProps={{ style: { fontSize: 12 } }}
          InputLabelProps={{ style: { fontSize: 12 } }}
          value={user.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, password: e.target.value });
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
        <div className="text-xs text-center text-[var(--darkBrown50)]">
          Not signed up and want to partner?{" "}
          <span className="underline text-[var(--darkBrown)] duration-300 hover:text-[var(--mainBrown)] cursor-pointer">
            Email us
          </span>
        </div>
        <div className="text-xs text-center text-[var(--darkBrown50)]">
          By signing up you agree to our{" "}
          <Link
            href="/terms-of-service"
            className="underline text-[var(--darkBrown)] duration-300 hover:text-[var(--mainBrown)] cursor-pointer"
          >
            terms of service
          </Link>{" "}
          and{" "}
          <span className="underline text-[var(--darkBrown)] duration-300 hover:text-[var(--mainBrown)] cursor-pointer">
            privacy policy
          </span>
        </div>
      </div>
    </div>
  );
}
