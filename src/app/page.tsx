'use client'

import Image from "next/image";
import { Navbar } from "./components/navbar";
import { Input } from "./components/input";
import { Button } from "./components/button";
import React from 'react'
import { OpenProvider } from "./components/openContext";

export default function Home() {
  return (
    <OpenProvider>
          {/* // grid-flow-colにしたら上に上がった */}
        <div className="h-screen bg-gray-100 grid grid-flow-col sm:grid-cols-6 gap-2">
          <div className="grid md:col-span-1">
            <Navbar />
          </div>
          <div className="grid sm:col-span-5 col-span-6 grid-center pt-8">
            <Input />
          </div>
        </div>
    </OpenProvider>
    
  );
}
