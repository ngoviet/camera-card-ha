import { fireAdvancedCameraCardEvent } from '../../../utils/fire-camera-card-ha-event';

export function dispatchLiveErrorEvent(element: EventTarget): void {
  fireAdvancedCameraCardEvent(element, 'live:error');
}
