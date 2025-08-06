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
import { HoveredLink } from "./ui/navbar-menu";
import { useState } from "react";

function NavbarComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">Login</NavbarButton>
            <NavbarButton variant="gradient">Sign Up</NavbarButton>
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
