import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "dark" | "ghost-light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60 min-h-11";

const variants: Record<Variant, string> = {
  // Coral with plum text: 6.1:1
  primary: "bg-coral text-plum hover:bg-[#f2665f] active:bg-[#ee5a52]",
  // Outline for light backgrounds
  secondary:
    "border-2 border-plum text-plum hover:bg-plum hover:text-ivory",
  // Solid plum
  dark: "bg-plum text-ivory hover:bg-plum-700",
  // Outline for plum backgrounds
  "ghost-light":
    "border-2 border-ivory/70 text-ivory hover:border-ivory hover:bg-ivory hover:text-plum",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return [base, variants[variant], sizes[size], extra].filter(Boolean).join(" ");
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function ButtonLink({ variant, size, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className ?? "")} {...props}>
      {children}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className ?? "")} {...props} />;
}
