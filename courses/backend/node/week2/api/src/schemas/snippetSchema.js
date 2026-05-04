import * as z from "zod";

export const snippetSchema = z.object({
  title: z.string().min(1, "Title is required"),
  contents: z.string().min(1, "Contents are required"),
  user_id: z.number().int().positive("User ID must be a positive integer"),
});