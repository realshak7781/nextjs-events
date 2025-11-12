"use server" // This is a Server Action!

import { bookingFormSchema } from "@/schema/register";
import { z } from "zod";
import fs from "fs/promises"; // Node.js File System (for server-side)
import path from "path";

// Define the shape of our data (for type safety)
type RegisteredUser = {
  id: string;
  name: string;
  email: string;
  eventId: string;
  registrationDate: string;
}

// Define the path to our data file
// 'process.cwd()' is the root of your project
const dataFilePath = path.join(process.cwd(), 'data/registeredUsers.json');

// This is the main server function our form will call
export async function registerUserForEvent(
  values: z.infer<typeof bookingFormSchema>
) {
  // 1. Validate the data *again* on the server (critical security step)
  const validatedFields = bookingFormSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid data.");
  }

  const { name, email, eventId } = validatedFields.data;

  // 2. Prepare the new user data
  const newUser: RegisteredUser = {
    id: crypto.randomUUID(), // Create a unique ID
    name,
    email,
    eventId,
    registrationDate: new Date().toISOString(),
  };

  try {
    // 3. Read the existing data file
    let fileData: RegisteredUser[] = [];
    try {
      const data = await fs.readFile(dataFilePath, "utf-8");
      fileData = JSON.parse(data);
    } catch (e) {
      // File doesn't exist or is empty, which is fine.
    }


    const existingRegistration = fileData.find(
      (user) => user.email === email && user.eventId === eventId
    );

    if (existingRegistration) {
      // If they exist, throw an error. The form's catch block will handle this.
      throw new Error("This email is already registered for this event.");
    }

    // 4. Add the new user and write the file back
    fileData.push(newUser);
    await fs.writeFile(dataFilePath, JSON.stringify(fileData, null, 2));

    // 5. Return a success message
    return {
      success: true,
      message: "You are registered successfully!",
    };
  } catch (error : any) {
    // Handle any errors during the file write
    throw new Error( error.message || "Failed to save registration.");
  }
}