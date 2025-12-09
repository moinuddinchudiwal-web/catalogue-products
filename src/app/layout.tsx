"use client";

import Header from "@/components/common/Header";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Provider store={store}>
          <Header />
          <main className="p-6">
            {children}
            <Toaster position="top-center" />
          </main>
        </Provider>
      </body>
    </html>
  );
}
