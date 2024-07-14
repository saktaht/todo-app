import Image from "next/image";
import { Navbar } from "./components/navbar";
import { Input } from "./components/input";
import { Button } from "./components/button";

export default function Home() {
  return (
    <div className=" h-screen bg-gray-100 grid grid-cols-6 gap-2">
      <Navbar />
      <div className="grid col-span-5 grid-center pt-8">
        <Input />
      </div>
    </div>
  );
}
