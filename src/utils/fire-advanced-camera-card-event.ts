/**
 * Dispatch a Camera Card HA event.
 * @param target The target from which send the event.
 * @param type The type of the Camera Card HA event to send.
 * @param detail An optional detail object to attach.
 */
export function fireAdvancedCameraCardEvent<T>(
  target: EventTarget,
  type: string,
  detail?: T,
  options?: {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
  },
): void {
  target.dispatchEvent(
    new CustomEvent<T>(`camera-card-ha:${type}`, {
      bubbles: options?.bubbles ?? true,
      composed: options?.composed ?? true,
      cancelable: options?.cancelable ?? false,
      detail: detail,
    }),
  );
}
