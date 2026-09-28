import type { ComponentProps, ReactElement } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost-destructive";
} & ComponentProps<"button">;

function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps): ReactElement {
  let variantClass;
  switch (variant) {
    case "primary":
      variantClass = "bg-violet-600 hover:bg-violet-500";
      break;
    case "secondary":
      variantClass = "bg-zinc-700 hover:bg-violet-500";
      break;
    case "ghost-destructive":
      variantClass = "text-red-800 hover:text-red-200 hover:bg-red-800";
      break;
    default:
      throw new Error(`Invalid variant: ${variant satisfies never}`);
  }

  return (
    <button
      {...props}
      className={twMerge(
        "transition-colors rounded px-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed",
        variantClass,
        className,
      )}
    />
  );
}

export default Button;
