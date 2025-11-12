import Image from 'next/image';
import { Metadata } from 'next';
import data from '@/data/data.json'; // Make sure path is correct
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Shadcn Button
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { CalendarDays, Clock, MapPin } from 'lucide-react'; // Icons
import { BookingButton } from '@/components/modals/BookingButton';

// Define the shape of the props
type EventDetailPageProps = {
  params: {
    id: string; // This 'id' must match the folder name [id]
    cat: string; // We also get the 'cat' from the URL
  }
}

// This function generates the dynamic browser tab title
export async function generateMetadata({ params: paramsProp }: EventDetailPageProps): Promise<Metadata> {
  const params = await paramsProp;
  const event = data.allEvents.find(event => event.id === params.id);

  if (!event) {
    return { title: 'Event Not Found' };
  }

  return {
    title: event.title,
    description: event.description,
  };
}

// This is the main page component
export default async function EventDetailPage({ params: paramsProp }: EventDetailPageProps) {
  
  // Await the params to be resolved
  const params = await paramsProp;
  
  // 1. Find the correct event using the ID from the URL
  const event = data.allEvents.find(event => event.id === params.id);

  // 2. If no event matches, show a 404 page
  if (!event) {
    return notFound();
  }

  // Dummy text for description
  const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  return (
    // 'max-w-6xl mx-auto': Centers and constrains the width of our page
    // 'grid md:grid-cols-2 gap-8': Creates a 2-column grid on desktop, stacks on mobile
    <div className="max-w-6xl mx-auto py-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      
      {/* --- COLUMN 1: EVENT IMAGE --- */}
      <div className="w-full">
        <Image 
          src={event.image}
          alt={event.title}
          width={1200}
          height={800}
          // 'rounded-lg': Gives the image nice rounded corners
          // 'shadow-lg': Adds a prominent shadow for depth
          // 'object-cover': Ensures the image fills its container without stretching
          className="w-full h-auto rounded-lg shadow-lg object-cover aspect-video"
        />
      </div>

      {/* --- COLUMN 2: EVENT DETAILS --- */}
      {/* We use a Card here for consistency with your theme */}
      <Card className="w-full flex flex-col">
        <CardHeader>
          {/* Main event title */}
          <CardTitle className="text-3xl md:text-4xl font-extrabold text-foreground">
            {event.title}
          </CardTitle>
          {/* Event city (muted color) */}
          <CardDescription className="text-lg font-medium text-primary pt-2">
            {event.city}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow">
          {/* Event Details (Date, Time, Location) */}
          {/* We use icons for a better UI */}
          <div className="space-y-4 text-muted-foreground">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5" />
              <span>Saturday, December 20, 2025</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5" />
              <span>7:00 PM - 10:00 PM (GMT)</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5" />
              <span>{event.city} Convention Center</span>
            </div>
          </div>
          
          {/* Dummy description text */}
          <p className="mt-6 text-foreground/90">
            {loremIpsum}
          </p>
        </CardContent>

        <CardFooter>
          {/* 'size="lg"' makes the button bigger and a clear call to action */}
          <BookingButton eventId={event.id} eventName={event.title} />
        </CardFooter>
      </Card>
    </div>
  );
}