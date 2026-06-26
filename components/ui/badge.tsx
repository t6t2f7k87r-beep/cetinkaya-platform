import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export function Badge({
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700",
        className
      )}
      {...props}
    />
  );
}