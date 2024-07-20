"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import NavContextProvider from "./nav";
import ThemeProvider from "@/themes/themeProvider";

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <NavContextProvider>{children}</NavContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;