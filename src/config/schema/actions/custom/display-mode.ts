import { z } from 'zod';
import { viewDisplayModeSchema } from '../../common/display';
import { advancedCameraCardCustomActionsBaseSchema } from './base';

export const viewDisplayModeActionConfigSchema =
  advancedCameraCardCustomActionsBaseSchema.extend({
    camera_card_ha_action: z.literal('display_mode_select'),
    display_mode: viewDisplayModeSchema,
  });
export type DisplayModeActionConfig = z.infer<typeof viewDisplayModeActionConfigSchema>;
