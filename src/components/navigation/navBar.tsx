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
import { shopType, useForCustomersStore } from "@/stores/for-customer-store";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import { useAuthStore } from "@/stores/auth-store";
import { useQuery } from "react-query";
import { base } from "@/api/endpoints";
import LoadingTopbar from "../progressBar/loadingTopBar";
import Cookies from "js-cookie";

export enum PageType {
  Store = "store",
  ShopHome = "shopHome",
  Culture = "culture",
}

export default function NavBar() {
  const { canSee, isPartnerShopPage, whichPageType } = useNavContext();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { width } = useWindowDimensions() ?? { width: 0 };
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const { shop } = useForCustomersStore();
  const { session, updateSession } = useAuthStore();
  const access = Cookies.get("accessToken");
  

  const isStorePage = (): PageType => {
    if (pathname.startsWith("shop-home")) {
      console.log("passing")
      return PageType.ShopHome;
    }
    if (pathname == "/store-login") {
      return PageType.Culture;
    }
    if (isPartnerShopPage) {
      return PageType.Store;
    }
    for (const link of navLinks) {
      if (link.path == pathname) {
        return PageType.Culture;
      }
    }
    for (const link of shopHomeLinks) {
      if (link.path == pathname) {
        //here
        return PageType.ShopHome;
      }
    }
    return PageType.Culture;
  };

  

  const [pageType, setPageType] = useState<PageType>(isStorePage());

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

  useEffect(() => {
    setPageType(isStorePage());
    console.log(isStorePage(), pageType);
  }, [pathname, shop, session, isPartnerShopPage]);

  // useEffect(() => {
  //   console.log("PageType updated to:", pageType);
  // }, [pageType]);

  // useEffect(() => {
  //   console.log("Session updated:", session);
  // }, [session]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const fetchShopDetails = async (shopId: string): Promise<shopType> => {
    const response = await base.get(`/trial/shop/${shopId}`);
    return response.data.data;
  };

  const {
    data: fetchedShop,
    error: shopError,
    isLoading: isShopLoading,
  } = useQuery(
    ["shopDetails", session?.shopId],
    () =>
      session ? fetchShopDetails(session?.shopId) : Promise.reject("No shopId"),
    {
      enabled: whichPageType == PageType.ShopHome && !!session?.shopId,
    }
  );

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
        {pageType !== PageType.ShopHome
          ? navLinks.map((navLink) => (
              <ListItem key={navLink.title} disablePadding>
                <ListItemButton
                  onClick={() => {
                    router.push(navLink.path);
                  }}
                >
                  <ListItemText primary={navLink.title} />
                </ListItemButton>
              </ListItem>
            ))
          : shopHomeLinks.map((navLink) => (
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
            onClick={async () => {
              if (Cookies.get("accessToken")) {
                router.push("/");
                await Cookies.remove("accessToken");
                await Cookies.remove("refreshToken");
                await updateSession(null);
              } else {
                router.push("/store-login");
              }
            }}
          >
            <ListItemText primary={access ? "Log out" : "Store login"} />
            <ListItemIcon className="-mr-6 text-[var(--mainBrown)]">
              <KeyRoundedIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  if (isShopLoading) {
    return <LoadingTopbar />;
  } else
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
              {whichPageType == PageType.Store && (
                <div className="flex items-center justify-start gap-x-2">
                  {shop && (
                    <div className="flex items-center justify-start gap-x-2">
                      <img src={shop.logo} alt="" className="w-7 h-7" />
                      <div className="flex flex-col items-start justify-center text-[var(--darkBrown)]">
                        <div className="text-lg -mb-[5px] font-medium">
                          {shop.shopName}
                        </div>
                        <div className="text-[10px] flex items-end justify-center italic">
                          <span className="pr-[1px]">x c</span>
                          <SmolLogo className="mb-[3px]" />
                          <span>ffee culture</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {whichPageType == PageType.ShopHome && (
                <div className="flex items-center justify-start gap-x-2">
                  {fetchedShop && (
                    <div className="flex items-center justify-start gap-x-2">
                      <img src={fetchedShop?.logo} alt="" className="w-7 h-7" />
                      <div className="flex flex-col items-start justify-center text-[var(--darkBrown)]">
                        <div className="text-lg -mb-[5px] font-medium">
                          {fetchedShop?.shopName}
                        </div>
                        <div className="text-[10px] flex items-end justify-center italic">
                          <span className="pr-[1px]">x c</span>
                          <SmolLogo className="mb-[3px]" />
                          <span>ffee culture</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {whichPageType == PageType.Culture && (
                <LongLogo className="h-6 w-auto" />
              )}

              <div className="md:flex items-center justify-center gap-x-1  hidden">
                {whichPageType !== PageType.ShopHome
                  ? navLinks.map((link) => {
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
                    })
                  : shopHomeLinks.map((link) => {
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
                    router.push("/store-login");
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
                <Drawer
                  open={open}
                  onClose={toggleDrawer(false)}
                  anchor="right"
                >
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
    title: "Home",
    path: "/",
  },
  {
    title: "For Shops",
    path: "https://www.coffee-culture.uk/coffeeshops",
  },
  {
    title: "Partner Cafés",
    path: "/partner-cafes",
  },
  // {
  //   title: "Our Story",
  //   path: "/",
  // },
  {
    title: "Guide",
    path: "https://www.coffee-culture.uk/cafeguide",
  },
  {
    title: "Contact Us",
    path: "/#contact",
  },
];

const shopHomeLinks = [
  {
    title: "Home",
    path: "/shop-home",
  },
  {
    title: "Scanner",
    path: "/shop-home/scanner",
  },
  {
    title: "Analytics",
    path: "/shop-home/analytics",
  },
  {
    title: "Help & Settings",
    path: "/shop-home/help",
  },
];
