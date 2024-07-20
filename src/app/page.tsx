import Hero from "@/components/hero/hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-60px)] flex-col md:items-start md:justify-center items-center justify-start w-full md:mt-[60px]">
      <Hero/>
    </main>
  );
}
