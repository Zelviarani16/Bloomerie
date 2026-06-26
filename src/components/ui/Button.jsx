"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  fullWidth,
  onClick,
  type = "button",
  disabled,
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 outline-none";

  const variants = {
    primary: "bg-[var(--maroon)] text-white hover:bg-[var(--maroon-hover)]",
    secondary: "bg-white text-[var(--gray-700)] border border-[var(--gray-300)] hover:bg-[var(--gray-50)] hover:border-[var(--gray-400)]",
    outline: "bg-transparent text-[var(--maroon)] border border-[var(--maroon)] hover:bg-[var(--maroon)] hover:text-white",
    danger: "bg-[var(--danger)] text-white hover:bg-[#B91C1C]",
    ghost: "bg-transparent text-[var(--gray-600)] hover:bg-[var(--gray-100)] hover:text-[var(--gray-900)]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[13px]",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3 text-base",
  };

  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.97 } : {}}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
