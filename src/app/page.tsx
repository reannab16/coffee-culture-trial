import Hero from "@/components/hero/hero";
import LoadingTopbar from "@/components/progressBar/loadingTopBar";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<LoadingTopbar />}>
    <main className="flex min-h-[calc(100vh-60px)] flex-col md:items-start md:justify-center items-center justify-start w-full md:mt-[60px]">
      <Hero/>
    </main>
    </Suspense>
  );
}
