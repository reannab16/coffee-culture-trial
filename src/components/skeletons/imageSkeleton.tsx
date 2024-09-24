import { primary } from "@/themes/customs/palette";
import { getTransBackgroundColor } from "@/utils/colourUtils";
import { Skeleton } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";

export default function ImageSkeleton({className, onLoaded, imageSRC, imageAlt}:{className: string, onLoaded: () => void; imageSRC: string; imageAlt?: string}) {
    const [loaded, setLoaded] = useState(false);
    return(
        <div className={`relative ${className}`}>
            {/* Skeleton loader that overlays the image */}
        {!loaded && (
          <Skeleton
            variant="rounded"
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
              backgroundColor: getTransBackgroundColor(primary.dark, 0.1),
              color: getTransBackgroundColor(primary.dark, 0.1),
            }}
          />
        )}

        <Image
          src={imageSRC}
          alt={imageAlt ? imageAlt : ""}
          width={1000}
          height={1000}
          className={`w-full h-full ${loaded ? "visible" : "invisible"}`}
          onLoad={() => {
            setLoaded(true);
            onLoaded();
            console.log("well huh");
          }}
        />

        </div>
    )
}