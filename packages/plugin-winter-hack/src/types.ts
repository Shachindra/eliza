import { z } from "zod";

// Base schema
export const WinterHackSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1),
    type: z.enum(["action1", "action2", "action3"]),
    description: z.string(),
    metadata: z.record(z.string(), z.any()).optional(),
});

// Create schema
export const CreateWinterHackSchema = WinterHackSchema.omit({ id: true });

// Type definitions
export type WinterHack = z.infer<typeof WinterHackSchema>;
export type CreateWinterHackContent = z.infer<typeof CreateWinterHackSchema>;

// Type guards
export const isCreateWinterHackContent = (
    obj: any
): obj is CreateWinterHackContent => {
    return CreateWinterHackSchema.safeParse(obj).success;
};

// Plugin configuration type
export interface WinterHackPluginConfig {
    apiKey?: string;
    endpoint?: string;
}
