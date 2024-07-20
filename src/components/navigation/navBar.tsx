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
import { useRouter } from "next/navigation";
import { LongLogo } from "./icons";
import { useNavContext } from "@/contexts/nav";
import IconButton from '@mui/material/IconButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

export default function NavBar() {
  const { canSee } = useNavContext();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { width } = useWindowDimensions() ?? { width: 0 };
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250, backgroundColor: primary.background, colour: primary.main, height: "100%" }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {navLinks.map((navLink) => (
          <ListItem key={navLink.title} disablePadding>
            <ListItemButton onClick={()=>{router.push(navLink.path)}} >
              <ListItemText primary={navLink.title} />
            </ListItemButton>
          </ListItem>
        ))}
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
            <LongLogo className="h-6 w-auto" />
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
            <IconButton onClick={toggleDrawer(true)}><MenuRoundedIcon sx={{color: primary.main}}/></IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor="right" >
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
    path: "/",
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
