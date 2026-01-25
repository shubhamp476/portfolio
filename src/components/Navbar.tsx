"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSearch = () => {
    router.push("/blog"); // later: modal/search page
  };

  return (
    <nav className="w-full border-b border-neutral-200 dark:border-neutral-700 px-4 md:px-8 py-4 bg-white dark:bg-black">

      {/* ===== DESKTOP (UNCHANGED) ===== */}
      <div className="hidden md:flex justify-between items-center">
        <h1 className="font-bold text-xl text-black dark:text-white">
          Shubham
        </h1>

        <div className="flex items-center space-x-6">
          <a href="/" className="text-black dark:text-white hover:underline">Home</a>
          <a href="/projects" className="text-black dark:text-white hover:underline">Projects</a>
          <a href="/blog" className="text-black dark:text-white hover:underline">Blog</a>
          <a href="/contact" className="text-black dark:text-white hover:underline">Contact</a>

          <button
            onClick={toggleTheme}
            className="border border-neutral-300 dark:border-neutral-600 px-3 py-1 rounded text-sm"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>

      {/* ===== MOBILE (UPDATED) ===== */}
      <div className="relative flex md:hidden items-center justify-between">

        {/* LEFT: Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl text-black dark:text-white"
        >
          ☰
        </button>

        {/* CENTER: Name */}
        <h1 className="absolute left-1/2 -translate-x-1/2 font-bold text-lg text-black dark:text-white">
          Shubham
        </h1>

        {/* RIGHT: Search + Theme */}
        <div className="flex items-center gap-2">
          

          <button
            onClick={toggleTheme}
            className="h-9 w-9 flex items-center justify-center rounded border border-neutral-300 dark:border-neutral-600"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      {open && (
        <div className="md:hidden mt-6 flex flex-col space-y-4 text-center">
          <a href="/" className="text-black dark:text-white">Home</a>
          <a href="/projects" className="text-black dark:text-white">Projects</a>
          <a href="/blog" className="text-black dark:text-white">Blog</a>
          <a href="/contact" className="text-black dark:text-white">Contact</a>
        </div>
      )}
    </nav>
  );
}
