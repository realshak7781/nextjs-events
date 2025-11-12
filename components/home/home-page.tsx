// File: components/home/home-page.tsx

import Image from "next/image";
import Link from "next/link";
// 1. Import the Shadcn UI components we need
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

// 2. Define the type for the data you're receiving
// (This is good practice, as we discussed)
type EventCategory = {
  id: string;
  title: string;
  description: string;
  image: string;
}

// 3. Define the props for this component
type HomePageProps = {
  events_categories: EventCategory[];
}

// 4. Accept and destructure the props
export default function HomePage({ events_categories }: HomePageProps) {
  return (
    // We use a <main> tag here for semantic HTML
    // 'flex flex-col gap-16': We'll stack our sections vertically with a large gap
    <main className="flex-grow flex flex-col gap-16 py-8">

      {/* SECTION 1: HERO
        This is the new "Hero" section. It's different from your navbar.
        It's designed to grab the user's attention.
      */}
      <section className="text-center px-4">
        {/* - 'font-extrabold text-5xl': Makes the title big and bold
          - 'tracking-tight': Tightens letter spacing for a modern look
        */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Find & Book Your Next Event
        </h1>
        
        {/* - 'text-muted-foreground': Uses Shadcn's subtle text color
          - 'max-w-2xl mx-auto': Centers the text and limits its width
        */}
        <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
          Explore events in your favorite cities. From tech conferences to music 
          festivals, your next great experience is just a click away.
        </p>

        {/* This is a Shadcn UI Button */}
        <Button asChild size="lg" className="mt-8 text-lg">
          <Link href="/events">
            Browse All Events
          </Link>
        </Button>
      </section>

      {/* SECTION 2: EVENT CATEGORY CARDS
        This is the dynamic list of event categories from your data.
        We'll use the Shadcn <Card> component to make it look amazing.
      */}
      <section>
        {/* - 'grid-cols-1 md:grid-cols-3': 1 column on mobile, 3 on desktop
          - 'gap-6': Adds a nice space between the cards
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Loop over the prop, just like you had */}
          {events_categories.map((category) => (
            
            // We replace your old <div> with the Shadcn <Card> component.
            // 'bg-card': Uses Shadcn's card background color (supports dark mode!)
            // 'overflow-hidden': Keeps the image corners rounded
            // 'flex flex-col': Ensures the footer sticks to the bottom if descriptions vary
            <Card key={category.id} className="w-full bg-card overflow-hidden flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
              <Link href={`/events/${category.id}`} className="flex flex-col h-full">
                
                {/* 1. Card Header (Image) */}
                <CardHeader className="p-0">
                  <Image 
                    src={category.image}
                    alt={category.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover" // object-cover prevents stretching
                  />
                </CardHeader>
                
                {/* 2. Card Content (Title & Description) */}
                {/* 'flex-grow': This makes the content fill the space, pushing the footer down */}
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-xl font-bold text-foreground">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="mt-2 text-muted-foreground">
                    {category.description}
                  </CardDescription>
                </CardContent>

                {/* 3. Card Footer (Optional: A "View" button) */}
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full">
                    View Events
                  </Button>
                </CardFooter>
              </Link>
            </Card>

          ))}
        </div>
      </section>

    </main>
  );
}