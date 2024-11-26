import ObjectDetection from "@/components/ObjectDetection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-8 border border-blue m-auto">
      <h1 className="gradient-title font-extrabold text-3xl md:text-6xl lg:text-8xl tracking-tighter md: px-6 text-center">
        Mobile Detecting Alaram
      </h1>
      <ObjectDetection />
    </main>
  );
}
