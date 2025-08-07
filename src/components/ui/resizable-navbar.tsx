"use client";
import { cn } from "@/utils/lib/utils";
import { IconMenu2, IconX, IconChevronDown } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItem {
  name: string;
  link: string;
  subItems?: {
    name: string;
    link: string;
  }[];
}

interface NavItemsProps {
  items: NavItem[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("sticky inset-x-0 top-0 z-[9999] w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null);
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(null);

  return (
    <>
      {/* Desktop Navigation (lg screens and above) */}
      <motion.div
        onMouseLeave={() => {
          setHoveredIndex(null);
          setActiveSubMenu(null);
        }}
        className={cn(
          "absolute inset-x-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
          className,
        )}
      >
        {items.map((item, idx) => (
          <div key={`link-${idx}`} className="relative">
            {/* Hover background effect */}
            {hoveredIndex === idx && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}

            {/* Main nav item */}
            <div
              onMouseEnter={() => {
                setHoveredIndex(idx);
                if (item.subItems) setActiveSubMenu(idx);
              }}
              onClick={(e) => {
                if (item.subItems) {
                  e.preventDefault();
                  setActiveSubMenu(activeSubMenu === idx ? null : idx);
                }
                onItemClick?.();
              }}
              className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
            >
              <a href={item.link} className="relative z-20">
                {item.name}
              </a>

              {/* Sub-items dropdown */}
              {item.subItems && (hoveredIndex === idx || activeSubMenu === idx) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 top-full z-50 mt-2 w-48 rounded-lg bg-white shadow-lg dark:bg-neutral-800"
                >
                  {item.subItems.map((subItem, subIdx) => (
                    <a
                      key={`sub-link-${subIdx}`}
                      href={subItem.link}
                      className="block px-4 py-2 text-sm text-neutral-600 hover:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700"
                      onClick={onItemClick}
                    >
                      {subItem.name}
                    </a>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Mobile Navigation (md and below) */}
      <div className="flex w-full flex-col lg:hidden">
        {items.map((item, idx) => (
          <div key={`mobile-link-${idx}`} className="w-full">
            <div className="flex w-full items-center justify-between">
              <a
                href={item.subItems ? "#" : item.link}
                onClick={(e) => {
                  if (item.subItems) {
                    e.preventDefault();
                    setMobileOpenIndex(mobileOpenIndex === idx ? null : idx);
                  } else {
                    onItemClick?.();
                  }
                }}
                className={`block w-full px-4 py-3 text-neutral-600 dark:text-neutral-300 ${
                  item.subItems ? "cursor-pointer" : ""
                }`}
              >
                {item.name}
              </a>
              {item.subItems && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpenIndex(mobileOpenIndex === idx ? null : idx);
                  }}
                  className="px-4 py-3"
                  aria-label={`Toggle ${item.name} submenu`}
                >
                  <IconChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileOpenIndex === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}
            </div>

            <AnimatePresence>
              {item.subItems && mobileOpenIndex === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="ml-4 border-l border-gray-200 pl-2 dark:border-neutral-700">
                    {item.subItems.map((subItem, subIdx) => (
                      <a
                        key={`mobile-sub-link-${subIdx}`}
                        href={subItem.link}
                        className="block px-3 py-2 text-sm text-neutral-600 dark:text-neutral-300"
                        onClick={(e) => {
                          onItemClick?.();
                          e.stopPropagation();
                        }}
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  const router = useRouter();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-1 overflow-y-auto rounded-lg bg-white p-2 shadow-lg dark:bg-neutral-950",
            className,
          )}
          style={{ maxHeight: "calc(100vh - 100px)" }}
        >
          {children}
          <div className="flex w-full flex-row items-center justify-around gap-5 border-t border-gray-100 pt-4 dark:border-neutral-800">
            <NavbarButton 
              variant="secondary" 
              onClick={() => router.push('/login')}
              className="mx-auto w-full/2 text-center"
            >
              Login
            </NavbarButton>
            <NavbarButton 
              variant="gradient" 
              onClick={() => router.push('/signup')}
              className="mx-auto w-full/2 text-center"
            >
              Sign Up
            </NavbarButton>
            <NavbarButton
              onClick={onClose}
              variant="primary"
              className="mx-auto w-full/2 text-center"
            >
              Book a call
            </NavbarButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-black dark:text-white" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-black dark:text-white" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <img
        src="https://assets.aceternity.com/logo-dark.png"
        alt="logo"
        width={30}
        height={30}
      />
      <span className="font-medium text-black dark:text-white">Startup</span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "relative px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition duration-200 hover:-translate-y-0.5";

  const variantStyles = {
    primary:
      "bg-white text-black shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary:
      "border border-neutral-200 dark:border-white/[0.2] text-black dark:text-white bg-transparent",
    dark:
      "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      <span>{children}</span>
      {variant === "secondary" && (
        <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
      )}
    </Tag>
  );
};
