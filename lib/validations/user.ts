import * as z from "zod"

export const userProfileSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    bio: z.string().max(160).min(4),
    skills: z.string().min(2, {
        message: "Please enter at least one skill.",
    }),
    portfolioUrl: z.string().url({
        message: "Please enter a valid URL.",
    }).optional().or(z.literal("")),
})

export type UserProfileValues = z.infer<typeof userProfileSchema>
