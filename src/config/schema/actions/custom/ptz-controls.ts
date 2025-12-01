import { z } from 'zod';
import { advancedCameraCardCustomActionsBaseSchema } from './base';

export const ptzControlsActionConfigSchema =
  advancedCameraCardCustomActionsBaseSchema.extend({
    camera_card_ha_action: z.literal('ptz_controls'),
    enabled: z.boolean(),
  });
export type PTZControlsActionConfig = z.infer<typeof ptzControlsActionConfigSchema>;
