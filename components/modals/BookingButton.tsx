"use client" 

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookingForm } from "../BookingForm";
// 1. Import your new BookingForm


interface BookingButtonProps {
  eventId: string;
  eventName: string;
}

export function BookingButton({ eventId, eventName }: BookingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  // This function will be passed to the form to close the modal
  const handleBookingSuccess = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      
      <DialogTrigger asChild>
        <Button size="lg" className="w-full text-lg">
          Book Your Spot
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Your Spot</DialogTitle>
          <DialogDescription>
            You are booking for: <strong>{eventName}</strong>
          </DialogDescription>
        </DialogHeader>
        
        {/* 2. Replace the placeholder with your new form */}
        <div className="py-4">
          <BookingForm 
            eventId={eventId} 
            onSuccess={handleBookingSuccess} // Pass the closing function
          />
        </div>

      </DialogContent>
    </Dialog>
  );
}