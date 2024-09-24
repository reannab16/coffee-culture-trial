import { alpha } from "@mui/material/styles";

export type ColorSchema =
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error";

declare module "@mui/material/styles/createPalette" {
    interface TypeBackground {
        neutral: string;
    }
    interface SimplePaletteColorOptions {
        // darker: string;
        background: string;
        green: string;
        // highlight: string;
    }
    interface PaletteColor {
        // darker: string;
        background: string;
        green: string;
        // highlight: string;
    }
}

// SETUP COLORS

export const primary = {
    background: '#E1D6CC',
    main: '#2F211A',
    contrastText: '#9A5737',
    dark: '#2F211A',
    green: '#BCBF8C',
    giftYellow: '#D7BB77',

    
    // highlight: '#e1d6cc2e',
    // light: "#4d25121a",
    
};
export const secondary = {
    
    // light: "#292929",
    main: "#BCBF8C",
    // dark: "#0A0A0A",
    // darker: "#000000",
    contrastText: "#2F211A",
};

export const info = {
    main: "#2F211A"
}

const base = {
    primary,
    secondary,
    divider: alpha(primary.main, 0.7 )
}

export function palette() {
    const light = {
        ...base
    }
    return light;
}