import { MediaLayoutConfig } from '../config/schema/camera/media-layout';
import { setOrRemoveStyleProperty } from './basic';

/**
 * Update element style from a media configuration.
 * @param element The element to update the style for.
 * @param mediaLayoutConfig The media config object.
 */
export const updateElementStyleFromMediaLayoutConfig = (
  element: HTMLElement,
  mediaLayoutConfig?: MediaLayoutConfig,
): void => {
  setOrRemoveStyleProperty(
    element,
    !!mediaLayoutConfig?.fit,
    '--camera-card-ha-media-layout-fit',
    mediaLayoutConfig?.fit,
  );

  for (const dimension of ['x', 'y']) {
    setOrRemoveStyleProperty(
      element,
      !!mediaLayoutConfig?.position?.[dimension],
      `--camera-card-ha-media-layout-position-${dimension}`,
      `${mediaLayoutConfig?.position?.[dimension]}%`,
    );
  }

  for (const dimension of ['top', 'bottom', 'left', 'right']) {
    setOrRemoveStyleProperty(
      element,
      !!mediaLayoutConfig?.view_box?.[dimension],
      `--camera-card-ha-media-layout-view-box-${dimension}`,
      `${mediaLayoutConfig?.view_box?.[dimension]}%`,
    );
  }
};
