// This is your new, reusable Header component
import Link from 'next/link';
// We import an icon from lucide-react (the library Shadcn uses)
import { CalendarDays } from 'lucide-react';
import { ModeToggle } from '../dark-mode/mode-toggle';

export default function Header() {
  return (
    // <header>: The main navbar container
    // 'w-full': Makes it span the full width
    // 'bg-background': Uses Shadcn's CSS variable for the background color
    // 'border-b': Adds a subtle bottom border using Shadcn's border color
    <header className="w-full border-b bg-background">
      
      {/* This div is a centered container.
        - 'container mx-auto': Centers the content with a max-width
        - 'flex h-16 items-center': Makes it a 4rem (h-16) tall flex container, with all items vertically centered
        - 'justify-between': Pushes the logo to the left and nav links to the right
        - 'px-4 md:px-6': Adds horizontal padding (more on medium screens)
      */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        
        {/* 1. Logo and Title Section */}
        {/* 'flex items-center gap-2': A mini-flexbox to put the icon and text side-by-side */}
        <Link href="/" className="flex items-center gap-2">
          {/* We use 'text-primary' to get your theme's main color */}
          <CalendarDays className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">
            Events App
          </span>
        </Link>

        {/* 2. Navigation Links Section */}
        {/* 'flex items-center gap-6': A mini-flexbox for the links with 1.5rem spacing */}
        <nav className="flex items-center gap-6">
          <Link 
            href="/" 
            // 'text-muted-foreground': Uses Shadcn's subtle gray for non-active links
            // 'hover:text-foreground': Changes text to the main color on hover
            // 'transition-colors': Makes the hover effect smooth
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link 
            href="/events" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Events
          </Link>
          <Link 
            href="/about-us" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About Us
          </Link>

          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}