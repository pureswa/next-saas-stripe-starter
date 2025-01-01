"use client"

import { useState, useEffect } from 'react';
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useContext } from "react"
import { siteConfig } from "@/config/site"
import { buttonVariants, Button } from "@/components/ui/button"
import { Icons } from "@/components/shared/icons"
import MaxWidthWrapper from "@/components/shared/max-width-wrapper"
import { ModeToggle } from "@/components/layout/mode-toggle"
import { ModalContext } from "@/components/modals/providers"
import { marketingConfig } from "@/config/marketing"

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession()
  const { setShowSignInModal } = useContext(ModalContext)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-40 w-full ${scrolled ? "border-b bg-background" : ""}`}>
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" />
            <span className="font-bold">{siteConfig.name}</span>
          </Link>
          <nav className="flex items-center space-x-4">
            {marketingConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={buttonVariants({ variant: "ghost" })}
              >
                {item.title}
              </Link>
            ))}
            {status === "authenticated" ? (
              <Link href="/dashboard" className={buttonVariants({ variant: "ghost" })}>
                Dashboard
              </Link>
            ) : (
              <button onClick={() => setShowSignInModal(true)} className={buttonVariants({ variant: "ghost" })}>
                Sign In
              </button>
            )}
            
            <Link href="/chat" passHref>
              <Button
              variant="ghost"
              size="icon"
                aria-label="Open Chat"
            >
              <Icons.messageCircle className="h-5 w-5" />
            </Button>
            </Link>

            <ModeToggle />
          </nav>
        </div>
      </MaxWidthWrapper>
    </header>
  )
}


