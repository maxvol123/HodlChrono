"use client"
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@heroui/react";
import { usePathname } from "next/navigation";
import { siteconfig } from "@/app/config/site.config";
import { layoutconfig } from "@/app/config/layoutconfig";
import RegistrationModal from "../modals/registration.modal";
import LoginModal from "../modals/login.modal";
import { useAuthStore } from "@/store/auth.store";
import Image from "next/image";

export const AcmeLogo = () => {
  return (
    <Image src="/logofav.svg"
    height={50}
    width={50}
    alt="logo"
    className="h-12 w-12 max-w-12"
    priority
    />
  );
};

export default function Header() {
  const pathname = usePathname()
  const {isAuth, status, session, setAuthState} = useAuthStore()  
  

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isRegistrationOpen, setRegistrationOpen] = useState(false)
    const [isLoginOpen, setLoginOpen] = useState(false)

  const getnavitems = () => {
    return siteconfig.header.menuItems.map((item, index) => {
        const isActive= pathname === item.href
        return(
          <NavbarMenuItem key={`${item}-${index}`} className="text-center">
            <Link className={`text-inherit ${isActive && "font-bold"}`} href={item.href}
              
              >
              {item.label}
            </Link>
          </NavbarMenuItem>
          )
})
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className={`text-white bg-[#00E676]`} style={{ height: layoutconfig.headerHeight }}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <Link href="/" className="text-white">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit uppercase">{siteconfig.title}</p>
        </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      {getnavitems()}

      </NavbarContent>
      <NavbarContent justify="end">
      <NavbarItem>
        {status == "loading" ? (
          <p>{siteconfig.header.loading}</p>
        ) : (

        !isAuth ?
          <Link className="text-inherit" href="#" onPress={()=>{setLoginOpen(true)}}>
          {siteconfig.header.signupLogin}
          </Link>
        :
        <Link className="text-inherit" href="/profile" >
          {siteconfig.header.profile}

          </Link>

        )
      }
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {getnavitems()}
      </NavbarMenu>
      <RegistrationModal
      isOpen={isRegistrationOpen}
      onClose={()=>{setRegistrationOpen(false)}}
      setLoginOpen={setLoginOpen}
      />
      <LoginModal
      isOpen={isLoginOpen}
      onClose={()=>{setLoginOpen(false)}}
      isRegistrationOpen={isRegistrationOpen}
      setRegistrationOpen={setRegistrationOpen}
      />
    </Navbar>
  );
}

