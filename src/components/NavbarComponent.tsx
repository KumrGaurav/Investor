"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import PlusIcon from "@heroicons/react/24/solid/esm/PlusIcon";

import { useRouter } from "next/navigation";

import { useState } from "react";

function NavbarComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const navItems = [
    {
      name: "Features",
      link: "#features",
      subItems: [
        { name: "Web Development", link: "/web-dev" },
        { name: "Interface Design", link: "/interface-design" },
        { name: "SEO", link: "/seo" },
        { name: "Branding", link: "/branding" },
      ],
    },
    {
      name: "Pricing",
      link: "#pricing",
      subItems: [
        { name: "Hobby", link: "/hobby" },
        { name: "Individual", link: "/individual" },
        { name: "Team", link: "/team" },
        { name: "Enterprise", link: "/enterprise" },
      ],
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          {/* <NavItems items={navItems} /> */}

          <button className="mx-auto p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="flex items-center gap-2 px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
              <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white">
                <PlusIcon className="w-4 h-4 text-black" />
              </span>
              Post a deal
            </div>
          </button>

          <div className="flex items-center gap-4">
            <NavbarButton
              variant="secondary"
              onClick={() => router.push("/login")}
            >
              Login
            </NavbarButton>
            <NavbarButton
              variant="gradient"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </NavbarButton>
            <NavbarButton variant="primary">Book a call</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <NavItems
              items={navItems}
              onItemClick={() => setIsMobileMenuOpen(false)}
            />
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
