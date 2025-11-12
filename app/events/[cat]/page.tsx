import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import data from '@/data/data.json'; // Make sure path is correct
import { notFound } from 'next/navigation';

// Define the shape of the props Next.js will pass to this page
type CategoryPageProps = {
  params: {
    cat: string; // This 'cat' must match the folder name [cat]
  }
}

// This function generates the dynamic browser tab title
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

  return (
    <main className="flex-grow p-5">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">
        {category.title}
      </h1>
      <p className="text-lg text-gray-700 mb-6">{category.description}</p>
      
      {/* 3. Render the grid of filtered events */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {filteredEvents.map((event) => (
          <Link 
            key={event.id} 
            // 4. Link to the final, specific event page
            href={`/events/${params.cat}/${event.id}`} 
            className="border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <Image 
              src={event.image}
              alt={event.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
              <p className="text-gray-700">{event.city}</p>
            </div>
          </Link>
        ))}

        {/* Show a message if no events were found for this category */}
        {filteredEvents.length === 0 && (
          <p className="text-gray-500">No events found for this category.</p>
        )}

      </div>
    </main>
  );
}

