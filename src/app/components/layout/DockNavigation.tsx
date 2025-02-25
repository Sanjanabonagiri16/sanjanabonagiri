'use client';

import {
  HomeIcon,
  UserIcon,
  WrenchIcon,
  FolderIcon,
  PhoneIcon,
  AcademicCapIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';
import { Dock, DockIcon, DockItem, DockLabel } from '@/app/components/ui/dock';
import Link from 'next/link';
import { motion } from 'framer-motion';

const navigation = [
  {
    title: 'Home',
    icon: <HomeIcon className="h-5 w-5 text-[#748D92] transition-colors duration-300 group-hover:text-[#D3D9D4]" />,
    href: '/',
  },
  {
    title: 'About',
    icon: <UserIcon className="h-5 w-5 text-[#748D92] transition-colors duration-300 group-hover:text-[#D3D9D4]" />,
    href: '/about',
  },
  {
    title: 'Services',
    icon: <WrenchIcon className="h-5 w-5 text-[#748D92] transition-colors duration-300 group-hover:text-[#D3D9D4]" />,
    href: '/services',
  },
  {
    title: 'Projects',
    icon: <FolderIcon className="h-5 w-5 text-[#748D92] transition-colors duration-300 group-hover:text-[#D3D9D4]" />,
    href: '/projects',
  },
  {
    title: 'Contact',
    icon: <PhoneIcon className="h-5 w-5 text-[#748D92] transition-colors duration-300 group-hover:text-[#D3D9D4]" />,
    href: '/contact',
  },
  {
    title: 'Education',
    icon: <AcademicCapIcon className="h-5 w-5 text-[#748D92] transition-colors duration-300 group-hover:text-[#D3D9D4]" />,
    href: '/education',
  },
  {
    title: 'Experience',
    icon: <BriefcaseIcon className="h-5 w-5 text-[#748D92] transition-colors duration-300 group-hover:text-[#D3D9D4]" />,
    href: '/experience',
  },
];

export function DockNavigation() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <nav className="w-full bg-[#212A31] py-4">
      <motion.div 
        className="max-w-7xl mx-auto flex justify-center px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Dock className="bg-[#2E3944]/90 backdrop-blur-sm border border-[#748D92]/20 shadow-2xl px-4 py-3 rounded-2xl">
          <div className="flex items-center gap-4">
            {navigation.map((item) => (
              <Link 
                key={item.title} 
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="block w-10 h-10"
              >
                <DockItem className="w-full h-full rounded-xl bg-[#212A31] hover:bg-[#124E66] transition-colors duration-300 flex items-center justify-center relative group">
                  <DockLabel className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#212A31] text-[#D3D9D4] border border-[#748D92]/20 text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.title}
                  </DockLabel>
                  <DockIcon className="flex items-center justify-center">
                    {item.icon}
                  </DockIcon>
                </DockItem>
              </Link>
            ))}
          </div>
        </Dock>
      </motion.div>
    </nav>
  );
} 