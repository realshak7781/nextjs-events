import Link from "next/link";
import Image from "next/image"; // Import the Image component
import { Metadata } from 'next';
import data from '@/data/data.json'; // Your data import
import HomePage from "@/components/home/home-page";
import Header from "@/components/header/header";
import FooterComponent from "@/components/footer/footer";

// This sets the browser tab title for this page
export const metadata: Metadata = {
  title: 'Home - Events App',
};


export default function Home() {

  // Get the event categories from your imported data
  const { events_categories } = data;

  return (
    // Use flex-col and min-h-screen to make the footer sticky
    <div className="flex flex-col min-h-screen">
      
      <HomePage events_categories={events_categories}/>

    </div>
  );
}
