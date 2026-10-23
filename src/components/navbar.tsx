/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Image from 'next/image'
import Bulleye from '../../public/Assets/Svg/Bulleye.svg'
import {
  Bell,
  Book,
  ChevronRight,
  FileText,
  Globe,
  Grid,
  HelpCircle,
  Info,
  LucideIcon,
  Menu,
  X,
} from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'

interface MenuLink {
  label: string
  description?: string
  url?: string
  icon?: {
    component: LucideIcon
    color: string
  }
}
interface MenuItem {
  title: string
  url?: string
  links?: MenuLink[]
}

interface DesktopMenuItemProps {
  item: MenuItem
  index: number
}

interface MobileNavigationMenuProps {
  open: boolean
  setOpen: (open: boolean) => void
  navigation: MenuItem[]
}

interface MenuSubLinkProps {
  link: MenuLink
}

const LOGO = {
  url: '/',
  src: '/Assets/Svg/LogoNeu.svg',
  alt: 'logo',
  title: '',
}

const MOBILE_BREAKPOINT = 1024

interface Navbar9Props {
  className?: string
  navigation: MenuItem[]
}

const Navbar9 = ({ className, navigation }: Navbar9Props) => {
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setOpen(false)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
  }, [open])

  const handleMobileMenu = () => {
    setOpen((prev) => !prev)
  }

  return (
    <Fragment>
      <section
        className={cn(
          'dark pointer-events-auto relative z-50 bg-[url("/Assets/Svg/Wood4.svg")]',
          className,
        )}
      >
        <div className="container h-28">
          <div className="flex h-full items-center justify-between">
            <a
              href={LOGO.url}
              className="flex max-h-12 items-center gap-2 text-lg font-semibold tracking-tighter"
            >
              <Image
                src={LOGO.src}
                alt={LOGO.alt}
                width={150}
                height={48}
                className="inline-block lg:w-16 ml-5"
              />
              <span className="hidden text-foreground md:inline-block">{LOGO.title}</span>
            </a>
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="font-mono">
                {navigation.map((item, index) => (
                  <Fragment key={`desktop-link-${index}`}>
                    {/* Bullaugen wachsen stufenweise mit, damit die Leiste zwischen Logo und Buttons passt */}
                    <Image src={Bulleye} alt="" width={80} height={80} className="w-6 xl:w-14 2xl:w-20" />
                    <DesktopMenuItem item={item} index={index} />
                  </Fragment>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-4">
              <Button
                asChild
                variant="secondary"
                className="hidden md:flex bg-slate-600 border-2 hover:bg-orange-400"
              >
                <a href="/admin" target="_blank" rel="noopener noreferrer">
                  ADMIN
                </a>
              </Button>
              <div className="lg:hidden">
                <Button variant="ghost" size="icon" onClick={handleMobileMenu}>
                  {open ? (
                    <X className="size-5.5 stroke-foreground" />
                  ) : (
                    <Menu className="size-5.5 stroke-foreground" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MobileNavigationMenu open={open} setOpen={setOpen} navigation={navigation} />
    </Fragment>
  )
}

const DesktopMenuItem = ({ item, index }: DesktopMenuItemProps) => {
  if (item.links) {
    return (
      <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
        <NavigationMenuTrigger className=" h-fit w-fit px-2! py-2! bg-stone-800! font-mono text-foreground hover:bg-yellow-600! focus:bg-yellow-600! data-active:bg-yellow-600! data-[state=open]:bg-yellow-600!">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-stone-800 rounded-xl! p-0! font-sans">
          <ul className="w-[20rem] p-2.5">
            {item.links.map((link, index) => (
              <li key={`desktop-nav-sublink-${index}`} className="rounded-md hover:bg-yellow-600">
                <MenuSubLink link={link} />
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
      <NavigationMenuLink
        href={item.url}
        className={`${navigationMenuTriggerStyle()} h-fit px-2! uppercase bg-stone-800 hover:bg-yellow-600 font-mono text-foreground md:text-[0.55rem] lg:text-[0.75rem]`}
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

const MenuSubLink = ({ link }: MenuSubLinkProps) => {
  return (
    <a href={link.url} className="flex items-center gap-4 rounded-lg p-2 hover:bg-muted">
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-2.5">
          {link.icon && (
            <link.icon.component className="size-5" style={{ stroke: link.icon.color }} />
          )}
          <div className="hover:bg-yellow-600 flex flex-col gap-1.5">
            <div className="flex flex-row items-center gap-x-3">
              <Image src={Bulleye} alt="Bullauge" width={60} height={60} />
              <h3 className="text-xl font-sans leading-none text-foreground ">{link.label}</h3>
            </div>
            <p className="text-sm font-sans leading-[1.2] text-muted-foreground/80">
              {link.description}
            </p>
          </div>
        </div>
        <ChevronRight className="size-3.5 stroke-muted-foreground opacity-100" />
      </div>
    </a>
  )
}

const MobileNavigationMenu = ({ open, setOpen, navigation }: MobileNavigationMenuProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        aria-describedby={undefined}
        side="top"
        className="dark inset-0 z-100 h-dvh w-full bg-slate-800 pt-16"
      >
        <div className="flex-1 overflow-y-auto">
          <div className="container pb-12">
            <div className="absolute -m-px h-px w-px overflow-hidden border-0 mask-clip-border p-0 text-nowrap whitespace-nowrap">
              <SheetTitle className="text-primary">Mobile Navigation</SheetTitle>
            </div>
            <div className="flex h-full flex-col justify-between gap-20">
              <Accordion type="multiple" className="w-full">
                {navigation.map((item, index) => renderMobileMenuItem(item, index))}
              </Accordion>
              <div className="pb-20 flex flex-col items-center gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-1/2 bg-slate-600 hover:bg-orange-400"
                >
                  <a href="/admin" target="_blank" rel="noopener noreferrer">
                    ADMIN
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

const renderMobileMenuItem = (item: MenuItem, index: number) => {
  if (item.links) {
    return (
      <AccordionItem key={item.title} value={`nav-${index}`}>
        <AccordionTrigger className="ml-3 h-15 items-center p-0 text-2xl leading-[3.75] font-mono text-muted-foreground hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent>
          {item.links.map((subItem) => (
            <MenuSubLink key={subItem.label} link={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    )
  }

  return (
    <a
      key={item.title}
      href={item.url}
      className="flex ml-3 h-15 items-center border-b p-0 text-left text-2xl leading-[3.75] font-mono text-muted-foreground ring-ring/10 outline-ring/50 transition-all focus-visible:ring-4 focus-visible:outline-1 nth-last-1:border-0"
    >
      {item.title}
    </a>
  )
}

export { Navbar9 }
