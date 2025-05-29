\
"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemedButtonProps extends ButtonProps {}

export function ThemedButton({ className, children, ...props }: ThemedButtonProps) {
  return (
    <Button
      className={cn(
        "border-2 border-black dark:border-white bg-transparent text-black dark:text-white px-8 py-6 text-lg uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
