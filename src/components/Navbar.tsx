"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="w-full border-b border-neutral-200 dark:border-neutral-700 px-4 md:px-8 py-4 bg-white dark:bg-black">
      <div className="flex justify-between items-center">
  <h1 className="font-bold text-xl text-black dark:text-white">
    Shubham
  </h1>

  {/* Desktop Right Side */}
  <div className="hidden md:flex items-center space-x-6">
    <a href="/" className="text-black dark:text-white hover:underline">Home</a>
    <a href="/projects" className="text-black dark:text-white hover:underline">Projects</a>
    <a href="/blog" className="text-black dark:text-white hover:underline">Blog</a>
    <a href="/contact" className="text-black dark:text-white hover:underline">Contact</a>

    <button
      onClick={toggleTheme}
      className="border border-neutral-300 dark:border-neutral-600 px-3 py-1 rounded text-sm text-black dark:text-white"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  </div>

  {/* Mobile Right Side */}
  <div className="flex md:hidden items-center gap-3">
    <button
      onClick={toggleTheme}
      className="border border-neutral-300 dark:border-neutral-600 px-2 py-1 rounded text-sm text-black dark:text-white"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>

    <button
      onClick={() => setOpen(!open)}
      className="text-2xl text-black dark:text-white"
    >
      ☰
    </button>
  </div>
</div>

      {/* Mobile Menu */}
      {open && (
  <div className="md:hidden mt-4 flex flex-col space-y-4">
    <a href="/" className="text-black dark:text-white">Home</a>
    <a href="/projects" className="text-black dark:text-white">Projects</a>
    <a href="/blog" className="text-black dark:text-white">Blog</a>
    <a href="/contact" className="text-black dark:text-white">Contact</a>
  </div>
)}

  
    </nav>
  );
}
