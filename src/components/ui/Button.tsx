import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "accent" | "light" | "brand";
  className?: string;
  /** Opens in a new tab. Use for links that leave the site. */
  external?: boolean;
};

// Pill button matching the reference proportions (rounded-full, generous
// padding, 500ms ease-in-out colour swap on hover).
const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-primary border-primary text-white hover:bg-transparent hover:text-primary",
  accent:
    "bg-accent border-accent text-white hover:bg-transparent hover:text-accent",
  light:
    "bg-white border-white text-ink hover:bg-transparent hover:text-white",
  // Felix Plaza logo purple.
  brand:
    "bg-felix border-felix text-white hover:bg-transparent hover:text-felix",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const classes = `inline-block rounded-full border-2 px-7 py-2.5 text-base font-bold leading-snug transition-all duration-500 ease-in-out md:text-lg ${VARIANTS[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
