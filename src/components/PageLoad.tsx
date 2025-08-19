"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";

export function PageLoad() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setProgress(10);

    const timer = setTimeout(() => {
      setProgress(100);
    }, 100);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 700);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [pathname, searchParams]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed top-14 left-0 w-full z-10">
      <Progress value={progress} className="h-0.5 rounded-none" />
    </div>
  );
}
