import { z } from 'zod';
import { actionBaseSchema } from '../base';

export const advancedCameraCardCustomActionsBaseSchema = actionBaseSchema.extend({
  action: z
    .literal('fire-dom-event')
    .or(
      z
        .literal('custom:camera-card-ha-action')
        .transform((): 'fire-dom-event' => 'fire-dom-event'),
    ),
});
