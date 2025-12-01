import { z } from 'zod';
import { stateIconSchema } from '../../stock/state-icon';
import { menuBaseSchema } from './base';
import { menuSubmenuItemSchema } from './submenu';

export const menuSubmenuSelectSchema = menuBaseSchema.merge(stateIconSchema).extend({
  type: z.literal('custom:camera-card-ha-menu-submenu-select'),
  options: z.record(menuSubmenuItemSchema.deepPartial()).optional(),
});
export type MenuSubmenuSelect = z.infer<typeof menuSubmenuSelectSchema>;
