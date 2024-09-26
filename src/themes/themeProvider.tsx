import {
  ThemeOptions,
  createTheme,
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
} from "@mui/material";
import { merge } from "lodash";
import { useMemo } from "react";
import { palette, primary } from "./customs/palette";
import { getTransBackgroundColor } from "@/utils/colourUtils";
// import { componentsOverrides } from "./overrides";

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const memoizedValue = useMemo(
    () =>
      ({
        palette: {
          ...palette(),
        },
        shape: { borderRadius: 8 },
        typography: {
          fontFamily: "Inter",
          button: {
            textTransform: "none",
            fontSize: "14px",
          },
          shopButtons: {
            fontFamily: "Inter",
            color: "#2f211a",
            fontSize: "12px",
          },
        },
        custom: {
          skeleton: {
            color: getTransBackgroundColor(primary.dark, 0.1),
          },
        },

        // overrides: {

        //     MuiInputBase: {
        //         root: {
        //           padding: '200px',
        //         },
        //       },
        // }
      } as ThemeOptions),
    []
  );

  const themeObj = createTheme(memoizedValue);
  // themeObj.components = merge(componentsOverrides(themeObj));

  return (
    <MuiThemeProvider theme={themeObj}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
