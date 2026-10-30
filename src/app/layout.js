import { Geist } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "TrialPilot",
  description: "Protocol Adherence Copilot for Clinical Trials",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}