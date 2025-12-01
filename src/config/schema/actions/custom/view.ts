import { z } from 'zod';
import { VIEWS_USER_SPECIFIED } from '../../common/const';
import { advancedCameraCardCustomActionsBaseSchema } from './base';

export const viewActionConfigSchema = advancedCameraCardCustomActionsBaseSchema.extend({
  camera_card_ha_action: z.enum(VIEWS_USER_SPECIFIED),
  folder: z.string().optional(),
});
export type ViewActionConfig = z.infer<typeof viewActionConfigSchema>;
