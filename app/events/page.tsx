
import Link from "next/link";
import Image from "next/image";
import { Metadata } from 'next';
import data from '@/data/data.json'; // Import your data directly

// This sets the browser tab title
export const metadata: Metadata = {
  title: 'Event Categories',
};

// This is a Server Component, so it can fetch data directly.
export default function EventsPage() {

  // 1. Get the event categories from your imported data
  const { events_categories } = data;

  return (
    <main className="flex-grow p-5">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Event Categories
      </h1>
      
      {/* 2. Map over the categories and render them */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {events_categories.map((category) => (
          <Link 
            key={category.id} 
            // 3. Link to the dynamic category page
            href={`/events/${category.id}`} 
            className="border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <Image 
              src={category.image}
              alt={category.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
              <p className="text-gray-700">{category.description}</p>
            </div>
          </Link>
        ))}

      </div>
    </main>
  );
}

