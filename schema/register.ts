import { z } from "zod";

// This is our "rulebook" for the booking form.
export const bookingFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  // We add 'eventId' here so we know which event they are booking
  eventId: z.string(), 
});