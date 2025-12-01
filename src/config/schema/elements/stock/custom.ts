import { z } from 'zod';

// https://www.home-assistant.io/lovelace/picture-elements/#custom-elements
export const customSchema = z
  .object({
    // Insist that Advanced Camera Card custom elements are handled by other schemas.
    type: z.string().superRefine((val, ctx) => {
      if (!val.match(/^custom:(?!camera-card-ha).+/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'camera-card-ha custom elements must match specific schemas',
          fatal: true,
        });
      }
    }),
  })
  .passthrough();
