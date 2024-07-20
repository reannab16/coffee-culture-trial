import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

// -----------------------------------------------------------

type NavContext = {
  canSee: boolean;
  setCanSee: React.Dispatch<React.SetStateAction<boolean>>;
};

// -----------------------------------------------------------

const NavContext = createContext<NavContext>({
  canSee: true,
  setCanSee: () => {},
});

export default function NavContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [canSee, setCanSee] = useState(true);
  const path = usePathname();

  

  return (
    <NavContext.Provider value={{ canSee, setCanSee }}>
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