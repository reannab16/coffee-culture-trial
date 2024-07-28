"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  AppBar,
  Slide,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@mui/material";
import { primary } from "@/themes/customs/palette";
import useWindowDimensions from "@/utils/window";
import { usePathname, useRouter } from "next/navigation";
import { LongLogo, SmolLogo } from "./icons";
import { useNavContext } from "@/contexts/nav";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useForCustomersStore } from "@/stores/for-customer-store";
import { divide } from "lodash";
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';

export default function NavBar() {
  const { canSee } = useNavContext();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { width } = useWindowDimensions() ?? { width: 0 };
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const { shop } = useForCustomersStore();


  const isStorePage = () => {
    if (pathname == "/store-login") {
      return false;
    }
    for (const link of navLinks) {
      if (link.path == pathname) {
        return false;
      }
    }
    
    return true;
  };

  const [isitStorePage, setIsitStorePage] = useState(isStorePage());

  const handleScroll = () => {
    if (window.scrollY > 56) {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > prevScrollPos) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    }
  };

  // console.log(pathname);

  useEffect(() => {
    setIsitStorePage(isStorePage());
    console.log(shop);
  }, [pathname, shop]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        backgroundColor: primary.background,
        colour: primary.main,
        height: "100%",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {navLinks.map((navLink) => (
          <ListItem key={navLink.title} disablePadding>
            <ListItemButton
              onClick={() => {
                router.push(navLink.path);
              }}
            >
              <ListItemText primary={navLink.title} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                router.push("/store-login");
              }}
            >
              
              <ListItemText primary={"Store login"}/>
              <ListItemIcon className="-mr-6 text-[var(--mainBrown)]"><KeyRoundedIcon/></ListItemIcon>
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  return (
    <div className={`${canSee ? "block" : "hidden"}`}>
      <Slide appear={false} direction="down" in={!visible}>
        <AppBar
          sx={{
            display: "flex",
            backgroundColor: primary.background,
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          elevation={0}
        >
          <div className="container flex items-center justify-between relative">
            {isitStorePage ? (
              <div className="flex items-center justify-start gap-x-2">
                {shop && (
                  <div className="flex items-center justify-start gap-x-2">
                    <img src={shop.logoSRC} alt="" className="w-7 h-7" />
                    <div className="flex flex-col items-start justify-center text-[var(--darkBrown)]">
                      <div className="text-lg -mb-[5px] font-medium">{shop.shopName}</div>
                      <div className="text-[10px] flex items-end justify-center italic"><span className="pr-[1px]">x c</span><SmolLogo className="mb-[3px]"/><span>ffee culture</span></div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <LongLogo className="h-6 w-auto" />
            )}

            <div className="md:flex items-center justify-center gap-x-1  hidden">
              {navLinks.map((link) => {
                return (
                  <Button
                    key={link.title}
                    // className={`${inter.className} `}
                    color="primary"
                    sx={{
                      fontSize: "12px",
                      fontWeight: "300",
                      borderRadius: "9999px",
                      paddingX: "16px",
                      ":hover": {},
                    }}
                    onClick={() => {
                      router.push(link.path);
                    }}
                  >
                    {link.title}
                  </Button>
                );
              })}
              <Button
                    // className={`${inter.className} `}
                    color="primary"
                    sx={{
                      fontSize: "12px",
                      fontWeight: "300",
                      borderRadius: "9999px",
                      paddingX: "16px",
                      ":hover": {},
                    }}
                    onClick={() => {
                      // router.push(link.path);
                    }}
                  >
                    Store login
                  </Button>
              
            </div>
            {/* <Button
              variant="contained"
              // className={`${inter.className}`}
              color="secondary"
              sx={{
                // boxShadow: '0',
                borderRadius: "9999px",
                fontWeight: "300",
                fontSize: "12px",
                "&:hover": {
                  backgroundColor: "#AFAF81",
                },
              }}
              disableElevation
            >
              Sign Up
            </Button> */}
            <div className="block md:hidden">
              <IconButton onClick={toggleDrawer(true)}>
                <MenuRoundedIcon sx={{ color: primary.main }} />
              </IconButton>
              <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
                {DrawerList}
              </Drawer>
            </div>
          </div>
        </AppBar>
      </Slide>
    </div>
  );
}

const navLinks = [
  {
    title: "For Shops",
    path: "/",
  },
  {
    title: "Partner Cafés",
    path: "/partner-cafes",
  },
  {
    title: "Our Story",
    path: "/",
  },
  {
    title: "Guide",
    path: "https://www.coffee-culture.uk/cafeguide",
  },
  {
    title: "Contact Us",
    path: "/",
  },
];
