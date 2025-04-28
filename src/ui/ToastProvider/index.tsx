"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"      
      richColors                // if you want green/red presets
      closeButton               
    />
  );
}
