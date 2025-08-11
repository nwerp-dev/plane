"use client";

import React from "react";
import Image from "next/image";
// ui
// images
import Image404 from "@/public/404.svg";

export const PageNotFound = () => (
  <div className={`h-screen w-full overflow-hidden bg-custom-background-100`}>
    <div className="grid h-full place-items-center p-4">
      <div className="space-y-8 text-center">
        <div className="relative mx-auto h-60 w-60 lg:h-80 lg:w-80">
          <Image src={Image404} layout="fill" alt="404- Página não encontrada" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Oops! Página não encontrada.</h3>
          <p className="text-sm text-custom-text-200">
            Desculpe, a página que você está procurando não pode ser encontrada. Ela pode ter sido removida, ter seu nome alterado, ou estar temporariamente indisponível.
          </p>
        </div>
      </div>
    </div>
  </div>
);
