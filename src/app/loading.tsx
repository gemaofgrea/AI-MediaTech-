import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070709]">
      <div className="w-8 h-8 rounded-full border-2 border-white/15 border-t-lime-400 animate-spin" />
    </div>
  );
}
