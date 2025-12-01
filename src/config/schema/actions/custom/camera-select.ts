import { z } from 'zod';
import { advancedCameraCardCustomActionsBaseSchema } from './base';

export const cameraSelectActionConfigSchema =
  advancedCameraCardCustomActionsBaseSchema.extend({
    camera_card_ha_action: z.literal('camera_select'),
    camera: z.string().optional(),
    triggered: z.boolean().optional(),
  });
export type CameraSelectActionConfig = z.infer<typeof cameraSelectActionConfigSchema>;
