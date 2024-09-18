import type { Metadata } from "next";
import PartnerShopProviders from "./partnerShopProviders";


// export const metadata: Metadata = {
//   title: "Coffee Culture",
//   description: "Coffee bundle and loyalty service for independent coffee shops",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PartnerShopProviders>{children}</PartnerShopProviders>;
}