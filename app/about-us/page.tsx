import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// --- Shadcn/UI Components ---
// We'll use these to build the page consistently
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// --- Icons ---
// Make sure you have lucide-react: npm install lucide-react
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

// This sets the browser tab title for this page
export const metadata: Metadata = {
  title: 'About Me - Sharique Akhtar',
  description: 'Learn more about Sharique Akhtar and the projects he builds.',
};

// This is the main page component
export default function AboutUsPage() {

  // --- Your Skill Data (from your resume) ---
  const techStack = [
    "Next.js", "React", "TypeScript", "Tailwind CSS",
    "Node.js", "Python", "C++", "SQL",
    "NeonDB", "PostgreSQL", "Drizzle ORM", "Clerk",
    "TensorFlow", "Keras", "LangChain", "Puppeteer"
  ];

  return (
    // We use 'space-y-16' to create large gaps between our page sections
    <div className="flex flex-col space-y-16 py-8">

      {/* --- SECTION 1: HERO --- */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Column 1: Profile Pic & Links */}
        <div className="flex flex-col items-center md:items-start">
          <Avatar className="h-48 w-48 border-4 border-primary/10 shadow-lg">
            {/* You can add a URL to your photo here */}
            {/* <AvatarImage src="https://github.com/your-username.png" alt="Sharique Akhtar" /> */}
            <AvatarFallback className="text-6xl font-bold">SA</AvatarFallback>
          </Avatar>
          <div className="flex gap-3 mt-4">
            <Button asChild variant="outline" size="icon">
              <Link href="https://github.com/realshak7781" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon">
              <Link href="https://www.linkedin.com/in/akhtarsharique" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon">
              <Link href="mailto:akhtersharique75@gmail.com">
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Column 2: Bio */}
        <div className="md:col-span-2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Sharique Akhtar
          </h1>
          <p className="mt-4 text-xl text-primary font-medium">
            B.Tech in Information Technology
          </p>
          <p className="mt-2 text-lg text-muted-foreground">
            Dr. B. R. Ambedkar National Institute of Technology Jalandhar
          </p>
          <p className="mt-6 text-lg text-foreground/90 leading-relaxed">
            I'm a passionate full-stack developer and AI enthusiast with a strong foundation
            in data structures, algorithms, and modern web technologies. I enjoy tackling complex
            problems, from building scalable scheduling applications to developing AI-powered
            healthcare solutions.
          </p>
        </div>
      </section>

      {/* --- SECTION 2: TECH STACK --- */}
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
          My Tech Stack
        </h2>
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          {techStack.map((skill) => (
            // Using Shadcn's Badge component for a clean, themed look
            <Badge key={skill} variant="secondary" className="text-lg py-1 px-4">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      {/* --- SECTION 3: FEATURED PROJECTS --- */}
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Project 1: This Events App */}
          <Card className="w-full bg-card overflow-hidden flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader>
              <CardTitle>Full-Stack Scheduling App</CardTitle>
              <CardDescription>This very project!</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>
                A modern, full-stack appointment scheduling platform built with Next.js, 
                TypeScript, Drizzle ORM, and a Neon serverless database.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="https://github.com/realshak7781/nextjs-events" target="_blank" rel="noopener noreferrer">
                  View Source Code <Github className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Project 2: AI Skin Cancer Detection */}
          <Card className="w-full bg-card overflow-hidden flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader>
              <CardTitle>AI-Powered Skin Cancer Detection</CardTitle>
              <CardDescription>Deep Learning for Healthcare</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>
                A full-stack web app that classifies 7 types of skin lesions from
                uploaded images using a TensorFlow CNN model with 80.68% accuracy.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="https://github.com/realshak7781/Skin-Cancer-Detection-Web-App" target="_blank" rel="noopener noreferrer">
                  View Source Code <Github className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* --- SECTION 4: ACHIEVEMENTS --- */}
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
          Achievements & Milestones
        </h2>
        <ul className="mt-8 max-w-2xl mx-auto space-y-4 text-lg text-muted-foreground list-disc list-inside">
          <li>Solved <strong>1000+ problems</strong> on LeetCode.</li>
          <li>Achieved a global rank of 4,000 in a LeetCode Biweekly Contest.</li>
          <li>Secured a rank of 16,000 in JEE Mains among 1,000,000 candidates.</li>
        </ul>
      </section>

    </div>
  );
}