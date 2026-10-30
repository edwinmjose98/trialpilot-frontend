"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  
  if (pathname === "/") return null;

  return (
    <aside className="w-56 bg-gray-900 text-white flex flex-col p-6 min-h-screen">
      <h1 className="text-lg font-bold mb-8">⚕ TrialPilot</h1>
      <nav className="flex flex-col gap-3 text-sm">
        <Link href="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
        <Link href="/protocols" className="text-gray-300 hover:text-white">Protocols</Link>
        <Link href="/patients" className="text-gray-300 hover:text-white">Patients</Link>
        <Link href="/alerts" className="text-gray-300 hover:text-white">Alerts</Link>
      </nav>
    </aside>
  );
}