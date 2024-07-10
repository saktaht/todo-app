import Image from "next/image";
import { Navbar } from "./components/navbar";
import { Input } from "./components/input";
import { Button } from "./components/button";

export default function Home() {
  return (
    <div className=" h-screen bg-gray-100 grid grid-cols-6 gap-2">
      <Navbar />
      <div className="grid col-span-4 grid-center justify-center pt-8">
        <Input />
      </div>
      <div className="pt-9">
        <Button color="blue">追加</Button>
      </div>
      {/* <Button color="green">編集</Button>
      <Button color="red">削除</Button> */}
    </div>
  );
}
