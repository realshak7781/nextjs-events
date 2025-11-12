"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingFormSchema } from "@/schema/register";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUserForEvent } from "@/server/actions/register"; // Import the Server Action
import { useTransition, useState } from "react";
import { toast } from "sonner"; // We'll use sonner for notifications

// 1. Install sonner for toast notifications:
// npm install sonner

// Define the props our form needs
interface BookingFormProps {
  eventId: string;
  onSuccess: () => void; // A function to call when booking is successful
}

export function BookingForm({ eventId, onSuccess }: BookingFormProps) {
  // isPending gives us a loading state for the form
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      eventId: eventId, // Pre-fill the eventId from the prop
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof bookingFormSchema>) {
    setError(null); // Clear any previous errors

    // startTransition wraps our server action call
    startTransition(async () => {
      try {
        const result = await registerUserForEvent(values);

        if (result.success) {
          toast.success(result.message); // Show success toast
          onSuccess(); // Call the success function (to close the modal)
        }
      } catch (err : unknown) {
          if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* This field is hidden, but its value is still submitted */}
        <FormField control={form.control} name="eventId" render={({ field }) => <Input type="hidden" {...field} />} />

        {/* Display a general error message if one exists */}
        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Booking..." : "Submit Registration"}
        </Button>
      </form>
    </Form>
  );
}