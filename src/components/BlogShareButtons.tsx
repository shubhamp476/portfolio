"use client";

import { useState } from "react";

type Props = {
  url: string;
};

export default function BlogShareButtons({ url }: Props) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="hidden lg:flex fixed right-6 top-1/3 flex-col items-center gap-4 z-50">
      <span className="text-xs text-neutral-500">Share</span>

      <a
        href={`https://twitter.com/intent/tweet?url=${url}`}
        target="_blank"
        className="h-10 w-10 flex items-center justify-center rounded-full border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
      >
        𝕏
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
        className="h-10 w-10 flex items-center justify-center rounded-full border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
      >
        in
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        className="h-10 w-10 flex items-center justify-center rounded-full border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
      >
        f
      </a>

      {/* Copy Button */}
      <button
        onClick={copyLink}
        className="h-10 w-10 flex items-center justify-center rounded-full border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-sm"
        title="Copy link"
      >
        {copied ? "✓" : "⧉"}
      </button>

      {copied && (
        <span className="text-xs text-green-600 mt-1">Copied</span>
      )}
    </div>
  );
}
