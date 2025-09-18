'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <div>
      <p className="mb-4 md:mb-6 text-xs md:text-sm font-normal text-muted">Ahmad Sadiq</p>
      <nav className="flex flex-row md:flex-col gap-3 md:gap-2 overflow-x-auto md:overflow-x-visible">
        <Link
          href="/"
          className={`text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
            isActive('/') 
              ? 'bg-gradient-to-r from-[#606c38] to-[#fefae0] bg-clip-text text-transparent' 
              : 'text-muted hover:text-link-hover'
          }`}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
            isActive('/about') 
              ? 'bg-gradient-to-r from-[#606c38] to-[#fefae0] bg-clip-text text-transparent' 
              : 'text-muted hover:text-link-hover'
          }`}
        >
          Experiences
        </Link>
        <Link
          href="/projects"
          className={`text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
            isActive('/projects') 
              ? 'bg-gradient-to-r from-[#606c38] to-[#fefae0] bg-clip-text text-transparent' 
              : 'text-muted hover:text-link-hover'
          }`}
        >
          Projects
        </Link>
        <Link
          href="/news"
          className={`text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
            isActive('/news') 
              ? 'bg-gradient-to-r from-[#606c38] to-[#fefae0] bg-clip-text text-transparent' 
              : 'text-muted hover:text-link-hover'
          }`}
        >
          Blogs
        </Link>
      </nav>
    </div>
  );
}