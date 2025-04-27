import React from "react";

import { formatDuration } from "@/components/format-duration";

type ReadingTimeWidgetProps = {
  wordCount: number;
};

export default function ReadingTimeWidget({
  wordCount,
}: ReadingTimeWidgetProps) {
  const readingSpeed = 100;

  return (
    <div
      className={
        "rounded border border-slate-200 bg-slate-50 px-2 py-1 tracking-wide text-teal-700"
      }
    >
      {formatDuration((wordCount / readingSpeed) * 60)}
    </div>
  );
}
