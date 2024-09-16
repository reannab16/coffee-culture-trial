import tinycolor from "tinycolor2";

export const getHoverColor = (backgroundColor: string) => {
    const shadowColor = "#2f211a";
    // const color = tinycolor(backgroundColor);
    // return color.clone().darken(15).toString();
    const color = tinycolor.mix(backgroundColor, shadowColor, 10);
    return color.clone().toString();
  };
  
export const getTransBackgroundColor = (backgroundColor: string, alpha: number) => {
    const color = tinycolor(backgroundColor);
    return color.clone().setAlpha(alpha).toString();
  };

export const getMixColor = (backgroundColor: string, mixColour: string, alpha: number) => {
    // const color = tinycolor(backgroundColor);
    // return color.clone().darken(15).toString();
    const color = tinycolor.mix(backgroundColor, mixColour, alpha);
    return color.clone().toString();
  };