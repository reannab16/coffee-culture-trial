"use client";
import { Button } from "@mui/material";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import QrScanner from "qr-scanner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { divide } from "lodash";
import RedeemDrink from "@/components/shopHome/redeemDrink";
import Cookies from "js-cookie";
import { shopType } from "@/stores/for-customer-store";
import { base } from "@/api/endpoints";
import { useQuery } from "react-query";
import { useAuthStore } from "@/stores/auth-store";
import { getHoverColor } from "@/utils/colourUtils";
import { useScannerContext } from "@/contexts/scanner";

export default function Scanner() {
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const router = useRouter();
  // const [scannedResult, setScannedResult] = useState<string | undefined>("");
  const [scannedCard, setScannedCard] = useState({
    shopId: "",
    cardId: "",
    type: "",
  });
  const [startScan, setStartScan] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cardId = searchParams.get("cardId");
  const success = searchParams.get("success");
  const {session} = useAuthStore();
  const [goneRedeem, setGoneRedeem] = useState(false);
  // const {reloaded, setReloaded} = useScannerContext();
  const reloaded = Cookies.get("reloaded");

  useEffect(()=>{
    if (!reloaded) {
      window.location.reload();
      Cookies.set("reloaded", "true")
    }
  },[reloaded])

  function closeScanner() {
    setStartScan(false);
    window.location.reload();
  }

  // if (goneRedeem == true) {
  //   closeScanner();
  // }

  function Search() {
    const searchParams = useSearchParams();
    const createQueryString = useCallback(
      (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);

        return params.toString();
      },
      [searchParams]
    );

    // Success
    const onScanSuccess = (result: QrScanner.ScanResult) => {
      // setScannedResult(JSON.parse(result?.data));
      const scannedResult = JSON.parse(result?.data);
      setScannedCard({
        shopId: scannedResult.shopId,
        cardId: scannedResult.cardId,
        type: scannedResult.type,
      });
      setStartScan(false);
      setGoneRedeem(true);
      router.push(
        pathname +
          "?" +
          createQueryString("shopId", `${scannedResult.shopId}`) +
          "&" +
          createQueryString("cardId", `${scannedResult.cardId}`) +
          "&" +
          createQueryString("type", `${scannedResult.type}`)
      );
    };

    // Fail
    const onScanFail = (err: string | Error) => {
      console.log(err);
    };

    useEffect(() => {
      if (videoEl?.current && !scanner.current) {
        // 👉 Instantiate the QR Scanner
        scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
          onDecodeError: onScanFail,
          // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
          preferredCamera: "environment",
          // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
          highlightScanRegion: true,
          // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
          highlightCodeOutline: true,
          // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
          overlay: qrBoxEl?.current || undefined,
        });

        // 🚀 Start QR Scanner
        scanner?.current
          ?.start()
          .then(() => setQrOn(true))
          .catch((err) => {
            if (err) setQrOn(false);
          });
      }
    }, [startScan]);

    // ❌ If "camera" is not allowed in browser permissions, show an alert.
    useEffect(() => {
      if (!qrOn)
        alert(
          "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
        );
    }, [qrOn]);

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
        enabled: !!session?.shopId,
      }
    );

    return (
      <div className="flex items-start justify-center min-h-screen">
        <div className="container flex flex-col justify-start items-center mt-[72px] p-10 max-w-[500px] gap-y-5">
          <div className=" text-2xl">
            <span className=" font-semibold">QR code</span>{" "}
            <span className="italic">scanner</span>
          </div>
          {startScan && (
            <div className="w-full h-80">
              {/* QR */}
              <video
                ref={videoEl}
                className="w-full h-full object-cover"
              ></video>
              <div ref={qrBoxEl} className="w-full left-0"></div>
            </div>
          )}
          <Button
            variant="contained"
            sx={{
              fontWeight: "400",
              fontSize: "12px",
              paddingX: "24px",
              height: "44px",
              color: `#${fetchedShop?.lightBrandColour}`,
              backgroundColor: `#${fetchedShop?.lightBrandColour}`,
              typography: "shopButtons",

              "&:hover": {
                backgroundColor: getHoverColor(
                  `#${fetchedShop?.lightBrandColour}`
                ),
              },
            }}
            disableElevation
            onClick={() => {
              startScan ? closeScanner() : setStartScan(true);
            }}
            fullWidth
          >
            {startScan ? "close scanner" : "open scanner"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Suspense>
      {!cardId && <Search />}
      {cardId && !success && <RedeemDrink cardId={scannedCard.cardId} shopId={scannedCard.shopId} type={scannedCard.type} />}
    </Suspense>
  );
}
