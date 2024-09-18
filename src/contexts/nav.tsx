import { PageType } from "@/components/navigation/navBar";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

// -----------------------------------------------------------

type NavContext = {
  canSee: boolean;
  setCanSee: React.Dispatch<React.SetStateAction<boolean>>;
  isPartnerShopPage: boolean;
  setPartnerShopPage: React.Dispatch<React.SetStateAction<boolean>>;
  whichPageType: PageType;
  setWhichPageType: React.Dispatch<React.SetStateAction<PageType>>
};

// -----------------------------------------------------------

const NavContext = createContext<NavContext>({
  canSee: true,
  setCanSee: () => {},
  isPartnerShopPage: false,
  setPartnerShopPage: ()=>{},
  whichPageType: PageType.Culture,
  setWhichPageType: ()=>{},
});

export default function NavContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [canSee, setCanSee] = useState(true);
  const path = usePathname();
  const [isPartnerShopPage, setPartnerShopPage] = useState(false);
  const [whichPageType, setWhichPageType] = useState(PageType.Culture)

  

  return (
    <NavContext.Provider value={{ canSee, setCanSee, isPartnerShopPage, setPartnerShopPage, whichPageType, setWhichPageType }}>
      {children}
    </NavContext.Provider>
  );
}

// -----------------------------------------------------------

export const useNavContext = (): NavContext => {
    const context = useContext(NavContext);
    if (!context)
        throw new Error("useNavContext must be used within a NavProvider");
    return context;
};