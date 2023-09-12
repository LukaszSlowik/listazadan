import { z } from "zod";

export const WhiteListSchema = z.object({
  id: z.string(),
  email: z.string(),
  userId: z.string(),
});

//interfare
export type WhiteListEmail = z.infer<typeof WhiteListSchema>;
export const schemaWhiteListEmails = z.array(WhiteListSchema);
export type WhiteListsEmails = z.infer<typeof schemaWhiteListEmails>;
export type WhiteListsEmailsWithoutID = Omit<WhiteListEmail, "id">;
