"use client";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster 
      position="bottom-right"
      toastOptions={{
        style: {
          borderRadius: "8px",
          background: "#1A1A1A",
          color: "#fff",
        },
      }}
    />
  );
}
