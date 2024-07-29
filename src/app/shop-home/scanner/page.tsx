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

export default function Scanner() {
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const router = useRouter();
  const [scannedResult, setScannedResult] = useState<string | undefined>("");
  const [startScan, setStartScan] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const user = searchParams.get('user');
  const success = searchParams.get('success');
  

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
      setScannedResult(result?.data);
      router.push(
        pathname +
          "?" +
          createQueryString("user", `${result?.data}`)
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
            color="secondary"
            sx={{
              fontWeight: "400",
              fontSize: "12px",
              paddingX: "24px",
              height: "44px",

              "&:hover": {
                backgroundColor: "#AFAF81",
              },
            }}
            disableElevation
            onClick={() => {
              setStartScan(!startScan);
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
    {!user && <Search />}
    {user && !success && <RedeemDrink cardId={user}/>}
      
    </Suspense>
  );
}
