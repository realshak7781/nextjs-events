// File: components/footer/footer.tsx

import Link from 'next/link';
// We'll import icons from lucide-react, which is standard with Shadcn
// Run: npm install lucide-react
import { CalendarDays, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    // 'bg-muted': Uses Shadcn's subtle background color (light gray in light mode)
    // 'border-t': Adds a top border to separate it from the page content
    <footer className="bg-muted border-t">
      
      {/* 'container mx-auto': Centers content and matches your header's padding
        - 'py-12': Adds significant vertical padding
        - 'px-4 md:px-6': Adds horizontal padding
      */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Top section: Grid layout for links. Stacks on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Column 1: Brand (spans 2 columns on desktop) */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">
                Events App
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm">
              Your one-stop platform for booking and managing events seamlessly.
            </p>
          </div>

          {/* Column 2: Event Categories (dynamically from your data) */}
          <div>
            <h3 className="font-semibold text-foreground">Categories</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/events/london" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Events in London
                </Link>
              </li>
              <li>
                <Link href="/events/san-francisco" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Events in San Francisco
                </Link>
              </li>
              <li>
                <Link href="/events/barcelona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Events in Barcelona
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Site Links */}
          <div>
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about-us" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section: Copyright and social icons */}
        <div className="mt-10 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Events App. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="https://github.com/realshak7781" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="https://www.linkedin.com/in/akhtarsharique" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}