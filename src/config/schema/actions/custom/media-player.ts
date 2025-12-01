import { z } from 'zod';
import { advancedCameraCardCustomActionsBaseSchema } from './base';

export const mediaPlayerActionConfigSchema =
  advancedCameraCardCustomActionsBaseSchema.extend({
    camera_card_ha_action: z.literal('media_player'),
    media_player: z.string(),
    media_player_action: z.enum(['play', 'stop']),
  });
export type MediaPlayerActionConfig = z.infer<typeof mediaPlayerActionConfigSchema>;
