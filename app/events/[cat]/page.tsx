import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import data from '@/data/data.json'; // Make sure path is correct
import { notFound } from 'next/navigation';
// Import the Shadcn/UI components we'll use
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define the shape of the props Next.js will pass to this page
type CategoryPageProps = {
  params: {
    cat: string; // This 'cat' must match the folder name [cat]
  }
}

// This function generates the dynamic browser tab title (no changes needed)
export async function generateMetadata({ params: paramsProp }: CategoryPageProps): Promise<Metadata> {
  // Await the params to resolve them
  const params = await paramsProp;
  
  const { events_categories } = data;
  const categoryId = params.cat?.toLowerCase();
  const category = events_categories.find(cat => cat.id.toLowerCase() === categoryId);

  if (!category) {
    return {
      title: 'Category Not Found'
    }
  }

  return {
    title: category.title,
    description: category.description,
  };
}

// This is the main page component
export default async function EventCategoryPage({ params: paramsProp }: CategoryPageProps) {
  
  // Await the params prop to ensure it's resolved from the stream
  const params = await paramsProp;
  const { allEvents, events_categories } = data;
  const categoryId = params.cat?.toLowerCase(); // e.g., "london"

  // 1. Find the correct category object using the ID from the URL (case-insensitive)
  const category = events_categories.find(cat => cat.id.toLowerCase() === categoryId);

  // If no category matches, show a 404 page
  if (!category) {
    return notFound();
  }

  // 2. Use the categoryId (e.g., "london") to filter allEvents
  const filteredEvents = allEvents.filter(event => 
    event.city.toLowerCase() === categoryId
  );

  // --- NEW "AMAZING" UI STARTS HERE ---
  // We use a <div> instead of <main> because <main> is already in layout.tsx
  return (
    <div className="flex flex-col gap-12">
      
      {/* 1. Page Header (consistent with homepage hero) */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          {category.title}
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
          {category.description}
        </p>
      </section>
      
      {/* 2. Render the grid of filtered events */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Loop over the filtered events */}
        {filteredEvents.map((event) => (
          
          // Use the Shadcn <Card> component for consistency
          <Card key={event.id} className="w-full bg-card overflow-hidden flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
            <Link 
              href={`/events/${params.cat}/${event.id}`} 
              className="flex flex-col h-full"
            >
              
              <CardHeader className="p-0">
                <Image 
                  src={event.image}
                  alt={event.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-xl font-bold text-foreground">
                  {event.title}
                </CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                  {event.city}
                </CardDescription>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardFooter>

            </Link>
          </Card>
        ))}

        {/* 3. Show a styled "No Events" message */}
        {filteredEvents.length === 0 && (
          <div className="md:col-span-3 text-center py-12">
            <h2 className="text-2xl font-semibold text-muted-foreground">No Events Found</h2>
            <p className="text-muted-foreground mt-2">
              There are no events listed for this category right now.
            </p>
          </div>
        )}

      </section>
    </div>
  );
}