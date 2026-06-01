"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { proof } from "@/content/proof";
import { profile } from "@/content/profile";
import { site } from "@/content/site";

export function IdeStatusBar() {
  const [ist, setIst] = useState("");

  useEffect(() => {
    const update = () => {
      setIst(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    };
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="ide-status-bar flex shrink-0 items-center justify-between px-3">
      <div className="flex items-center gap-3 overflow-hidden">
        <span className="truncate">{site.role}</span>
        <span className="hidden sm:inline">·</span>
        <span className="hidden truncate sm:inline">{proof.tenureYears} yrs @ Accenture</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden max-w-[200px] truncate md:inline">{site.availability}</span>
        {ist ? <span className="hidden lg:inline">{ist} IST</span> : null}
        <Link
          href={site.resumeUrl}
          className="rounded px-1.5 py-0.5 hover:bg-white/15"
          target="_blank"
          rel="noopener"
        >
          Resume
        </Link>
        <span className="hidden sm:inline">{profile.locationShort}</span>
      </div>
    </footer>
  );
}
